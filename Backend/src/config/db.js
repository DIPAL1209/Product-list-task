const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb is connected");
  } catch (error) {
    console.error("Mongodb connection isfailed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
