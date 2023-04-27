const express = require('express')
const app = express();
const router = express.Router();
const user = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'Thisisatokenwhichshouldnotbeseentoclient'
// const login = require('../../src/screens/Login')


// const postRouter = router.post('/createUser', async (req,res)=>{
router.post('/createUser',[
    body('email').isEmail(),
    body('name').isLength({min : 5}),
    body('password', 'Password is either small or incorrect').isLength({min : 5}),

] ,async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const userCreate = await user.create({
            name : req.body.name,
            password : secPassword,
            location : req.body.location,
            email : req.body.email
        })
        // res.render('login')
        return res.json({success : true})

    } catch (error) {
        console.log(error)
        return res.json({success : false})
    }
})

// router.post('/login' ,async (req,res)=>{
//     // try {
//         // const errors = validationResult(req);
//         let email = req.body.email              // this is what we got from the FORM
//         let password = req.body.password;
//         const checkCredentials = await user.findOne({email : email})  // This is what we got from the Database
//         if (!checkCredentials) {
//             return res.status(400).json({success: false, message: "Invalid email or password"})
//         }
//         // const emailCompare = await bcrypt.compare(req.body.email, checkCredentials.email)
//         // const pwdCompare = await bcrypt.compare(req.body.password, checkCredentials.password)

//         const emailCompare = await bcrypt.compare(req.body.email, checkCredentials.email);
//         const pwdCompare = await bcrypt.compare(req.body.password, checkCredentials.password);


//         console.log(req.body.email)
//         console.log(checkCredentials.email)
//         console.log(req.body.password)
//         console.log(checkCredentials.password)
//         console.log(emailCompare)
//         console.log(pwdCompare)

//         if(emailCompare && pwdCompare){
//             console.log("MATCHED  PASSWORD AND EMAIL")
//             const data = {
//                 user : {
//                     id : checkCredentials.id
//                 }    
//             }
//             const authToken = jwt.sign(data, jwtSecret)
//             return res.json({success : true , authToken : authToken})
//         }
//         else{           
//            return res.status(400).json({success : false})
//         }          
//     // } 
//     // catch (error) {
//     //     console.log(error)
//     //     res.json({success : false})
//     // }
// })
// module.exports = postRouter;

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkCredentials = await user.findOne({ email });
      if (!checkCredentials) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
    //   const emailCompare = await bcrypt.compare(email, checkCredentials.email);
      const emailCompare = req.body.email === checkCredentials.email ? true : false;
      const pwdCompare = await bcrypt.compare(password, checkCredentials.password);
      console.log(email, checkCredentials.email, password, checkCredentials.password);
      console.log(emailCompare, pwdCompare);
      if (emailCompare && pwdCompare) {
        console.log('MATCHED PASSWORD AND EMAIL');
        const data = { user: { id: checkCredentials.id } };
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken });
      } else {
        return res.status(400).json({ success: false });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });
  

module.exports = router;