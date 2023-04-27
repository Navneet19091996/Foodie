const express = require('express')
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data          // order_data hum frontend se backend pr bhejenge
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        let myOrderData = await Order.findOne({"email" : req.body.email})
        res.json({
            orderData : myOrderData
        })
        
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})




module.exports = router