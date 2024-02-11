import catchAsync from "../utils/catchAsync.js";
import transferMoney from "../services/transaction.service.js";
const sendMoney = catchAsync(async (req, res) => {
    const { body, user } = req;
    const response = await transferMoney(body, user);
    res.status(200).send({ status: "OK", data: response });
});

export { sendMoney }