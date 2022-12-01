const Sequelize = require('sequelize')
const connection = require("../../database/database")


const ListaTarefas = connection.define('listTarefas', {
    title: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    horarios: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    diaSemana: {
        type: Sequelize.STRING,
        allowNUll: false
    }
})

module.exports = ListaTarefas