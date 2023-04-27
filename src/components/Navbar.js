import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("authToken")  
    navigate('/')
  }
  let data = useCart();
  const [cartView, setCartView] = useState(false);

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-0">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-italic fst-bold" to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
             {
             localStorage.getItem("authToken") ? 
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/myOrders">My Orders</Link>
        </li> : ""
             }  
      </ul>
             {
              !localStorage.getItem("authToken") ?
        <div className='d-flex '>
          <Link className="btn btn-primary text-white me-2 fs-6" to="/createUser">Signup</Link>
          <Link className="btn btn-danger text-white me-2 fs-6" to="/login">Login</Link>
        </div> : 
        <div>
          <div className='btn btn-primary text-white me-3 fs-6' onClick={()=> setCartView(true)}>My Cart <Badge className='bg-danger rounded-pill' style={{position : "absolute", top: "6px"}}>{data.length}</Badge></div>
          {cartView?<Modal onClose={()=> setCartView(false)}><Cart /></Modal>: null}
          <div className='btn btn-danger text-white me-2 fs-6' onClick={handleLogout}>Logout</div>
        </div>

             }
      
    </div>
  </div>
</nav>
    </div>
  )
}
