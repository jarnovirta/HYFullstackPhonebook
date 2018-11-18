const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
console.log(`MONGODB URI SET TO ${process.env.MONGODB_URI}`)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

var PersonSchema = new mongoose.Schema({
    name: String,
    number: Number 
})
PersonSchema.statics.format = function(person) {
    return { 
        id: person._id,
        name: person.name,
        number: person.number 
    }
}
const Person = mongoose.model('Person', PersonSchema)

const findAll = Person.find({})
    .then(personList => {
        console.log("\n*** DEBUG: personList: ", personList)
        return personList.map(Person.format)

    })

const findById = (id) => Person.findById(id)
    .then(person => Person.format(person))

const exists = (person) => Person.findOne({ name: person.name })
    .then(existingPerson => { return existingPerson !== null })

const create = (person) => {
    const newPerson = new Person({
        name: person.name,
        number: person.number
    })
    return newPerson.save()
        .then(savedPerson => Person.format(savedPerson))  
}

const findByIdAndDelete = (id) => {
    return Person.findByIdAndDelete(id)    
}

const findByIdAndUpdate = (id, updatedPerson) => {
    return Person.findByIdAndUpdate(id, updatedPerson, { new: true })
        .then(savedPerson => Person.format(savedPerson))
}

module.exports = { create, findAll, findById, exists, findByIdAndDelete, findByIdAndUpdate }