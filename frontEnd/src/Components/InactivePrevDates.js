import React from 'react'


const InactivePrevDates = ({globalNum}) => {

const prevMonthTotalDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + globalNum,
    0
  ).getDate();

  const initialMonthFirstDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + globalNum,
    1
  );

  // Determine weekday of current first day of month
  const firstWeekDay = initialMonthFirstDay.toDateString().slice(0, 3);
  const dayofWeeks = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  const startDate = dayofWeeks[firstWeekDay];
 
  let inActiveDaysArr = []
  for(let i=0; i<startDate; i++)
  { 
    inActiveDaysArr.push(prevMonthTotalDay-startDate+i+1 )
  }

  return (
    <>
    
    {inActiveDaysArr.map(item => 
       <div className="unitCell">
            <div className="numberExpire">{item } </div>
            <div className="icon"><img src="img/task_expire.png" /></div>
            <div className="restTime"></div>
        </div>
    
    )}   
    </>
  )
}

export default InactivePrevDates
