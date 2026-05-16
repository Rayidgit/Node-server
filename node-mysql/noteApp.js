import express from 'express';
import { getResults, getNoteById, insertNote, updateNote,deleteNote  } from './database.js';

const PORT = 3000;


const noteApp = express();

// Middleware to parse JSON bodies.
noteApp.use(express.json());

// Routes for Database operations.
noteApp.get('/notes', 
  async (req, res) => {
    try{
      const notes = await getResults();
      res.status(200).json(notes);
    }
    catch(err) {
      console.error(err);
      res.status(500).json(
        {
          message : "Failed to fetch notes from database."
        }
      )
    }
  }
)

noteApp.get('/notes/:id', 
  async (req, res) => {
    try{
      const note = await getNoteById(req.params.id);
      if (!note || (Array.isArray(note) && note.length === 0)) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json(note);
    }
    catch(err) {
      console.error(err);
      res.status(500).json(
        {
          message : "Failed to fetch note from database."
        }
      )
    }
  }
)

// Route for POST new note.
noteApp.post('/newNote', 
  async (req, res) => {
    const {title, contents} = req.body;
    const result =  await insertNote(title, contents);
    
    if(result) {
      res.status(201).json({
        message: "Note inserted successfully",
        noteId: result
      });
    } else {
      res.status(401).json({
        message: "Failed to insert note due to bad request from user's end point." 
      });
    }
  }
)

// Route for PUT note.
noteApp.put('/updateNote/:id', 
  async (req, res) => {
    const {title, contents} = req.body;
    const result =  await updateNote(title, contents, req.params.id);

    console.log("BODY:", req.body);
    console.log("ID:", req.params.id);
    
    if(result > 0) {
      res.status(200).json({
        message: "Note updated successfully",
        updatedRows: result
      });
    } else {
      res.status(404).json({
        message: "Note not found or failed to update" 
      });
    }
  }
)


noteApp.delete('/deleteNote/:id', 
  async (req, res) => {
    const id = req.params.id;
    const result =  await deleteNote(id);
    
    if(result > 0) {
      res.status(200).json({
        message: "Note deleted successfully",
        updatedRows: result
      });
    } else {
      res.status(404).json({
        message: "Note not found or failed to delete" 
      });
    }
  }
)

// Express@5 error handling middleware.
noteApp.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong",
  });
});


noteApp.listen(3000, () => {
  console.log(`server is running on port ${PORT}`)
})