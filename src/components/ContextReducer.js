import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) =>{
    switch (action.type) {
        case "ADD":
            return [...state, {id:action.id, name: action.name, price: action.price, size: action.size, quantity: action.quantity, img: action.img}]    // jo b state h usme ye sab like size, id, name sab kuch append kr denge

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index,1)
            return newArr

        case "UPDATE" :
            let arr = [...state]
            arr.find((food, index) =>{
                if(food.id === action.id){
                    console.log(food.quantity, parseInt(action.quantity), action.price + food.price)
                    arr[index] = {...food, quantity : parseInt(action.quantity) + food.quantity, price : action.price + food.price}
                }
                return arr
            })
            return arr

        case "DROP" :
            let emptyArray = []
            console.log("CAME TO DROP ABOVE")
            return emptyArray
            
            
    
        default:
            console.log("DEFAULT VALUE.... COULD BE ERROR HERE");
    }
}

export const CartProvider =({children}) => {
  
    const [state,dispatch] = useReducer(reducer, [])

    return (
        <CartDispatchContext.Provider value = {dispatch}>
            <CartStateContext.Provider value = {state} >
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>   
  )
}
export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
