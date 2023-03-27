import mongoose from "mongoose";

const connectToMongo = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://vijaykumarmandale:X56T63tKMmkDTPNa@clusterbank.frcy29r.mongodb.net/?retryWrites=true&w=majority"
  );
  if (res) {
    console.log("connected successfully");
  }
};

export default connectToMongo;
