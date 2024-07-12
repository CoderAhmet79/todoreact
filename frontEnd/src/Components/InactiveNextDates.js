import React from 'react'

const InactiveNextDates = ({globalNum}) => {
    
const nextMonthTotalDay = new Date(
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
    
    inActiveDaysArr.push(nextMonthTotalDay-startDate+i+1 )
  }
console.log(inActiveDaysArr)
  return (
    <div>
      
    </div>
  )
}

export default InactiveNextDates
