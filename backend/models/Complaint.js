const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  severity: {
    type: String,
    default: "Pending ML",
  },

  priority: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    default: "Pending",
  },
},
{ timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);