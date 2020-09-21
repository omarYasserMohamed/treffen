const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({
    compaination: {type:String, required: true, index: { unique: true }},
    name: {type: String, required: true },
    description: { type:String, required: true },
    creatorUsername: {type: String, required: true},
    goingUsers: {type: Number, required: true},
    address: { type:String , required: true },
    city: {type: String, required: true},
    date: {type: Date, required: true},
    comments: {type:[]}
    

},{
    timestamps: true,
})


const Meeting = mongoose.model('Meeting' , meetingSchema)

module.exports = Meeting