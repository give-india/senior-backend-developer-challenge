import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: String,
    userName: String,
    contactNo: String,
    address: String
  }, { timestamps: true });
    
const User = mongoose.model("User", userSchema);  

const addUserDataModel = (data) => {    
    return User.create(data)
}

const getDataByidModel = (id) => {    
  return User.findById(id)
}

export { addUserDataModel, getDataByidModel }
