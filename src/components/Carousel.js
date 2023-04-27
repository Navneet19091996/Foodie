import React from 'react'

export default function Carousel() {
  return (
    <div>
      <div id="carouselExample" className="carousel slide"  >
  <div className="carousel-inner" style={{"maxHeight" : "500px"}}>
  <div className='carousel-caption' style={{"zIndex" : 10}} >
  <div className="d-flex my-4" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}  />
        {/* <button className="btn btn-danger" type="submit">Search</button> */}
      </div>
      </div>
    <div className="carousel-item active" >
    {/* <div className="carousel-item active" style={{objectFit: "contain !important", 'height': '500px'}}> */}
      <img src="https://source.unsplash.com/random/400×400/?fruit" className="d-block w-100" alt="..." style={{filter: "brightness(30%)", objectFit: 'inherit'}}/>
    </div>
    <div className="carousel-item" >    
      <img src="https://source.unsplash.com/random/400×400/?pizza" className="d-block w-100" alt="..."  style={{filter: "brightness(30%)", objectFit: 'fill'}}/>
    </div>
    <div className="carousel-item" >
        <img src="https://source.unsplash.com/random/400×400/?icecream" className="d-block w-100" alt="..." style={{filter: "brightness(30%)", objectFit: 'fill'}}/>
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
  )
}
