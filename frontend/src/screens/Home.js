import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

export default function Home() {
  
  const [foodCategory, setFoodCategory] = useState([])
  const [foodData, setFoodData] = useState([])
  const [search, setSearch] = useState('')

  const loadData = async () =>{
    let response = await fetch('http://localhost:5000/api/foodDataDisplay', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      }
    }  )
    
    response = await response.json();
    setFoodCategory(response[0])
    setFoodData(response[1])

  }
  useEffect (()=>{
    loadData();
  },[])
  
  return (
    
    <div>
     <div><Navbar/></div> 
      
      
      
      <div>
      <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner" >
  <div className='carousel-caption' style={{"zIndex" : 10}} >
  <div className="d-flex my-4" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}  />
        {/* <button className="btn btn-danger" type="submit">Search</button> */}
      </div>
      </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900x700/?fruit" className="d-block w-100" alt="..." style={{objectFit: "cover", height: "500px"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{objectFit: "cover", height: "500px"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?icecream" className="d-block w-100" alt="..." style={{objectFit: "cover", height: "500px"}} />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      </div>




      {/* <div className='d-flex m-4'> */}
         <div className='container mb-3 overflow-hidden'>
          {
            foodCategory !== [] ? foodCategory.map((data)=>{
                return  (
                  <div className='row'>
                  <div key={data._id} className='fs-2 fst-bolder fst-italic text-center m-3 text-primary'>{data.CategoryName}</div><hr />
                  {foodData !== [] ? foodData.filter((item)=>{
                    return item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())
                      
                  }).map((filteredItems)=>{
                    return (
                      <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                        {/* <Card foodName = {filteredItems.name} image = {filteredItems.img} optionsHalf = {filteredItems.options[0].half} options = {filteredItems.options[0]} optionsFull = {filteredItems.options[0].full} description = {filteredItems.description}/> */}
                        <Card foodItems = {filteredItems} options = {filteredItems.options[0]} />
                      </div>
                    )
                  })
                  : "NO SUCH DISH FOUND"}
                  </div>
                )
            }) : ""
          }
         
          </div>
         {/* <div className='m-3'><Card/></div>
         <div className='m-3'><Card/></div>
         <div className='m-3'><Card/></div>          */}
      {/* </div> */}
      <div><Footer/></div>
    </div>
    
  )
}
