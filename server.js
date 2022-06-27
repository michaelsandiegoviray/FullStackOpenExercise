const http = require('http')
// this requires HTTP 
const express = require('express')
const { notEqual } = require('assert')
var morgan = require('morgan')
const { response } = require('express')
//this requires express
const app = express()
//this will make express work with the keyword app to access express 
const PORT = 2045
//this is the port on the local host which we are listening to 
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))



let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/api/persons', (req, res) => {

    res.json(phonebook)
    console.log(phonebook)
})


app.get('/info', (req, res) => {

    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date + ' ' + time;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let number = Object.keys(phonebook).length
    res.send(`<h1>The Phone book has info for ${number} Motherfuckers <br>
    ${dateTime} ${timezone} Time`)

})



app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)
    const bookerT = phonebook.find(bookerT => bookerT.id === id)
    bookerT ? res.json(bookerT) : res.status(404).end()




})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = phonebook.filter(note => note.id !== id)

    response.status(204).end()
    console.log(phonebook)
})

const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return response.status(400).json(
            { error: 'number missing' })
    }





    const note = {
        id: generateId(),
        content: body.content,
        name: body.name,
        number: body.number,
    }

    phonebook = phonebook.concat(note)

    response.json(note)
})
