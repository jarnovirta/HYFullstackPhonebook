const mongoose = require('mongoose')

const url = ''

// mongoose.connect(url)
const Person = mongoose.model('Person', {
    name: String,
    number: Number
})

module.exports = Person