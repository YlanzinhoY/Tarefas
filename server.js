const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')

async function openServer(){
    try{
    await connection.authenticate()
    console.log('Connection Sucess')

    } catch(error){
        console.error('Unable server', error)
    }
}

openServer()

// controllers

const Tarefas = require('./controllers/tarefas/TarefasController')

// openServer

const app = express()

// template engine
app.set('view engine', 'ejs')

// bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// publics
app.use(express.static('public'))




app.use('/', Tarefas)
app.get('/', (req,res) => {
    res.render('admin/list/index')
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('app is running!')
})