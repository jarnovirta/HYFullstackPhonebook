const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :reqBody :status :res[content-length] - :response-time ms'))

morgan.token('reqBody', (req, res) => JSON.stringify(req.body))

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => { 
      res.json(persons.map(Person.format)) 
    })
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })  
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) res.json(Person.format(person))
      else res.status(404).send({ error: 'Record does not exist' })
    })
    .catch(error => {
      console.log(error)
      res.status(404).send({ error: 'Person not found' })
    })
})

app.post('/api/persons', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: 'Empty request body'})
  }
  const person = req.body

  if (person.name === undefined || person.number === undefined) {
    return res.status(400).send({ error: 'Name or number missing'})
  }

  Person.findOne({ name: person.name })
    .then(existingPerson => {
      if (existingPerson !== null) {
        res.status(400).send({ error: 'Person is already in database'})
      }
      else {
        const newPerson = new Person({
          name: person.name,
          number: person.number
        })
        newPerson.save()
            .then(savedPerson => res.json(Person.format(savedPerson)))  

      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
    
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(res.status(204).end())
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
})
app.put('/api/persons/:id', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: 'Empty request body'})
  }

  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedPerson => res.json(Person.format(updatedPerson)))
    .catch(() => {
      res.status(404).send({ error: 'Record not found' })
    })
})
app.get('/info', (req, res) => {
  person.findAll.then(personList => {
    res.set({
      'Content-Type': 'text/plain;characterEncoding=UTF-8'
    })
    res.end('Puhelinluettelossa on ' + personList.length + ' henkilön tiedot'
      + '\n\n' + new Date())
  })
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})