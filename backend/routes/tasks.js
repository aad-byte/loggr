const express = require('express');
const {createTask, getTask, updateTask, deleteTask} = require('../controllers/taskControler')
const Task = require('../models/taskmodel')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {username: 'Aadya'})
    console.log('homepage rendered')
})


router.get('/loggr', (req, res) => {
    res.json({mssg: 'loggr calendar here'})
})

router.post('/day', createTask)

router.get('/day/:year/:month/:day', getTask)

router.delete('/day', deleteTask)

router.patch('/day', updateTask)

router.get('/bleh', async (req,res) => {
    id = req.params.id;
    const tasks = await Task.find({});
    res.json(tasks);
})


module.exports = router