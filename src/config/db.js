import { connect } from "mongoose";
const URL = "";
const connectDb = () => {
  console.log('connecting db....')
  connect(URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((error) => {
      console.log(error.message);
      process.exit(-1);
    });
};

export default connectDb;
