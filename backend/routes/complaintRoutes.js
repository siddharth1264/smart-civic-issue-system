const express = require("express");
const router = express.Router();
const axios = require("axios");

const Complaint = require("../models/Complaint");


// ADD COMPLAINT
router.post("/add", async (req, res) => {

  try {

    // SEND DESCRIPTION TO ML API
    const mlResponse = await axios.post(
      "https://smart-civic-ml.onrender.com/predict",
      {
        description: req.body.description,
      }
    );

    // GET SEVERITY FROM ML
    const predictedSeverity = mlResponse.data.severity;

    // SET PRIORITY
    let priority = 1;

    if (predictedSeverity === "High") {
      priority = 5;
    } else if (predictedSeverity === "Medium") {
      priority = 3;
    }

    // CREATE NEW COMPLAINT
    const complaint = new Complaint({
      issueType: req.body.issueType,
      description: req.body.description,
      location: req.body.location,
      severity: predictedSeverity,
      priority: priority,
    });

    // SAVE TO DATABASE
    await complaint.save();

    res.status(201).json({
      message: "Complaint Added",
      complaint,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

});


// GET ALL COMPLAINTS
router.get("/", async (req, res) => {

  try {

    const complaints = await Complaint.find()
      .sort({ priority: -1, createdAt: -1 });

    res.json(complaints);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


// UPDATE STATUS
router.put("/:id", async (req, res) => {

  try {

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(updatedComplaint);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


module.exports = router;