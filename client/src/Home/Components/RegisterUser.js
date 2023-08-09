import React from 'react'
import {useState} from 'react'
import { Link, NavLink, useNavigate} from "react-router-dom";
import '../Style/Auth.css';

const RegisterUser = () => {
    const navigate = useNavigate();
    let name,value;

    const [user, setUser] = useState({
      name:"", email:"", password:"", regNo:"", phoneNo:"", imageUrl:""
    });
    const [image, setImage] = useState('');
  
    const handleInputs = (e) =>{
      console.log(e)
      name = e.target.name;
      value = e.target.value;
      setUser({...user,[name]:value})
    }
  
    const PostData = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('regNo', user.regNo);
        formData.append('phoneNo', user.phoneNo);
        formData.append('image', image);
   
        const res = await fetch("/user/signup", {
            method: "POST",
            body: formData, 
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid User");
            console.log("Invalid User");
        } else {
            window.alert("Registration Successful");
            console.log("Registration Successful");
            navigate("/user/home");
        }
    };
  
  return (
    <section className='signup'>
    <div className='container mt-6'>
        <div className="signup-content">
            <div className="signup-form">
                <h2 className='form-title'>Sign up</h2>
                <form method='POST' className='register-form' id='register-form'>
                    
                    <div className="form-group">
                        <label htmlFor="name">
                        <i class="zmdi zmdi-account material-icons-name"></i>
                        </label>

                        <input type="text" name="name" id="name" autoComplete='off' 
                        value={user.name}
                        onChange={handleInputs} 
                        placeholder='Your Name'/>   
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">
                        <i class="zmdi zmdi-email material-icons-name"></i>
                        </label>

                        <input type="email" name="email" id="email" autoComplete='off' 
                        value={user.email}
                        onChange={handleInputs}
                        placeholder='Your Email'/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>

                        <input type="password" name="password" id="password" autoComplete='off' 
                        value={user.password}
                        onChange={handleInputs}
                        placeholder='Your Password'/>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="regNo">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>

                        <input type="text" name="regNo" id="regNo" autoComplete='off' 
                        value={user.regNo}
                        onChange={handleInputs}
                        placeholder='Enter Registration Number'/>   
                    </div>


                    <div className="form-group">
                        <label htmlFor="phoneNo">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                        </label>

                        <input type="number" name="phoneNo" id="phoneNo" autoComplete='off' 
                        value={user.phoneNo}
                        onChange={handleInputs}
                        placeholder='Enter Phone Number'/>   
                    </div>

                    <div className="formInput">
                    <label>
                        Image:
                        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
                    </label>
                    </div>

                    <div className="form-group">
                        <input type="submit" name='signup' id='signup' className='form-submit' value={"Register"} 
                        onClick={PostData}
                        /> 
                        <p className='login-link my-3'>Already have an account? <Link
                        to='/user/login'>Login</Link></p>
                    </div>
                    


                </form>
                </div>
            

   
        </div>
    </div>
    </section>
  )
}

export default RegisterUser