const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

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

app.get('/', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})