import express from "express";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.r27pb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
      app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
      });
    });
} catch (err) {
  console.log(err);
}
