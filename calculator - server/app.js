const express = require("express")
const mongoose = require("mongoose")
const app = express()
const HistoryModal = require("./Schema/History")
const UserModal = require("./Schema/Users")
const cors = require("cors")
require('dotenv').config()
const jwt = require('jsonwebtoken');
const DB = process.env.MONGO_DB
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors())

mongoose.connect(DB, ()=>{
    console.log("Successfully connected to database!");
}, (e)=>{
    console.log(e);
})

app.listen(PORT, (e)=>{
    if(e){
        console.log(e);
    }else{
        console.log("Listening to server at port 5000");
    }
})

app.post('/add', async(req, res)=>{
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        if(verifyToken){
            let result = `${req.body.expressions[0].recentActivity}=${eval(req.body.expressions[0].recentActivity)}` 
            const UserActivity = await HistoryModal.find({email : verifyToken})
            if(UserActivity.length){
            let update = {
                recentActivity: result
            }
                await HistoryModal.updateOne(
                    { email: verifyToken  },
                    { $push: { expressions: update} }
                )
                res.status(201).send(result)
            }else{
                const newActivity = new HistoryModal(req.body)
                newActivity.expressions[0].recentActivity = result
                newActivity.email = verifyToken
                await newActivity.save()
                res.status(201).send(result)
            }
            }else{
                    res.status(409).send("Unauthorized user")
            }

      
    }catch(e){
        res.status(400).send("Catch error")
    }
    
})

app.post('/subtract', async(req, res)=>{
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        if(verifyToken){
            let result = `${req.body.expressions[0].recentActivity}=${eval(req.body.expressions[0].recentActivity)}` 
            const UserActivity = await HistoryModal.find({email : verifyToken})
            if(UserActivity.length){
            let update = {
                recentActivity: result
            }
                await HistoryModal.updateOne(
                    { email: verifyToken  },
                    { $push: { expressions: update} }
                )
                res.status(201).send(result)
            }else{
                const newActivity = new HistoryModal(req.body)
                newActivity.expressions[0].recentActivity = result
                newActivity.email = verifyToken
                await newActivity.save()
                res.status(201).send(result)
            }
            }else{
                    res.status(409).send("Unauthorized user")
            }

      
    }catch(e){
        res.status(400).send("Catch error")
    }
    
   
})

app.post('/multiply', async(req, res)=>{
    try{
        // console.log(req.headers.authorization);
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyToken);
        if(verifyToken){
            // console.log(verifyToken);
            let result = `${req.body.expressions[0].recentActivity}=${eval(req.body.expressions[0].recentActivity)}` 
            const UserActivity = await HistoryModal.find({email : verifyToken})
            // console.log(UserActivity[0].expressions);
            if(UserActivity.length){
            let update = {
                recentActivity: result
            }
                await HistoryModal.updateOne(
                    { email: verifyToken  },
                    { $push: { expressions: update} }
                )
                res.status(201).send(result)
            }else{
                const newActivity = new HistoryModal(req.body)
                newActivity.expressions[0].recentActivity = result
                newActivity.email = verifyToken
                await newActivity.save()
                res.status(201).send(result)
            }
            }else{
                    res.status(409).send("Unauthorized user")
            }

      
    }catch(e){
        res.status(400).send("Catch error")
    }
    
})

app.post('/divide', async(req, res)=>{
    try{
        // console.log(req.headers.authorization);
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyToken);
        if(verifyToken){
            // console.log(verifyToken);
            let result = `${req.body.expressions[0].recentActivity}=${eval(req.body.expressions[0].recentActivity)}` 
            const UserActivity = await HistoryModal.find({email : verifyToken})
            // console.log(UserActivity[0].expressions);
            if(UserActivity.length){
            let update = {
                recentActivity: result
            }
                await HistoryModal.updateOne(
                    { email: verifyToken  },
                    { $push: { expressions: update} }
                )
                res.status(201).send(result)
            }else{
                const newActivity = new HistoryModal(req.body)
                newActivity.expressions[0].recentActivity = result
                newActivity.email = verifyToken
                await newActivity.save()
                res.status(201).send(result)
            }
            }else{
                    res.status(409).send("Unauthorized user")
            }

      
    }catch(e){
        res.status(400).send(e)
    }
    
})

app.get('/history', async(req, res)=>{
    try{
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        if(verifyToken){
            const UserActivity = await HistoryModal.find({email : verifyToken})
            // console.log(UserActivity);
            if(UserActivity){
                res.status(200).send(UserActivity[0].expressions)
            }else{
                res.status(200).send([])
            }
            
        }else{
            res.status(409).send("Unauthorized user")
        }
    }catch(e){
        res.status(400).send(e)
    }
    
})

app.post('/user', async(req, res)=>{
    const UserDetails = await UserModal.find({email : req.body.email})
    const authToken = jwt.sign(req.body.email, process.env.SECRET_KEY)
    // console.log(authToken);
    if(UserDetails.length){ 
        res.status(200).send({authToken})
    }else{
        const newUser = new UserModal(req.body)
        await newUser.save()
        res.status(200).send({authToken})
    }
})


app.get('/', (req, res)=>{
    res.status(200).send("Calculator server")
})

