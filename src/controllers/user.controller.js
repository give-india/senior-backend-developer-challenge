import catchAsync from "../utils/catchAsync.js";
import userService from "../services/user.service.js";

const getToken = catchAsync(async (req, res) => {
    const { body } = req;
    const response = await userService.getUserToken(body);
    res.status(200).send({ status: "OK", data: response });
});


export { getToken } 