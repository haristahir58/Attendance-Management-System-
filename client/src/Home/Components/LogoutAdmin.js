import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const LogoutAdmin = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        fetch('/admin/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then((res)=>{
            navigate('/admin/login',{replace:true})
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

export default LogoutAdmin