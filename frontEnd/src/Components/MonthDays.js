import { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import EditContainer from '../Utils/EditContainer';


const MonthDays = ({ globalNum }) => {
const [isDataLoaded, setIsDataLoaded] = useState(false);
const [taskDays, setTaskDays] = useState([]);
const [dateInfo, setDateInfo] = useState()
const [showEdit, setShowEdit] = useState(false)


let activeMonthDays = [];
  
const myDate= new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1+globalNum,
  1
)

const initialMonth = myDate.getFullYear() + "-"+myDate.getMonth()
const bringDays = (()=> {
  const initialMonthTotalDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1 + globalNum,
    0
  ).getDate();



  for (let j = 1; j <= initialMonthTotalDay; j++) {
    activeMonthDays.push(j.toString());
  }
  })

  const fetchMonthlyTasks = async () => {
    try {
      const datas = {
        first: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + globalNum,
          1
        ),
        last: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1 + globalNum,
          0
        )
      };
  
      const response = await axios.post("http://localhost:4000/getTodos", datas);
      const fetchedTaskDays = response.data?.map(task => new Date(task.taskDate).getDate().toString()) || [];
      setTaskDays(fetchedTaskDays);
      setIsDataLoaded(true); // Set a flag to indicate that data has been loaded
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

 bringDays()

useEffect(()=> {
  const fetchData = async () => {
    await fetchMonthlyTasks();
  };

  fetchData();
},[globalNum])

const handleShow= ((item)=> setShowEdit(item))

function showEditContainer(day) {
  const sum= parseInt(day) + 1
  const date1= initialMonth+'-'+day
  const date2= initialMonth+'-'+ sum
  const dateMain= {first:date1, last:date2}
  setDateInfo(dateMain)
  handleShow(true)
  return   
}


  return (
    <>
    {isDataLoaded ? (
      activeMonthDays.map((day) => (
        <div className="unitCell" >
          <div className="number"> {day} </div>
          <div className="icon">
            <img src={taskDays.includes(day) ? "./img/edit_calendar.png" : "./img/add_task.png"} 
            alt='Task' 
             onClick={()=> showEditContainer(day)}           
            />
          </div>
          <div className="restTime">  </div>
        </div>
      ))
    ) : (
      <p>Loading data...</p>
    )}
    {showEdit && <EditContainer dateInfo={dateInfo} handleShow= {handleShow} /> }
  </>
  )
}

export default MonthDays
