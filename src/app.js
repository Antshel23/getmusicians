const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/musicians', async (req,res) => {
    const musicians = await Musician.findAll()
    res.json(musicians)
})

app.get('/musicians/:id', async (req,res) => {
    const musicianId = await Musician.findByPk(req.params.id)
    res.json(musicianId)
})

app.post('/musicians', async (req,res) => {
    const musicianNew = await Musician.create(req.body)
    res.json(musicianNew)
})

app.put('/musicians/:id', async (req,res) => {
    const musicianUpdate = await Musician.update(req.body, {where: {id: req.params.id}})
    res.json(musicianUpdate)
})

app.delete('/musicians/:id', async (req,res) => {
    const musicianDelete = await Musician.destroy({where: {id: req.params.id}})
    res.json(musicianDelete)
})

module.exports = app;