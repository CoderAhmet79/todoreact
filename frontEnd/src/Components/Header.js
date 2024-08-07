import { useEffect, useState } from 'react'
// This is a React functional component named Header that displays the current month and year. 
// It allows users to navigate to the previous and next months using buttons. 
// The component uses the useState hook to manage the current month and updates the displayed month name accordingly.

const Header = ({ handleNum }) => {
  const [month, setMonth] = useState(0);
  var monthName;
  //First day of the month to locate cells on the page
  const initialMonthFirstDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + month,
    1
  );
// Get current month name locally
  monthName = initialMonthFirstDay.toLocaleString("de-de", { month: "long" }) +
    "  " +
    initialMonthFirstDay.getFullYear()

  useEffect(() => {

    monthName = initialMonthFirstDay.toLocaleString("de-de", { month: "long" }) +
      "  " +
      initialMonthFirstDay.getFullYear()

  }, [month]);

  return (

    <header>
      <div className="prevHeader">
        <img src='img/skip_previous.png'
          title='Previous Month'
          onClick={() => {
            setMonth(month - 1)
            handleNum(-1) //Decrease dates (months) 
          }} />
      </div>
      <div className="monthHeader"> {monthName} </div>
      <div className="nextHeader">
        <img src="img/skip_next.png"
          title='Next Month'
          onClick={() => {
            setMonth(month + 1) //Increase dates(months)
            handleNum(1)
          }} />
      </div>
    </header>

  )
}

export default Header
