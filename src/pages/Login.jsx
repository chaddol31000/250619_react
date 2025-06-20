 import React from 'react'
import useAppStore from '../stores/useAppStore'
import axios from 'axios';
 
 function Login() {
  const {username, setLogin} = useAppStore();

  const doLogin=async(id)=> {
    const requestForm = {username:id, password:'1234'};
    console.log(requestForm);
    try {
      const response = await axios.post('http://localhost:8080/login',new URLSearchParams(requestForm), {withCredentials:true});
      const {username, role} = response.data;
      setLogin(username, role);
    } catch(err){ 
      console.log(err);
    }
  }

   return (
     <div>
      <button onClick={()=>doLogin('spring')} disabled={username && username!==''}>spring 로그인</button>
      <button onClick={()=>doLogin('summer')} disabled={username && username!==''}>summer 로그인</button>
      <button onClick={()=>doLogin('winter')} disabled={username && username!==''}>winter 로그인</button>
     </div>
   )
 }
 
 export default Login