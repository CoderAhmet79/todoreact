
import Header from "./Components/Header";
import { useState } from "react";
import EditContainer from "./Utils/EditContainer";
import Container from "./Components/Container";



const fetchUsers = async () => {
  const res = await fetch("http://localhost:4000");
  return res.json();
};


function App() {
  const [globalNum, setGlobalNum]=useState(0)
  const handleNum= ((num)=> setGlobalNum(prev=> prev+num) )

  
  return (
    
    <div className="App">
      <EditContainer/>
       <Header handleNum={handleNum} />
       <Container globalNum={globalNum} />
 
    </div>
      
  );
}

export default App;
