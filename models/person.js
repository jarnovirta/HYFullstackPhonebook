const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

var PersonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    number: { type: String, required: true }
})
PersonSchema.statics.format = function (person) {
    return {
        id: person._id,
        name: person.name,
        number: person.number
    }
}
const Person = mongoose.model('Person', PersonSchema)

module.exports = Person