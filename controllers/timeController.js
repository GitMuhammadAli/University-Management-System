const TimeSlot = require('../models/timeSlotSchema');


exports.createTimeSlot = async (req, res) => {
  try {
    const timeSlot = new TimeSlot(req.body);
    await timeSlot.save();
    res.status(201).json({ message: "Created New Time slot successfully" ,timeSlot});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTimeSlots = async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find();
    res.status(200).json({ message: "ALL Time slots Retrived successfully" ,timeSlots});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTimeSlotById = async (req, res) => {
  const id = req.params.id;
  try {
    const timeSlot = await TimeSlot.findById(id);
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json({ message: "Time slot retrived successfully" ,timeSlot});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTimeSlotById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTimeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json({ message: "Time slot Updated successfully" ,updatedTimeSlot});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteTimeSlotById = async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
  try {
   if (!harddelete) {
      const time = await TimeSlot.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "TimeSlot deleted softly successfully" });
      if (!time) {
        return res.status(404).json({ error: "TimeSlot not found" });
      }
    }
    else {
      const time = await TimeSlot.findByIdAndDelete(id);
      if (!time) {
        res.status(404).json({ message: "TimeSlot not found" });
      }
      res.status(200).json({ message: "TImeSlot deleted hardly successfully" });

    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
