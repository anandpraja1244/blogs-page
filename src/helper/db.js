import mongoose from "mongoose";
import { Blogs } from "../models/blogs";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "blog",
    });
    console.log("db connected========");
    // const uuser = new Blogs({
    //   name: "test data",
    //   email: "test@gamil.com",
    //   password: "3213154sdsad",
    //   about: "thes es success",
    // });
    // await uuser.save();

    console.log("connected weth host", connection);
  } catch (error) {
    console.log("fails to connected------------");
    console.log(error);
  }
};
