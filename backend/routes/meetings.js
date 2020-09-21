const router = require('express').Router()
let Meeting = require('../models/meeting.model')
const User = require('../models/user.model')

router.route('/').get((req , res) => {
    Meeting.find()
    .then(meetings => {
        for(let i=0 ; i<meetings.length;i++){
            meetings[i].name = meetings[i].name.substring(0,meetings[i].name.length - 6)
        }
        res.json(meetings)})
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/fullname').get((req , res) => {
    Meeting.find()
    .then(meetings => {
        
        res.json(meetings)})
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req , res) => {
    Meeting.findById(req.params.id)
    .then(meeting => {
        meeting.name = meeting.name.substring(0,meeting.name.length-6)
        

        res.json(meeting)})
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/edit/:id').post((req,res)=>{
    Meeting.findById(req.params.id)
    .then(meeting => {
        meeting.name = req.body.name
        meeting.description = req.body.description
        meeting.address = req.body.address
        meeting.city = req.body.city
        meeting.date = req.body.date
        meeting.save().then(() => res.json('meeting updated')).catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(
      err => res.json('meeting json')
    )

})

router.route('/:id').delete((req , res) => {
    Meeting.findByIdAndDelete(req.params.id)
    .then(() => res.json("Meeting deleted!"))
    .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/going/:userid/:meetingid').post((req , res) =>{
    Meeting.findById(req.params.meetingid)
    .then(meeting =>{
       
        meeting.goingUsers = meeting.goingUsers +1
       
        meeting.save().then(() => {res.json('meeting updated')}).catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/mindChanged/:userid/:meetingid').post((req , res) =>{
    Meeting.findById(req.params.meetingid)
    .then(meeting =>{
       
        meeting.goingUsers = meeting.goingUsers -1
      
        meeting.save().then(() => {res.json('meeting updated')}).catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/comment/:id').post((req,res) =>{
    Meeting.findById(req.params.id)
    .then(meeting =>{
        let x = req.body.username +": " + req.body.comment
        meeting.comments.push(x)
        meeting.save().then(() => {res.json('comment added')}).catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))


})


router.route('/add').post((req , res) => {
    const name = req.body.name + (Math.floor(100000 + Math.random() * 900000)).toString()
    const description  = req.body.description
    const creatorUsername = req.body.creatorUsername
    const goingUsers = 1
    const address = req.body.address 
    const city = req.body.city
    const date = req.body.date
    const compaination = name + city + description + address + date.toString() + creatorUsername
    const comments = []
    
    const newMeeting= new Meeting({ compaination,name ,description ,creatorUsername, goingUsers , address , city,date,comments })

    newMeeting.save()
    .then(() => res.json(newMeeting))
    .catch(err => {
        console.log("error")
        res.status(400).json('Error: ' + err)})
})


module.exports = router 