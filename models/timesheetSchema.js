const mongoose = require('mongoose')
const timeSheetSchema = new mongoose.Schema({
Room:{type:mongoose.Schema.Types.ObjectId,ref:'Room' , required:true},
timeSlot:{type:mongoose.Schema.Types.ObjectId,ref:'TimeSlot' , required:true},
Course:{type:mongoose.Schema.Types.ObjectId,ref:'Course' , required:true},
instructor:{type:mongoose.Schema.Types.ObjectId,ref:'Instructor' , required:true},
student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
})

const timeSheet = mongoose.model('timeSheet',timeSheetSchema)

module.exports = timeSheet
