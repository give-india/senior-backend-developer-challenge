import accountModel from "../models/account.js";
import transactionModel from "../models/transaction.js";

class bankController {
  static getAllAccounts = async (req, res) => {
    // res.send("get all accounts");
    const allAccounts = await accountModel.find({});
    return res.status(200).json({ allAccounts });
  };

  static createNewAccount = async (req, res) => {
    // res.send("create new account");
    const { accnumber, acctype, accholdername, ekycaadhar, amount } = req.body;

    try {
      if (accnumber && acctype && accholdername && ekycaadhar) {
        const isAccNumber = await accountModel.findOne({
          accnumber: accnumber,
        });
        if (!isAccNumber) {
          const newAccount = accountModel({
            accnumber,
            acctype,
            accholdername,
            ekycaadhar,
            amount,
          });

          const response = await newAccount.save();
          if (response) {
            return res
              .status(200)
              .json({ message: "Successfully new account created" });
          }
        } else {
          return res.status(400).json({ message: "Account already exists" });
        }
      } else {
        return res.status(400).json({
          message: "Account Number, Type, Name and EKYC fields are required",
        });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static moneyTransfer = async (req, res) => {
    // res.send("Money Transfer");
    const { fromaccid, toaccid, amount } = req.body;
    var toNewBal = 0;
    try {
      if (fromaccid && toaccid && amount) {
        const isFromaccid = await accountModel.findOne({
          accnumber: fromaccid,
        });
        const isToaccid = await accountModel.findOne({ accnumber: toaccid });
        // Check validation if from account number is exists
        if (isFromaccid) {
          // Check validation if to account number is exists
          if (isToaccid) {
            // Check validation Transfer between accounts belonging to the same user is not allowed
            if (isFromaccid.ekycaadhar !== isToaccid.ekycaadhar) {
              // Check validation Source account should have the required amount for the transaction to succeed
              if (isFromaccid.amount >= amount) {
                toNewBal = isToaccid.amount + amount;
                // Check validation The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000
                if (
                  (isToaccid.acctype === "BasicSavings" &&
                    toNewBal <= 5000000) ||
                  isToaccid.acctype !== "BasicSavings"
                ) {
                  // const allToaccid = await accountModel.find({ ekycaadhar: isToaccid.ekycaadhar });
                  // Get total aggregate amount for dest account
                  const allToaccid = await accountModel.aggregate([
                    { $match: { ekycaadhar: isToaccid.ekycaadhar } },
                    {
                      $group: {
                        _id: "$ekycaadhar",
                        totaldestbal: { $sum: "$amount" },
                      },
                    },
                  ]);

                  var transferedat = Date.now(); // timestamp in milliseconds
                  var newsrcbal = isFromaccid.amount - amount;
                  var newdestbal = isToaccid.amount + amount;
                  var totaldestbal = allToaccid[0].totaldestbal + amount;
                  // Save transfer amount details in transaction
                  const transferAmount = transactionModel({
                    fromaccid,
                    toaccid,
                    amount,
                    newsrcbal,
                    totaldestbal,
                    transferedat,
                  });

                  const responseTrans = await transferAmount.save();

                  const responseSrcAcc = await accountModel.updateOne(
                    { accnumber: fromaccid },
                    { $set: { amount: newsrcbal } }
                  );

                  const responseDestAcc = await accountModel.updateOne(
                    { accnumber: toaccid },
                    { $set: { amount: newdestbal } }
                  );

                  if (responseTrans && responseSrcAcc && responseDestAcc) {
                    return res
                      .status(200)
                      .json({ message: "Successfully amount transfered", newSrcBalance: newsrcbal, totalDestBalance: totaldestbal, transferedAt: transferedat });
                  }
                } else {
                  return res.status(400).json({
                    message:
                      "The balance in the ‘BasicSavings’ account type should never exceed Rs. 50,000",
                  });
                }
              } else {
                return res.status(400).json({
                  message:
                    "Source account should not have the required amount for the transaction to succeed",
                });
              }
            } else {
              return res.status(400).json({
                message:
                  "Transfer between accounts belonging to the same user is not allowed",
              });
            }
          } else {
            return res
              .status(400)
              .json({ message: "To Account ID not exists" });
          }
        } else {
          return res
            .status(400)
            .json({ message: "From Account ID not exists" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "fromaccid, toaccid, amount fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default bankController;
