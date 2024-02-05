const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongodb compass`.bgMagenta.white);
  } catch (error) {
    console.log(`Mongo connect error ${error}`.red.white);
  }
};

module.exports = connectDb;
