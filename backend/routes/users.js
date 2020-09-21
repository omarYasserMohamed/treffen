const router = require('express').Router()
let User = require('../models/user.model')
const bcrypt = require('bcrypt');
const { runInNewContext } = require('vm');
const saltRounds = 10;



router.route('/removeFromCreated/:id/:meetingid').post((req , res) => {
    User.findById(req.params.id)
    .then(user => {
           user.listOfCreatedMeetings =  user.listOfCreatedMeetings.filter(function(x){
               return x != req.params.meetingid
           })
        
           user.save().then(() => res.json('user updated')).catch(err => res.status(400).json('Error: ' + err))
    })
})

router.route('/addToGoing/:id/:meetingid').post((req,res)=>{
    User.findById(req.params.id)
    .then(user => {
        let ret = 'no'
        console.log(req.params.meetingid)
        if(user.listOfGoingMeetings.includes(req.params.meetingid) == false){
        user.listOfGoingMeetings.push(req.params.meetingid)
        ret = 'yes'
        }
        console.log(ret)
        user.save().then(() => res.json(ret)).catch(err => res.status(400).json('Error: ' + err))

    })
    .catch(err => res.json(err))
})

router.route('/edit/:id').post((req,res) =>{
    User.findById(req.params.id)
    .then(user =>{
        user.firstName = req.body.firstname
        user.lastName = req.body.lastname
        user.city = req.body.city
        user.save().then(() => {res.json('user updated')}).catch(err => res.status(400).json('Error: ' + err))
    })
})

router.route('/removeFromGoing/:id/:meetingid').post((req , res) => {
    User.findById(req.params.id)
    .then(user => {
        console.log(user.listOfGoingMeetings )
           user.listOfGoingMeetings =  user.listOfGoingMeetings.filter(function(x){
               
               return x!= req.params.meetingid
           })
        
           user.save().then(() => res.json('user updated')).catch(err => res.status(400).json('Error: ' + err))
    })
})

router.route('/check/:id/:password').get((req , res) => {
    User.findById(req.params.id)
    .then(user => {
        
        bcrypt.compare(req.params.password, user.password, function(err, result) {
              if(result == true){
                  res.json(user.username)
              }
              else{
                  res.json(user.password)
              }
            
        });
    })
    .catch(err => res.status(400).json('Error: ' + err))


})


router.route('/').get((req , res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user => {res.json(user)
           console.log(user.listOfGoingMeetings)
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/changePassword/:id').post((req,res) => {
    User.findById(req.params.id)
    .then(user => {
        user.password = req.body.password
        user.save().then(() => res.json('password changed')).catch(err => res.status(400).json('Error: ' + err))
    })
})

router.route('/mailVerify/:id/:code').post((req , res) =>{
    User.findById(req.params.id)
    .then(
      user => {
          if(req.params.code == user.securityCode){
              user.securityCodeEntered = true
              user.save().then(() => res.json('true')).catch(err => res.status(400).json('Error: ' + err))

          }
          else{
            user.securityCodeEntered = false
            user.save().then(() => res.json('false')).catch(err => res.status(400).json('Error: ' + err))

          }
      }
    )
    .catch(err => res.status(400).json('Error: '+ err))
})


router.route('/getCities').get((req , res) =>{
    const { spawn } = require('child_process')
    const childPython = spawn('python' , ['./python.scripts/cities.py']) 

    childPython.stdout.on('data' , (data) => {
       console.log(data)
       res.json(data) 
    })
    .catch(
      err => res.status(400).json('Error: ' + err)
    )
       
})


router.route('/going/:id').post((req , res) =>{
    User.findById(req.params.id)
    .then(user =>{
        
        user.listOfGoingMeetings.push(req.body._id)
        
        user.save().then(() => res.json('user updated')).catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/create/:id').post((req , res) =>{
    User.findById(req.params.id)
    .then(user =>{
        user.listOfCreatedMeetings.push(req.body._id)
        user.listOfGoingMeetings.push(req.body._id)
        
        user.save().then(() => res.json('user updated')).catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})



router.route('/add').post((req , res) => {
    const username = req.body.username
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const city = req.body.city
    const securityCode = Math.floor(100000 + Math.random() * 900000)
    const securityCodeEntered = false
    const newUser = new User({username ,firstName ,lastName , email , password , city,securityCode,securityCodeEntered})
   
    const { spawn } = require('child_process')
    const childPython = spawn('python' , ['./python.scripts/sendEmail.py' , newUser.email , securityCode , newUser.firstName]) 

    childPython.stdout.on('data' , (data) => {
       console.log(`stdout: ${data}`)
    })


    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router 