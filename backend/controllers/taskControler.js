const Task = require('../models/taskmodel') //whatever I imported (task model to interact with database) is now useable here
const Progress = require('../models/progressmodel')

//get all tasks for a day

const getTask= async (req, res) => {
    //create date based on the params in the url
    const year = Number(req.params.year); 
    const month = Number(req.params.month);
    const day = Number(req.params.day);
    const datepassed = new Date(year, month-1, day); //save date passed in
    const tasks = await Task.find({date: {$gte: datepassed.setHours(0,0,0,0), $lte: datepassed.setHours(23,59,59,59)}}).sort({status: 1, createdAt: 1}); // range is not nescarry since creating a task autmates time to 0s, but keep it here just incase logic changes int he future
    
    const content = tasks.map(element => element.content); // create another array with just the content, actaul text for task
    //res.json(content)
    const object = tasks;
    res.status(200).render('dayTasks', {year, month, day, content, object})
}
//parameter of date is required

//create a workout
const createTask = async (req, res) => {
    console.log(req.body)
    const {content, status, year, month, day} = req.body // data will be sent via the psot request to teh body

    try{
        const workout = await Task.create({content, status, date: new Date( Number(year), Number(month) - 1, Number(day))}) // no need to specifc the fields for content cause they match field names exactly, since we are using a function to create date, we need to specify field name
        console.log("task added")
        res.status(200).redirect('dayTasks', {year, month, day, content})
    }catch(error){
        console.log("failed to add task" + error)
        res.status(400).redirect(`/day/${year}/${month}/${day}`);
    }
}

const updateTask = async (req, res) => {
    console.log(req.body);
    const {_id, status} = req.body
    try{
        await Task.updateOne(
            {_id : _id},
            {$set: {status : status}}
        )
        console.log("task status updated")
        res.status(200)
    }catch(error){
        console.log("task status NOT updated")
        res.status(500)
    }
}

const deleteTask = async (req, res) => {
    const {_id} = req.body

    try {
        await Task.findByIdAndDelete(_id)
        res.status(200)
        console.log("task deleted successfull")
    }catch(err){
        res.status(500)
        console.log("task deletion failed" + err)
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}
