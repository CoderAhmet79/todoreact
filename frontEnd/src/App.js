
import Header from "./Components/Header";
import { useState } from "react";
import Container from "./Components/Container";



const fetchUsers = async () => {
  const res = await fetch("http://localhost:4000");
  return res.json();
};


function App() {
  const [globalNum, setGlobalNum]=useState(0)
  const handleNum= ((num)=> setGlobalNum(prev=> prev+num) )
  const [myDate, setMyDate] = useState('')
 
  const setDate= ((date)=> setMyDate(date)) 

  return (
    
    <div className="App">
       <Header handleNum={handleNum} />
       <Container globalNum={globalNum} setDate={setDate} />
    </div>
         
  );
}

export default App;
