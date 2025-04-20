const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.set('view engine', 'ejs')
const mongoose = require('mongoose')
const tasks = require('./routes/tasks')


app.use((req, res, next) => {
  console.log('going through middle ware');
  next()
})
//send index ejs file here
app.use(tasks)

app.get('/hehe', (req, res) => {
  res.json("hehee")
})
// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () =>{
    console.log('connected to db, lisetening on port ' + process.env.PORT);
  })
})
.catch((error) => {
  console.log(error)
})



