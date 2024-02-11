import AccountModel from "../models/accounts.model.js";
import { genericPayloadValidator } from "../utils/common.js";
const payloadSchema = {
    fromAccountId: {
        type: 'string',
        required: true,
    },
    toAccountId: {
        type: 'string',
        required: true,
    },
    amount: {
        type: 'number',
        required: true,
    }
}
async function transferMoney(body, user) {
    try {
        let { amount = 0 } = body;
        const validationError = genericPayloadValidator(payloadSchema, body);
        if (validationError) {
            throw new Error(validationError);
        }
        const fromAcc = await AccountModel.findOne({ accountId: body.fromAccountId }).lean();
        const toAcc = await AccountModel.findOne({ accountId: body.toAccountId }).lean();
        //checks
        if (!fromAcc || !toAcc) throw new Error("Soemthing went wrong / Acc id does not exist");
        if (fromAcc < amount || (fromAcc.balance - amount) < 0) throw new Error("Insufficent Amount");
        if (fromAcc && toAcc && fromAcc.customerId === toAcc.customerId) {
            throw new Error("Transfer between accounts belonging to the same user is not allowed");
        }
        if (toAcc.accountType === "BasicSavings") {
            const totalAmtBasicSaving = toAcc + amount;
            if (totalAmtBasicSaving > 500000) throw new Error("BasicSavings account type should never exceed Rs. 50,000");
        }

        //updates
        const srcAcc = await AccountModel.findOneAndUpdate({ accountId: body.fromAccountId }, { $inc: { balance: -amount } }, { new: true });
        const destAcc = await AccountModel.findOneAndUpdate({ accountId: body.toAccountId }, { $inc: { balance: amount } }, { new: true })
        return {
            newSrcBalance: srcAcc?.balance || 0,
            totalDestBalance: await aggBalanceOfUser(destAcc),
            transferedAt: new Date().toISOString()
        }
    } catch (error) {
        throw new Error(error.message);
    }

}
async function aggBalanceOfUser(destinationAcc) {
    try {
        const { customerId } = destinationAcc;
        const query = [
            {
                $match: { customerId },
            },
            {
                $group: {
                    _id: null,
                    totalDestBalance: { $sum: "$balance" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalDestBalance: 1
                }
            }
        ]
        const response = await AccountModel.aggregate(query);
        if (response.length) {
            return response[0].totalDestBalance.toString();
        }
        return 0
    } catch (error) {
        throw new Error(error.message);
    }

}




export default transferMoney;