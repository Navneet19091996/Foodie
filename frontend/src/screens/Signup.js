import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Signup() {

    const [credentials, setCredentials] = useState({name : '', email: '', password: '', location : ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createUser", {
            method : "POST",
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
                name : credentials.name,
                password : credentials.password,
                email : credentials.email,
                location: credentials.location
            }),
        })
        // const body = JSON.stringify(body)
        // console.log(`This is BODY : ${body}`)
        const json = await response.json()
        console.log(json)
        if(!json.success){alert("Enter Valid Credentials")}
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

  return (
    <div style={{background: 'linear-gradient(white, lightgrey)'}}>
      <Navbar/>
        <div className="container">
      <form style={{marginTop: "7%"}} onSubmit={handleSubmit}>
  <div className="form-group m-4" >
    <label htmlFor="exampleInputName" className='my-2'>Name</label>
    <input type="text" className="form-control" id="exampleInputName" placeholder="Name" name = 'name' value = {credentials.name} onChange={onChange}/>
  </div>
  <div className="form-group m-4">
    <label htmlFor="exampleInputEmail1" className='my-2'>Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name = 'email' value = {credentials.email} onChange={onChange}/>    
  </div>
  
  <div className="form-group m-4">
    <label htmlFor="exampleInputPassword1" className='my-2'>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name = 'password' value = {credentials.password} onChange={onChange}/>
  </div>
  <div className="form-group m-4">
    <label htmlFor="exampleInputLocation" className='my-2'>Location</label>
    <input type="text" className="form-control" id="exampleInputLocation" placeholder="Location" name = 'location' value = {credentials.location} onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary m-4">Submit</button>
  <Link to = '/login' className='btn btn-danger'>Already a User</Link>
</form>
</div>
      <Footer/>
    </div>
  )
}

