const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://Rishab829:Kanchan%401@expresstry.wqhmyb0.mongodb.net/TodoList?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());

//Schema
const schema = new mongoose.Schema({
  // title: String,
  // content: String,
  todos: Array,
  todos2: String,
});

//Model
const Model = mongoose.model("todos", schema);

app.get("/", (req, res) => {
  Model.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

var db = mongoose.connection;

const updateDoc = async (id, user) => {
  try {
    const newUser = new Model(user);
    const updatedResult = await Model.findByIdAndUpdate(
      { _id: id },
      { $set: { todos: newUser } }
    );
    console.log(updatedResult);
  } catch (error) {
    console.log(error);
  }
};

var userid = "63a2b88844afd4ccceb5962c";
app.post("/", async (req, res) => {
  const user = req.body;
  const newUser = new Model(user);
  // await newUser.save();

  // await Model.findByIdAndUpdate({ _id: userid }, { todos: newUser });
  updateDoc(userid, user);
  // db.collection("todos").insert(newUser);
  res.json(user);
});

// For events

//Schema
const eventSchema = new mongoose.Schema({
  events: Array,
});

//Model
const EventModel = mongoose.model("events", eventSchema);

app.get("/events", async (req, res) => {
  db.collection("events")
    .find()
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

app.post("/events", async (req, res) => {
  const user = req.body;
  const newUser = new EventModel(user);
  // db.collection("events").insertOne(newUser);
  //
  // Try doing below one
  // await db.collection("events").updateOne(
  //   {
  //     id: {
  //       $oid: "63a3372381c133ca55bb468d",
  //     },
  //   },
  //   { $set: { events: newUser } },
  //   function (err, doc) {
  //     if (err) {
  //       console.log("Something wrong when updating data!");
  //     }
  //     console.log(doc);
  //   }
  // );
  EventModel.findByIdAndUpdate(
    { _id: "63a3372381c133ca55bb468d" },
    { events: newUser },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
    }
  );
  res.json(newUser);
});

app.listen(port, () => console.log("Server started on port " + port));
