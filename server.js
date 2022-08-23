const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const mongoURI = 'mongodb://127.0.0.1:27017/'
const db = mongoose.connection 

mongoose.connect(mongoURI)

mongoose.connect(mongoURI, () => {
    console.log('Mongoose is running')
})

app.get('/', (req,res) => {
    res.send ('this works')
})

app.get('/res', (req,res) => {
    res.render('index.ejs')
})

app.listen (PORT, () => {
    console.log(`app is running on port, ${PORT}`)
})