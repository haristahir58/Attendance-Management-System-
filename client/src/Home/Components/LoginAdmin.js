import React from 'react'
import {useState} from 'react'
import { Link, NavLink, useNavigate} from "react-router-dom";
import '../Style/Auth.css';

const LoginAdmin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData= async (e)=>{
    e.preventDefault();
    
    const res = await fetch("/admin/login",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
       email:email,  password:password
      })
      
    });

    const data = res.json();
    if(res.status===400 || !data){
      window.alert("Invalid Credentials")
    }
    else{
      window.alert("Login Successfull")
      navigate("/admin/home");
    }

  }
  return (
    <section className='signin'>
    <div className='container mt-6'>
        <div className="signin-content">
        <div className="signin-form">
                    <h2 className='form-title'>Login</h2>
                    <form method='POST' className='register-form' id='register-form'>
                        
                        <div className="form-group">
                            <label htmlFor="email">
                            <i class="zmdi zmdi-email material-icons-name"></i>
                            </label>

                            <input type="email" name="email" id="email" autoComplete='off' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Your Email'/>   
                        </div>


                        <div className="form-group">
                            <label htmlFor="password">
                            <i class="zmdi zmdi-lock material-icons-name"></i>
                            </label>

                            <input type="password" name="password" id="password" autoComplete='off'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder='Your Password'/>   
                        </div>



                        <div className="form-group">
                            <input type="submit" name='signin' id='signin'
                            onClick={loginData}
                            className='form-submit' value={"Login"} /> 

                        </div>

                    </form>
                    </div>    
            </div>
        </div>
        </section>

  )
}

export default LoginAdmin