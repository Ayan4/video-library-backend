const express = require("express");
const dbConnect = require("./config/dbConnect");
const videoRoute = require("./routes/video");
const app = express();

dbConnect();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello from video library server",
    success: true
  });
});

app.use("/api", videoRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server Started on port 3000");
});
