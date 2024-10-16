import mongoose from "mongoose";

const connectDb = (mongo_url) => {
    try {
        mongoose.connect(mongo_url);
        console.log(`Mongo Daabase connect at ${mongo_url}`);
    } catch (error) {
        console.log(error, "please check connectDb in DB");
    }
};

export default connectDb;
