const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :reqBody :status :res[content-length] - :response-time ms'))


morgan.token('reqBody', (req, res) => JSON.stringify(req.body))

const persons = [
  {
    name: "Jarno Virta",
    number: "1253654",
    id: 1
  },
  {
    name: "Samantha Fox",
    number: "342342",
    id: 2
  }

]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) res.json(persons.find(person => person.id === id))
  else res.status(404).send({ error: 'Record does not exist' })
})
app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (Object.keys(req.body).length === 0) {
    console.log("body")
    return res.status(400).send({ error: 'Empty request body'})
  }
  if (newPerson.name === undefined || newPerson.number === undefined) {
    console.log("name or number")
    return res.status(400).send({ error: 'Name or number missing'})
  }  
  if (persons.filter(person => person.name === newPerson.name).length > 0) {
    console.log("exists")
    return res.status(400).send({ error: 'Name must be unique'})
  }
  newPerson.id = Math.floor(Math.random() * 10000 + 1)
  persons.push(newPerson) 
  res.json(newPerson)
})
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    let index = persons.indexOf(person)
    persons.splice(index, index + 1)
  }
  res.sendStatus(204)
})
app.put('/api/persons/:id', (req, res) => {
  const newPerson = req.body
  const id = Number(req.params.id)
  const existingPerson = persons.find(person => person.id === id)
  if (!existingPerson) return res.status(404).send({ error: 'Record not found' })
  newPerson.id = existingPerson.id
  let index = persons.indexOf(existingPerson)
  persons.splice(index, 1, newPerson)
  res.json(newPerson)
})
app.get('/info', (req, res) => {
  res.set({
    'Content-Type': 'text/plain;characterEncoding=UTF-8'
  })
  res.end('Puhelinluettelossa on ' + persons.length + ' henkilön tiedot'
    + '\n\n' + new Date())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})