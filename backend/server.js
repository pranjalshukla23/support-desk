
//express
const express = require('express')

//colors
const colors = require('colors')

//connect to db function
const connectDB = require('./config/db')

//dotenv
const dotenv = require('dotenv').config()

//middleware
const {errorHandler} = require("./middleware/errorMiddleware")

//path
const path = require('express');

const PORT = process.env.PORT || 5000

//connect to db
connectDB()

//initialise express app
const app = express()



//use express.json() middleware
app.use(express.json())

//use urlencoded middleware
app.use(express.urlencoded({extended: false}))


//use userRoutes middleware
app.use('/api/users',require('./routes/userRoutes'))

//use ticketRoutes middleware
app.use('/api/tickets',require('./routes/ticketRoutes'))

//use custom middlewares
app.use(errorHandler)




//serve frontend
if(process.env.NODE_ENV === "production"){
  //set build folder as static
  app.use(express.static(path.join(__dirname,'../frontend/build')))

  //send file as response
  app.get('*',(req,res) => {
    res.sendFile(__dirname, '../','frontend', 'build', 'index.html')
  })
}else{
  //get request
  app.get('/',(req,res) =>{

    res.status(200).json({
      message: "Welcome to support desk API"
    })
  })
}

//listen to server
app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`)
})
