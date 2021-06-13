const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

module.exports = mongoose.model("Student", studentSchema);
