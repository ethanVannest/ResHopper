const mongoose = require('mongoose')
const resSchema = mongoose.Schema

const resItems = new resSchema({
    name: String, 
    rating: Number,
    price: String,
    type: String, 
    hours: String,
})
const Items = mongoose.model('Items', resItems)
module.exports = Items