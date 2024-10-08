import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to Database...");
  } catch (error) {
    console.log("Error connecting to Database...", error.message);
  }
};

export default connectToDB;
