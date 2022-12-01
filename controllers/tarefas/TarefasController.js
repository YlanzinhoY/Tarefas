const express = require('express')
const router = express.Router()
const Tarefas = require('./Tarefas')

router.get('/admin/list/newList', (req,res) => {
    res.render('admin/list/newList')
})

router.get('/admin/list/index', (req,res) => {
    async function listFindAll(){
        const listFind = await Tarefas.findAll()
        res.render('admin/list/index', {list: listFind})
    }
    listFindAll()
})

router.post('/list/save', (req,res) => {
    const title = req.body.title
    const horarios = req.body.horarios
    const diaSemana = req.body.diaSemana

     if(title != undefined && diaSemana != undefined && horarios != undefined){
        async function sendFormData(){
            await Tarefas.create({
            title: title,
            horarios: horarios,
            diaSemana: diaSemana
            })
            res.redirect('/admin/list/index')
        }
        sendFormData()
     } else {
        res.redirect('/admin/list/newList')
     }
})

router.post('/list/delete', (req,res) => {
    const id  = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            async function deleteId(){
                await Tarefas.destroy({
                    where: {
                        id:id
                    }
                })
                res.redirect("/admin/list/index")
            }
            deleteId()
        } else {
            res.redirect("/admin/list/index")
        }
    } else {
        res.redirect("/admin/list/index")
    }
})

router.get('/admin/list/edit/:id', (req, res) => {
    const id = req.params.id
    if(isNaN(id)){
        res.redirect('/admin/list/index')
    }

    async function findById(){
        const findId = await Tarefas.findByPk(id)

        try{
            if(findId != undefined){
                res.render('admin/list/edit', {list: findId})
            } else {
                res.redirect("/admin/list/index")
            }
        } catch(error){
            res.redirect("/admin/list/index")
        }
    }
    findById()
})

router.post("/list/update", (req,res) => {
    const id = req.body.id
    const title = req.body.title
    const horarios = req.body.horarios
    const diaSemana = req.body.diaSemana 
    async function update(){
        await Tarefas.update({title: title, horarios: horarios, diaSemana: diaSemana}, {
            where: {
                id: id,
            }
        })
        res.redirect('/admin/list/index')
    }
    update()
})

module.exports = router