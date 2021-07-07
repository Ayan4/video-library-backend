const mongoose = require("mongoose");

const initializeConnectionDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ayan4:password872@cluster0.ziece.mongodb.net/video-library?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
      }
    );
    console.log("connection established");
  } catch (err) {
    console.log("Error in establishing connection " + err);
  }
};

module.exports = initializeConnectionDB;
