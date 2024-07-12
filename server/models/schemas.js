const mongoose= require('mongoose')

const todoSchema = mongoose.Schema(
{
todoStuff:{
    type: String,
    required:[true, "Todo part can't be null"]
    },

todoDate: 
    {
    type: Date,
    required:true
    },

isFinished: 
    {
    type: Boolean,
    required:true
    }
},
{
    timestamps:true
}

)
const mytodo=mongoose.model('Todo', todoSchema)

module.exports=mytodo
