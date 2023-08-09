import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        fetch('/user/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then((res)=>{
            navigate('/user/login',{replace:true})
            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }).catch((err)=>{
            console.log(err)
        })
    })

  return (
    <div>Logout</div>
  )
}

export default Logout