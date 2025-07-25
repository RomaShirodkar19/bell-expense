const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to mongoDB", err);
        process.exit(1);
    }

}

module.exports = connectDB;