const Notes = require("./../../models/Notes.js");

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send;
  }
};
module.exports = {
  getNotes,
};
