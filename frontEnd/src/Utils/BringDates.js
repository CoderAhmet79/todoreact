var globalNum=0
const prevMonthTotalDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + globalNum,
    0
  ).getDate();

   first = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + globalNum,
    1
  );
  second = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1 + globalNum,
    0
  );
  const initialMonthFirstDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + globalNum,
    1
  );
  const initialMonthTotalDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1 + globalNum,
    0
  ).getDate();

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
  if (startDate !== 0) {
    for (let i = 0; i < startDate; i++) {
      inactivePrevMonthDays.unshift(prevMonthTotalDay - i);
    }
  }
  
  console.log("prev month", prevMonthTotalDay)
  console.log(initialMonthTotalDay)
  console.log("firstdate", startDate)
  console.log(dayofWeeks[startDate])