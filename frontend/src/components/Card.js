import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  
    let options = props.options;
    let priceOptions = Object.keys(options)
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef()
    
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    let finalPrice = quantity * parseInt(options[size])
    useEffect(()=>{
      setSize(priceRef.current.value)
    }, [])

    const handleAddToCart = async () => {
      
      let food = []
      for(const item of data){    // data upar h let data = useCart();  
        if(item.id === props.foodItems._id){    // props.foodItems._id = vo id jispe hmne abhi Add to Cart kia... hm check kr rhe h ki kya vo id hmare iss loop m phle se exist krti h ya nhi
          food = item;    
          break;
        }
      }
      
      if(food !== []){
        if(food.size === size){
          await dispatch ({type : "UPDATE", id : props.foodItems._id, price : finalPrice, quantity : quantity})          
          return
        }
        else if(food.size !== size){
          
          await dispatch({
            type : "ADD",
            id : props.foodItems._id,
            name : props.foodItems.name,
            price : finalPrice,
            quantity : quantity,
            size : size
          })
          return
        }
        return
      }
      await dispatch({
        type : "ADD",
        id : props.foodItems._id,
        name : props.foodItems.name,
        price : finalPrice,
        quantity : quantity,
        size : size
      })
      // console.log(data)
    }
 
  return (
    <div>
        
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "1560px"}}>
  <img src={props.foodItems.img} className="card-img-top" alt="..." style={{"height": "200px", objectFit : "fill"}} />
  <div className="card-body">
    <h5 className="card-title">{props.foodItems.name}</h5>
    <p className="card-text">{props.foodItems.description}</p>
    <div className='m-2'>
        <select className='w-50 bg-dark rounded' style={{"color": "white"}} onChange={(e) => setQuantity(e.target.value)}>
            { Array.from(Array(6), (e, i)=>{
                return(
                    <option key = {i+1} value={i+1}>{i+1}</option>
                )
            })

            }
        </select>
    
    
        <select className='m-2 bg-dark rounded' style={{"color": "white"}} onChange={(e) => setSize(e.target.value)} ref={priceRef}>
            {priceOptions.map((data)=>{
              return (
                <option value={data}>{data}</option>
              )
            })}            
            
        </select>
    </div>
    <div className='fs-5'>Rs. {finalPrice}/-</div><hr></hr>
    <div className='btn btn-danger justify-center' onClick={handleAddToCart}>Add to Cart</div>
    
  </div>
</div>

    </div>
  )}
