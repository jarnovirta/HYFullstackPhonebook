const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
console.log(`MONGODB URI SET TO ${process.env.MONGODB_URI}`)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

var PersonSchema = new mongoose.Schema({
    name: String,
    number: String 
})
PersonSchema.statics.format = function(person) {
    return { 
        id: person._id,
        name: person.name,
        number: person.number 
    }
}
const Person = mongoose.model('Person', PersonSchema)

module.exports = Person