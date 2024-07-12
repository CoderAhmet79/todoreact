const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const cors = require('cors')
const app =  express()



app.get('/', async (req, res) =>{
  try {
    const regs= await todo.find({isFinished:'false'})
console.log("here")
   // res.status(200).json(regs)  
    res.send(regs)
 
    
  } catch (error) {
    res.status(500).json({message:error.message})

    console.log("Error occured"+error.message);
  }
 
})

app.post('/new', async(req, res)=>{
try {
  const todom= await todo.create(req.body)
  res.status(200).json(todom)
  console.log(req.body); 
   res.send(req.body)
} catch (error) {
  console.log("Error occured: "+error);
  res.status(500).json({message:error.message})
}

})

// update a product
app.put('/update/:id', async(req, res) => {
  try {
      const {id} = req.params;
      const todos = await todo.findByIdAndUpdate(id, req.body);
      // we cannot find any product in database
      if(!todos){
          return res.status(404).json({message: `cannot find any product with ID ${id}`})
      }
      const updatedTodo = await todo.findById(id);
      res.status(200).json(updatedTodo);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// delete a product

app.delete('/delete/:id', async(req, res) =>{
  try {
      const {id} = req.params;
      const todos = await todo.findByIdAndDelete(id);
      if(!product){
          return res.status(404).json({message: `cannot find any product with ID ${id}`})
      }
      res.status(200).json(todos);
      
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})


module.exports = router