const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: String,
  isFinished: Boolean,
  taskDate: Date,
  processTime: Date
});

const TodoModel = mongoose.model("todos", todoSchema);
module.exports = TodoModel;
