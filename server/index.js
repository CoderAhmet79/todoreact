const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const todo = require('./models/schemas');
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
mongoose.connect('mongodb+srv://Tombak79:TodoMon2018@mycluster.ei7jh6h.mongodb.net/MyDBs?retryWrites=true&w=majority')
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
    const regs = await todo.find({ isFinished: 'false' })
    // res.status(200).json(regs)  
    res.send(regs)

  } catch (error) {
    res.status(500).json({ message: error.message })

    console.log("Error occured" + error.message);
  }

})

app.post("/getTodos", (req, res) => {
  
  todo.find({
    taskDate: {
      $gte: new Date(req.body.first),
      $lte: new Date(req.body.last)
    }
  })
    .then((todos) => res.json(todos))
    .catch((err) => console.log(err));
});



/*******************Update a Task mark as finished ************************/
app.put("/updateTodos/:id", (req, res) => {
  // Get the id parameter from the request
  const id = req.params.id;
  todo
    .updateOne(
      { _id: id },
      { $set: { isFinished: true, processTime: new Date() } }
    )
    .then(console.log("the record updated"))
    .catch((err) => res.json(err));
});

/***********************New Task add ***************************/

app.post("/newTodos", (req, res) => {
  const uri =
    "mongodb+srv://Tombak79:TodoMon2018@mycluster.ei7jh6h.mongodb.net/MyDBs?retryWrites=true&w=majority";

  // Create a new client and connect to MongoDB

  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db("MyDBs");
      const haiku = database.collection("todos");

      // Create a document to insert
      const doc = {
        task: req.body.task,
        isFinished: false,
        taskDate: new Date(),
        processTime: new Date(),
      };

      // Insert the defined document into the "haiku" collection
      const result = await haiku.insertOne(doc);

      // Print the ID of the inserted document
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      // Close the MongoDB client connection
      await client.close();
    }
  }
  // Run the function and handle any errors
  run().catch(console.dir);
});

/*****************************************Delete a record**********************************************/

app.delete("/deleteTodos/:id", async (req, res) => {
  todo
    .deleteOne({ _id: req.params.id }, {})
    .then((result) => {
      res.status(200).json(result);
      console.log("The task is deleted");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
