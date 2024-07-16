const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Todo = require('./models/schemas');
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))


const port = process.env.PORT || 4000
mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to the database')
    app.listen(port, () => {
      console.log("Server is listenning port 4000");
    }
    )
  }

  ).catch((error) => {
    console.log("Can't connect to database. " + error);
  }
  )

/***********************Homepage of server *************************/
app.get('/', async (req, res) => {
  try {
    const regs = await Todo.find({ isFinished: 'false' })
    // res.status(200).json(regs)  
    res.send(regs)

  } catch (error) {
    res.status(500).json({ message: error.message })

    console.log("Error occured" + error.message);
  }

})

app.post("/getTodos", (req, res) => {
  
  Todo.find({
    taskDate: {
      $gte: new Date(req.body.first),
      $lte: new Date(req.body.last)
    }
  })
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});

/*******************  get one day records***************/
app.post("/getTodosDay", (req, res) => {
  console.log(new Date(req.body.qdate))
  Todo.find({
    taskDate: new Date(req.body.qdate)
  })
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});

/*******************Update a Task mark as finished ************************/
app.put("/updateTodos/:id", (req, res) => {
  // Get the id parameter from the request
  const id = req.params.id;
  Todo
    .updateOne(
      { _id: id },
      { $set: { isFinished: true, processTime: new Date() } }
    )
    .then(res.send("Updated"))
    .catch((err) => res.json(err));
});

/***********************New Task add ***************************/

app.post("/newTodos", async (req, res) => {
  // Create a new client and connect to MongoDB

  const data = {
    task: req.body.task,
    isFinished: false,
    taskDate: new Date(req.body.taskDate),
    processTime: new Date(),
  };

  const newTodo = new Todo(data);
  try {
    // Save the new todo object to the database
    const savedTodo = await newTodo.save();
    console.log('New todo saved successfully:', savedTodo);
    res.status(200).send('New todo saved successfully');
  } catch (error) {
    console.error('Error saving todo:', error);
    res.status(500).send('Error saving todo');
  }

});

/*****************************************Delete a record**********************************************/

app.delete("/deleteTodos/:id", async (req, res) => {
  console.log(req.params.id)
  Todo
    .deleteOne({ _id: req.params.id }, {})
    .then((result) => {
      res.status(200).json(result);
      console.log("The task is deleted");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
