const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Items = require('./models/res')
const PORT = 3000
const mongoURI = 'mongodb://127.0.0.1:27017/'
const db = mongoose.connection 
const methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
mongoose.connect(mongoURI)

mongoose.connect(mongoURI, () => {
    console.log('Mongoose is running')
})

app.get('/', (req,res) => {
    res.send ('this works')
})
//INDEX ROUTE
app.get('/res', (req,res) => {
    Items.find({}, (err, items) => {
        res.render('index.ejs', {
            hopItem: items
        })
    })
})
//SHOW ROUTE
app.get('/res/:id', (req,res) => {
    Items.findById(req.params.id, (err, items) => {
        res.render('show.ejs', {
            hopItem: items
        })
    })
})
//DELETE ROUTE
app.delete('/res/:id', (req,res) => {
    Items.findByIdAndRemove(req.params.id, (err) => {
        res.redirect('/res')
    })
})
//SEED DATA
// const res = [
//     {
//         name: 'Chic-fil-A', 
//         rating: 4,
//         price: 'Around Twenty',
//         type: 'Fast', 
//         hours: '9-10pm',
//     }
// ]
// Items.insertMany(res, (error, resItems) => {
//      if  (error){
//      console.log(error)
//      } else {
//      console.log(resItems)
//      }
//     db.close()
// })

app.listen (PORT, () => {
    console.log(`app is running on port, ${PORT}`)
})