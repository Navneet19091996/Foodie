import React, { useState }  from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link,  useNavigate } from 'react-router-dom';
// const user = require('../../backend/models/User')

export default function Login() {
    
    // const onSubmit = (req,res) =>{
        // const  a = req.body.email;
        // const  b = req.body.password;
        // const userData = usermodels.findOne({email:email})

        // if(a === userData.email && b === userData.password){
        //     console.log('VALIDITY CONFIRMED')
            
        // }
        // else{
        //     console.log('TYPE CORRECT DATA')
        // }
    // }


    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: '', password: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login", {
            method : "POST",
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
               
                email : credentials.email,
                password : credentials.password
               
            }),
        })
       
        const json = await response.json()
        console.log(json)
        if(!json.success){ 
            return alert("Enter Valid Credentials")
        }
        else{ 
            navigate('/');
            console.log('SUCCESSSSSSSS');
            localStorage.setItem('userEmail', credentials.email)
            localStorage.setItem('authToken', json.authToken)
            console.log(localStorage.getItem('authToken'))

        }
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }


    
  return (
    <div >
      <Navbar/>
      
      <div className="container">
      <form style={{marginTop : '10%'}} onSubmit={handleSubmit}>
  <div className="form-group m-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' onChange={onChange}/>
    
  </div>
  <div className="form-group m-2">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control my-2" id="exampleInputPassword1" placeholder="Password" name='password' onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary m-2">Submit</button>
  <Link to='/createUser' className='m-3 btn btn-danger'>New User</Link>
</form>
</div>
      <Footer/>
    </div>
  )
}
