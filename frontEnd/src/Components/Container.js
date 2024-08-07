import React from 'react'
import InactivePrevDates from './InactivePrevDates'
import MonthDays from './MonthDays'

const Container = ({globalNum, setDate, editWindow}) => {
    
  return (
    <div  className="container">
          {/* Each day of the week is represented as a cell */}
      <div className="dayCell">
            MONTAG
        </div>
        <div className="dayCell">
            DIENSTAG
        </div>
        <div className="dayCell">
            MITWOCH
        </div>
        <div className="dayCell">
            DONERSTAG
        </div>
        <div className="dayCell">
            FREITAG
        </div>
        <div className="dayCell">
            SAMSTAG
        </div>
        <div className="dayCell">
            SONTAG
        </div>
        {/* Component to display inactive previous dates */}
       <InactivePrevDates globalNum={globalNum}/> 
         {/* Component to display the days of the current month */}
       <MonthDays globalNum={globalNum} setDate= {setDate}  />
    </div>
  )
}

export default Container
