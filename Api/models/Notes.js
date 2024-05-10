const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model("Notes", NotesSchema);
module.exports = Notes;
