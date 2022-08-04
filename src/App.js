import React, { useState } from "react";
import LoginForm from "./Components/LoginForm";
import axios from 'axios';
import { useFormik } from "formik";
import Swal from "sweetalert2";
import {Routes,Route} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import HomePage from "./Components/HomePage";
import NewBook from "./Components/NewBook";
import EditBook from "./Components/EditBook"


function App() {

  const LoginData = useFormik({
    initialValues:{
      username:null,
      pass:null
    }
  })

  let nav = useNavigate()

  const [ButtonStat,SetButtonStat] = useState(false)

  const LoginHandler = async (e) => {
    SetButtonStat(true)
    e.preventDefault();
    await axios.post("https://peaceful-woodland-66033.herokuapp.com/login",LoginData.values)
    .then( async (res)=>{
      Swal.fire({
        title:"Success !",
        text:"Login Success !",
        icon:"success"
      })
      SetButtonStat(false)
      nav('/home',{state:{login_stat:true}})
      sessionStorage.setItem('login_info',JSON.stringify(res.data.data[0]));
    })
    .catch((err)=>{
      Swal.fire({
        title:"Failed !",
        text:"Login Failed !",
        icon:"error",
        footer:err.response.data.msg
      })
      SetButtonStat(false)
    })
    
  }

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LoginForm form={LoginData} butt = {LoginHandler} stat = {ButtonStat}/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="new" element={<NewBook/>}/>
        <Route path="edit/:id" element={<EditBook/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
