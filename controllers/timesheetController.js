const TimeSheet = require('../models/timesheetSchema');
const Room = require('../models/roomSchema');
const TimeSlot = require('../models/timeSlotSchema'); 
const Course = require('../models/courseSchema'); 
const Instructor = require('../models/instructorSchema');
const Student = require('../models/studentSchema'); 



exports.generateTimeSheet = async (req, res ) => {
try {
  const studentId = req.params.studentId;  
    const student = await Student.findById(studentId).exec();

    if (!student) {
      return res.status(500).json({ error: 'student not found ' });
    }
    const existingTimesheet = await TimeSheet.find({ student: studentId });

    if (existingTimesheet.length > 0) {
      return res.status(400).json({ error: 'Timetable already generated for the student'  });
    }
      const timesheet = [];
      const rooms = await Room.find({});
      const courses = await Course.find({});
      const instructors = await Instructor.find({});
      const timeSlots = await TimeSlot.find({});
  
      async function isRoomAvailableForTimeSlot(room, timeSlot) {
        const existingClasses = await TimeSheet.find({ Room: room._id, timeSlot });
        return existingClasses.length === 0;
      }

      for (const timeSlot of timeSlots) {
        for (const room of rooms) {
          const isRoomAvailable = await isRoomAvailableForTimeSlot(room, timeSlot);
          if (isRoomAvailable) {
            const randomCourse = getRandomItemFromArray(courses);
            const randomInstructor = getRandomItemFromArray(instructors);
  

            const timesheetEntry = new TimeSheet({
              Room: room,
              timeSlot: timeSlot,
              Course: randomCourse,
              instructor: randomInstructor,
              student: studentId,  
            });
            
  
            await timesheetEntry.save();

          }
        }
      }
  
       res.status(200).json({message:"Your time table ",timesheet});
      } catch (err) {
     return  res.status(500).json({ error: 'Failed to generate timesheet' });
    }
  };
  
  function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}
  


exports.updateTimesheet = async (req,res) => {


}