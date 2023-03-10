import { Request, Response } from "express";
import Account from "../../interfaces/Account";
import database from "../../utils/Database";
import { error, success } from "../../utils/ResponseApi";

class BankController {
  async addAccount(req: Request, res: Response): Promise<Response<Account>> {
    const account: Account = req.body;
    try {
      const [rows] = await database.connection.execute(
        "SELECT * FROM accounts WHERE userId = ?",
        [account.userId]
      );

      if (rows[0]) return res.status(500).json(error("Account already exits"));

      const [result] = await database.connection.execute(
        "INSERT INTO accounts (userId, type, balance) VALUES (?, ?, ?)",
        [account.userId, account.type, account.balance]
      );
      return res.status(200).json(success({ ...account, id: result.insertId }));
    } catch (e) {
      const err = e as Error;
      return res.status(500).json(error(err.message));
    }
  }

  async getAccountsByUserId(req: Request, res: Response): Promise<Response> {
    const { userId }: Account = req.body;
    const conn = await database.connection;
    try {
      const [rows] = await conn.execute(
        "SELECT * FROM accounts WHERE userId = ?",
        [userId]
      );
      return res.status(200).json(success(rows[0] as Account));
    } catch (e) {
      const err = e as Error;
      return res.status(500).json(error(err.message));
    }
  }

  transfer = async (req: Request, res: Response): Promise<Response> => {
    const { fromAccountId, toAccountId, amount } = req.body;
    const amt = parseFloat(amount);

    if (fromAccountId === toAccountId) {
      return res.status(500).json(error("Cannot transfer to the same account"));
    }

    const connection = await database.connection;
    await connection.beginTransaction();

    try {
      const [[fromAccount], [toAccount]] = await Promise.all([
        connection.query("SELECT * FROM accounts WHERE id = ? FOR UPDATE", [
          fromAccountId,
        ]),
        connection.query("SELECT * FROM accounts WHERE id = ? FOR UPDATE", [
          toAccountId,
        ]),
      ]);

      const fromAccountData = fromAccount[0];
      const toAccountData = toAccount[0];

      if (!fromAccountData || !toAccountData) {
        return res.status(500).json(error("Account not found"));
      }

      if (fromAccountData.userId === toAccountData.userId) {
        return res
          .status(500)
          .json(
            error("Cannot transfer to an account belonging to the same user")
          );
      }

      if (fromAccountData.balance < amt) {
        return res.status(500).json(error("Insufficient balance"));
      }

      if (
        toAccountData.type === "BasicSavings" &&
        toAccountData.balance + amt > 50000
      ) {
        return res
          .status(500)
          .json(
            error("Cannot exceed maximum balance for BasicSavings account")
          );
      }

      const newSrcBalance = fromAccountData.balance - amt;
      const newDestBalance = toAccountData.balance + amt;
      const [totalDestBalance] = await connection.query(
        "SELECT SUM(balance) as totalBalance FROM accounts WHERE userId = ?",
        [toAccountData.userId]
      );

      const transferedAt = new Date();

      await Promise.all([
        connection.query("UPDATE accounts SET balance = ? WHERE id = ?", [
          newSrcBalance,
          fromAccountId,
        ]),
        connection.query("UPDATE accounts SET balance = ? WHERE id = ?", [
          newDestBalance,
          toAccountId,
        ]),
        connection.query(
          "INSERT INTO transactions (txn_id, userId, amount, openBalance, closeBalance, type) VALUES (?, ?, ?, ?, ?, ?)",
          [
            this.generateTransactionId(),
            fromAccountData.userId,
            -amt,
            fromAccountData.balance,
            newSrcBalance,
            "dr",
          ]
        ),
        connection.query(
          "INSERT INTO transactions (txn_id, userId, amount, openBalance, closeBalance, type) VALUES (?, ?, ?, ?, ?, ?)",
          [
            this.generateTransactionId(),
            toAccountData.userId,
            amt,
            toAccountData.balance,
            newDestBalance,
            "cr",
          ]
        ),
      ]);

      await connection.commit();

      return res.status(200).json(
        success(
          {
            newSrcBalance,
            totalDestBalance:
              parseFloat(totalDestBalance[0].totalBalance) + amt,
            transferedAt,
          },
          "Transfer successful"
        )
      );
    } catch (err) {
      await connection.rollback();
      console.error(err);
      return res.status(500).json(error("Something went wrong"));
    }
  };

  // Utility function to generate a transaction ID
  generateTransactionId(): string {
    return "TXN" + Date.now().toString().slice(-10);
  }
}

export default BankController;
