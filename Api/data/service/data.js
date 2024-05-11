const Notes = require("./../../models/Notes.js");

const getNotes = async (req, res) => {
  try {
    const note = await Notes.findOne();
    
    if (!note) {
      return res.status(404).send({ error: "Not found" });
    }
    
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNotes,
};
