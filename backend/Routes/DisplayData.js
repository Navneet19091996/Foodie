const express = require('express');
const router = express.Router();

router.post('/foodDataDisplay', (req,res)=>{
    console.log('foodDataDisplay route called')
    try {
        console.log("INSIDE TRY OF FOOD DATA DISPLAY")
        console.log(global.foodCategory)
        res.send([global.foodCategory, global.foodData])        
    } catch (error) {
        console.log(error)
        console.error(error.message)
        res.send("SERVER ERROR")
    }
})

module.exports = router;