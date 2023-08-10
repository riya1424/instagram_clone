import { useEffect, useState } from "react";
import { BrowserRouter , Routes , Route} from "react-router-dom";
import {Header} from "./component/header";
import { AddPost } from "./container/addPost";
import { Home } from "./container/home";
import { Login } from "./container/login";
import { Register } from "./container/register";
import { UserProfile } from "./container/userprofile";

function App() {
  let[state,setstate] = useState("");

  useEffect(()=>{
    const Show_header = () => {
      let status = JSON.parse(sessionStorage.getItem('status'));//value is false
      setstate(status);
      // console.log(state);
    }
    Show_header();
  },[setstate]);
  
  return (
    <BrowserRouter>
    {state ? <Header/> : ""}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/addPost" element={<AddPost/>} />
        <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
