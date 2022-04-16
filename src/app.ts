import express, { json } from "express";
import mongoose from "mongoose";
import User from "./models/user";
const app = express();
const port = process.env.PORT || 5000;

app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res, next) => {
  User.find()
    .exec()
    .then((results) => {
      return res.status(200).json({ users: results, count: results.length });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message, error: err });
    });
});

app.post("/user", (req, res, next) => {
  let { mail, name, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    mail,
    name,
    password,
  });

  return user
    .save()
    .then((result) => {
      return res.status(201).json({ user: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message, error: err });
    });
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
