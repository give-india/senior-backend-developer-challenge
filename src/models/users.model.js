import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    customerId: {
        type: String,
        required: true,
        unique: true,
    },
});
const UserModel = model('user', UserSchema);
export default UserModel;