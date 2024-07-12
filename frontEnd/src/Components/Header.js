import { useEffect, useState } from 'react'

const Header = ({handleNum}) => {
  const [month, setMonth] = useState(0);
  var monthName;
  const initialMonthFirstDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + month,
    1
  );

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
          onClick={() => {setMonth(month - 1)
            handleNum(-1)
          }} />
      </div>
      <div className="monthHeader"> {monthName} </div>
      <div className="nextHeader">
        <img src="img/skip_next.png"
          title='Next Month'
          onClick={() => {setMonth(month + 1)
            handleNum(1)
          }} />
      </div>
    </header>

  )
}

export default Header
