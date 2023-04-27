const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://foodApp:foodApp@cluster0.movpouf.mongodb.net/foodAppDatabase?retryWrites=true&w=majority'
const mongoConnect =  () =>{
    mongoose.connect(mongoURI).then( async ()=>{
        console.log('CONNECTED')
        const fetchedData = await mongoose.connection.db.collection('foodData')
        console.log("CONNECTION TO DB MADE")
        // console.log(fetchedData)
        // console.log('\n\n\n')
        // console.log(fetchedData.find({}))
        
        const count = await fetchedData.countDocuments()
        console.log(`Number of documents in 'foodCategory' collection: ${count}`)

         global.foodData = await fetchedData.find({}).toArray()
         console.log("AFTER DATA STATEMENT")
        //  console.log(global.foodData)

         const fetchedFoodCategory = await mongoose.connection.db.collection('foodCategory')
         global.foodCategory = await fetchedFoodCategory.find({}).toArray();
        //  console.log(global.foodCategory)
        

        
        console.log(`Mongoose connection state: ${mongoose.connection.readyState}`) // Check connection state... Verify that you are connected to the database: You can check if you are connected to the database by logging the mongoose.connection.readyState property. The value of 1 means that you are connected to the database

    }).catch((err)=>{
        console.log("INSIDE THE CATCH ERR STATEMENT")
        console.log(err)
    })
    // console.log('This is the END')
}
module.exports = mongoConnect;
