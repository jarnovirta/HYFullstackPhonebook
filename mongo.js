const mongoose = require('mongoose')
const mongoCreds = require('./mongoCredentials')

const url = 'mongodb://' + mongoCreds.username + ':'
    + mongoCreds.password
    + '@ds055980.mlab.com:55980/hy_fullstack_phonebook'

mongoose.connect(url, { useNewUrlParser: true })

const argCount = process.argv.length
if ( argCount === 3 || argCount >= 5) {
    console.log("väärä lukumäärä argumentteja")
    process.exit()
}

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

if (argCount === 2) {
    Person.find({})
    .then(result => {
        console.log('puhelinluettelo:')
        result.forEach(person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.close()
        process.exit()
    })
}

const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

person.save()
    .then(() => mongoose.connection.close())