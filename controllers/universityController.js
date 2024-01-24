const University = require("../models/universitySchema");


exports.createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json({message:"Successfully Created University",university});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
exports.getdata = async (req, res) => {
  try {
    const universities = await University.find()
    res.status(200).json({message:"Successfully retrived all data",universities});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUniversitybyId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }
    res.status(200).json({message:"Succefully retrived data",university});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updatedata = async (req, res) => {
  const id = req.params.id;
  try {
    const updateunibyid = await University.findByIdAndUpdate(
      id, 
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateunibyid) {
      return res.status(404).json({ error: "University not found" });
    }
    res.status(200).json({ message: "University updated successfully",updateunibyid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




exports.deleteUniversityById = async (req, res) => {
  const id = req.params.id;
  const {harddelete} = req.body;
  try {
   if (!harddelete) {
      const university = await University.findByIdAndUpdate(id,
        { delete: true },
        { new: true }
      );
      res.status(200).json({ message: "University deleted softly successfully",  });
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
    }
    else {
      const university = await University.findByIdAndDelete(id);
      if (!university) {
        res.status(404).json({ message: "University not found" });
      }
      res.status(200).json({ message: "University deleted hardly successfully" });

    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
