import React from 'react'
import InactivePrevDates from './InactivePrevDates'
import MonthDays from './MonthDays'

const Container = ({globalNum, setDate, editWindow}) => {
    
  return (
    <div  className="container">
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
       <InactivePrevDates globalNum={globalNum}/> 
       <MonthDays globalNum={globalNum} setDate= {setDate}  />
    </div>
  )
}

export default Container
