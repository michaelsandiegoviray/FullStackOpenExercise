const http = require('http')
const express = require('express')
const app = express()
const PORT = 2045
app.listen(PORT)
console.log(`Server running on port ${PORT}`)




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
    res.json(bookerT)

})