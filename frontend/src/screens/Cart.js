import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from '../trash.png'

export default function Cart() {
  
    let data = useCart();
    let dispatch = useDispatchCart();
    if(data.length === 0){        // data is a typeof Array and hence we can use length property of Array
        return(
            
            <div className='fs-2 text-center text-white mt-5'>This Cart is Empty Right Now. Please Fill Some Items Here.</div>
            
        )
    }

    const handleCheckOut = async () =>{
        let userEmail = localStorage.getItem('userEmail')
        let response = await fetch("http://localhost:5000/api/orderData", {
            method : "POST",
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
                order_data : data,
                email : userEmail,
                order_date : new Date().toDateString()
            })
        })
        console.log("CAME TO HERE IN THE HANDLECHECOUT ABOVE")
        if(response.status === 200){
            console.log("IN THE RESPONSE STATUS OF 200 JUST ABOVE DROP IN CART.JS")
            dispatch({type : "DROP"})
        }
        console.log("CAME TO HERE IN THE HANDLECHECOUT BELOW")
    }
    
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
    <div>
      <div className='container table-responsive table-responsive-sm table-responsive-md'>
      <table class="table">
  <thead className='fs-4 text-white'>
    <tr className='mb-4'>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Option</th>
      <th scope="col">Amount</th>
    </tr>
    
  </thead>
  <tbody>
    {
        data.map((food,index)=>{
            return(
            <tr className='text-white '>
                <th scope='row'>{index+1}</th>
                <td>{food.name}</td>         
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <button type = 'button' className='btn bg-white m-2'><img src = {trash} alt = 'Delete from Cart' onClick={()=>dispatch({type: "REMOVE", index : index})} style={{height : "20px", background: "transparent", marginLeft: "5% !important"}} /></button>
            </tr>
            )
        })
    }
  </tbody>
</table>
<div>
    <h1 className='fs-2 text-white me-2 mb-4 mt-4'>Total Price : {totalPrice}/-</h1>

<button className='btn btn-primary' onClick={handleCheckOut}>Check  Out</button>
</div>
</div>
    </div>

  )
}
