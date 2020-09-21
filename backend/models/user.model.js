const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10;
require('mongoose-type-email');



const userSchema = new Schema({
    username: { type:String , required: true , index: { unique: true } },
    firstName: { type:String , required: true },
    lastName: { type:String , required: true },
    email: { type: mongoose.SchemaTypes.Email , required: true },
    password: { type: String, required: true },
    city: { type:String, required: true },
    securityCode:{type:Number , required: true},
    securityCodeEntered:{type: Boolean, required: true},
    listOfCreatedMeetings: {type: [] },
    listOfGoingMeetings: {type: [] },
    profilePic:{type: String },
    
    


},{
    timestamps: true,
})

userSchema.pre('save' , function (next) {
    var user = this

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds , function (err, salt){
            if(err)
             return next(err)
            bcrypt.hash(user.password , salt , function(err , hash){
                if(err) 
                return next(err)
                user.password = hash
                next()
            }) 

        })
    }

    else{
        next()
    }

  })


const User = mongoose.model('User' , userSchema)

module.exports = User