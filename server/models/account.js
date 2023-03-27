import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    accnumber: {
        type: Number,
        required: true,
    },
    acctype: {
        type: String,
        required: true,
    },
    accholdername: {
        type: String,
        required: true,
    },
    ekycaadhar: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
    }
});

const accountModel = mongoose.model("accounts", accountSchema);
export default accountModel;