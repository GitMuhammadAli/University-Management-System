const Room = require('../models/roomSchema');
const TimeSlot = require('../models/timeSlotSchema'); 
const Course = require('../models/courseSchema'); 
const Instructor = require('../models/instructorSchema');
const Student = require('../models/studentSchema'); 
const timeSheet = require('../models/timesheetSchema');


async function Counts(Model) {
    try {
        const count = await Model.countDocuments();
        return count;
    } catch (error) {
        console.error(`Error counting for ${Model.modelName}:`, error);
        return 0;
    }
}


exports.getAlldashboardCounts = async (req,res) => {
try {
const count = {
timesheetcount: await Counts(timeSheet),
Studentcount: await Counts(Student),
instructorcount: await Counts(Instructor),
coursecount: await Counts(Course),
timeslotcount: await Counts(TimeSlot),
roomcount: await Counts(Room),
}

res.status(200).json(count);
} catch (error){
console.log(error);
res.status(500).json({error: 'error counting tables'});
};


}