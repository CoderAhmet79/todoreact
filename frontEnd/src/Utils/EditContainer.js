import axios from "axios"
import { useState, useEffect, useRef } from "react"

const EditContainer = ({ dateInfo, handleShow }) => {
  const addRef = useRef()
  const hourRef = useRef()

  const [fetchedTasks, setFetchedTasks] = useState([])
  const [updated, setUpdated] = useState(true)
  const queryDate = dateInfo

  const handleAddTask= async () => {
   if(hourRef.current && hourRef.current.value === '') {
    alert("Hour info can not be empty/missing")
    hourRef.current.focus()
    return
   }
   else if (addRef.current && addRef.current.value === '')
   {
    alert("Task info can not be empty")
    addRef.current.focus()
    return
   }
   const datas={
    task: addRef.current.value,
    isFinished: false,
    taskDate: queryDate.first +" "+ hourRef.current.value
   }
   
    try {
      await axios.post("http://localhost:4000/newTodos", datas);
      fetchDailyTasks()
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  const handleToComplete = async (id) => {
    await axios.put("http://localhost:4000/updateTodos/" + id, id)
      .then(response => {if (response.data === "Updated") fetchDailyTasks()})
      .catch(error => alert(error.message))
  }

  const handleDelete = async (id) => {
    if (window.confirm('Do you really want to delete this task') === true) {
      await axios.delete("http://localhost:4000/deleteTodos/" + id, id)
        .then(response => { if (response.data.acknowledged === true) fetchDailyTasks() })
        .catch(error => alert(error.message))
    }
  }

  const fetchDailyTasks = async () => {
    try {
      const response = await axios.post("http://localhost:4000/getTodos", queryDate);
      setFetchedTasks(response?.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchDailyTasks()
  }, [])

  return (
    <div className="editContainer" >
      <div className="closeIcon">  <span style={{ marginLeft: "100px" }}></span>
        <img src="img/close_icon.png"
          style={{ float: "right", opacity: 1, width: "50px", cursor: "pointer" }}
          title="Close"
          alt='ToDo'
          onClick={() => handleShow(false)} />
      </div>
      <div className="taskManage">
        <ul className="tableList">
          <li> Task management for: {(new Date(queryDate.last).toUTCString()).substring(0, 16)} </li>
          <li className="listButton">
            <div>Hour </div> &nbsp; <input type='time' id='taskHour' ref={hourRef}/>
            <div className="input-container">
              <input placeholder="Add new task..." type="text" ref={addRef} />
              <button className="button" onClick={() => handleAddTask()}>Add</button>
            </div>
          </li>
          <li className="taskList" style={{backgroundColor:"#FF7777", marginTop:"15px"}}>
              <div>Task time</div>
              <div>Task to do</div>
              <div>
               Click to toggle Finished/ Not Completed
              </div>
              <div>Click to delete the task</div>
            </li>

          {fetchedTasks.map(task =>
            <li className="taskList">
              <div>{(task.taskDate).substr(11, 5)}</div>
              <div>{task.task} </div>
              <div>
                <img src={task.isFinished ? "img/finished.png" : "img/notComplete.png"}
                  title={task.isFinished ? "Completed" : "Not Completed"}
                  onClick={task.isFinished ? (() => alert("You can't change old tasks")) : () => handleToComplete(task._id)}
                />
              </div>
              <div><img src="img/delete.png" title='Delete' onClick={() => handleDelete(task._id)} /></div>
            </li>
          )}
        </ul>

      </div>
    </div>
  )
}

export default EditContainer
