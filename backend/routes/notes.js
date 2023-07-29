const express = require("express");
const fetchuser = require("../fetchUserData/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// route 1 fetch all notes 
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "User not found" });
  }
});

//route 2 - add note , login needed 
router.post("/addnote",fetchuser,
  [
    body("title", "give the title").isLength({ min: 5 }),
    body("description", "please add the info").isLength({ min: 5 }),
  ],
  async (req, res) => {
    /// check whether the login field is empty or not
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Pleae add notes" });
    }
  }
);

// route 3 -update existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  /// extract the all info from added note
  const { title, description, tag } = req.body;
  const newNote = {};
  // if the fields are exits then add
  try {
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (title) {
      newNote.tag = tag;
    }
    //takes the currend note id, we wanted to udpated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found note");
    }

    /// check the current user id, with login user id  if both same then proceed

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authenticate");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{ $set: newNote },{ new: true });
    res.json({ note });
  } catch (error) {}
});

// Route 4 -delete note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //takes the currend note id, we wanted to udpated
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found note");
    }
    /// check the current user id, with login user id  if both same then proceed

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not authenticate");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({
      Success: "Delete note",
      note: note,
    });
  } catch (error) {
    console.error("Internal Server error");
    res.send("Internal server error");
  }
});

module.exports = router;
