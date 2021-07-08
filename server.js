const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const videoRoute = require("./routes/video.router");
const userRoute = require("./routes/user.router");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
dbConnect();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello from video library server",
    success: true
  });
});

app.use("/videos", videoRoute);
app.use("/user", userRoute);

// Error Handler routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
