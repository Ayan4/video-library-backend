const mongoose = require("mongoose");

const initializeConnectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    });
    console.log("DB connection established");
  } catch (err) {
    console.log("Error in establishing connection " + err);
  }
};

module.exports = initializeConnectionDB;
