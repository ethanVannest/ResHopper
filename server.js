require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Items = require('./models/res')
const PORT = process.env.PORT||3000
const db = mongoose.connection 
const methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))


mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Mongoose is running')
})

app.get('/', (req,res) => {
    res.render ('home.ejs')
})
//INDEX ROUTE
app.get('/res', (req,res) => {
    Items.find({}, (err, items) => {
        const randomItem = Math.floor(Math.random() * items.length)
        const itemLength = items.length
        res.render('index.ejs', {
            hopItem: items, 
            randomItem: items[randomItem],
            itemLength: itemLength
        })
    })
})
//NEW ROUTE
app.get('/res/new', (req,res) => {
    res.render('new.ejs')
})

//SHOW ROUTE
app.get('/res/:id', (req,res) => {
    Items.findById(req.params.id, (err, items) => {
        // const randomItem = Math.floor(Math.random() * items.length)
        res.render('show.ejs', {
            hopItem: items,
            // randomItem: items[randomItem]
        })
    })
})
/* <a href="/res/<%= randomItem.id %>">Show Me Another!</a>   */

//POST ROUTE 
app.post('/res', (req,res) => {
    Items.create(req.body, (err, newHop) => {
        newHop = req.body
        res.redirect('/res')
    })
})

//DELETE ROUTE
app.delete('/res/:id', (req,res) => {
    Items.findByIdAndRemove(req.params.id, (err) => {
        res.redirect('/res')
    })
})


//EDIT ROUTE
app.get('/res/:id/edit', (req,res) => {
    Items.findById(req.params.id, (err, editItems) => {
        res.render('edit.ejs', {
            hopItem: editItems
        })
    })
})

//PUT ROUTE
app.put('/res/:id', (req,res) => {
    Items.findByIdAndUpdate(req.params.id, req.body, (err, edit) => {
        edit = req.body
        res.redirect('/res/'+ req.params.id)
    })
})

//SEED DATA
// const res = 
//     {
//         name: 'Chic-fil-A', 
//         rating: 4,
//         price: 'Around Twenty',
//         type: 'Fast', 
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5l6eWFrqKGcwq2X93624LR4_pwjmvnk60Q&usqp=CAU',
//         hours: '9-10pm',
//     }
// try{
//     Items.create(res, (error, resItems) => {
//          if  (error){
//          console.log(error)
//          } else {
//          console.log(resItems)
//          }
//         db.close()
//     })
// }
// catch(err){console.log(err)}

app.listen (PORT, () => {
    console.log(`app is running on port, ${PORT}`)
})