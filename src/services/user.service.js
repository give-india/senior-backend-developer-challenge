import bcrypt from "bcrypt";
import UserModel from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import { genericPayloadValidator } from "../utils/common.js";

const token_key = process.env.TOKEN_KEY || "aBCDEFGHIJKLM";

const payloadSchema = {
    emailId: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    }
}

async function getUserToken(body) {
    try {
        const { emailId, password } = body;
        const validationError = genericPayloadValidator(payloadSchema, body);
        if (validationError) {
            throw new Error(validationError);
        }
        let userExist = await UserModel.findOne({ emailId }).lean();
        if (!userExist) {
            throw new Error("User does not exist");
        }

        if (await bcrypt.compare(password, userExist["password"])) {
            const token = generateAuthToken({
                emailId: userExist.emailId,
                customerId: userExist.customerId
            })
            delete userExist["password"];
            return { ...userExist, token }
        }
        throw new Error("User credentials are not correct");
    } catch (error) {
        throw new Error(error.message);
    }

};
const generateAuthToken = (data, expiresIn = '10h') => {
    const token = jwt.sign(data, token_key, { expiresIn });
    return token;
}
const userService = {
    getUserToken
}

export default userService;