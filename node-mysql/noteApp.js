import express from 'express';
import { getResults, getNoteById, insertNote, updateNote,deleteNote  } from './database.js';

const PORT = 3000;


const noteApp = express();

// Middleware to parse JSON bodies.
noteApp.use(express.json());

// Routes for Database operations.
noteApp.get('/notes', 
  async (req, res) => {
    const notes = await getResults();
    res.json(notes);
//This will not work unless the express.json() middleware is not available.
  }
)

// Route for POST new note.
noteApp.post('/newNote', 
  async (req, res) => {
    const {title, contents} = req.body;
    const result =  await insertNote(title, contents);
    
    if(result) {
      res.json({
        message: "Note inserted successfully",
        noteId: result
      });
    } else {
      res.status(401).json({
        message: "Failed to insert note due to bad request from user's end poin." 
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
      res.json({
        message: "Note updated successfully",
        updatedRows: result
      });
    } else {
      res.status(500).json({
        message: "Failed to update note" 
      });
    }
  }
)


noteApp.delete('/deleteNote/:id', 
  async (req, res) => {
    const id = req.params.id;
    const result =  await deleteNote(id);
    
    if(result > 0) {
      res.json({
        message: "Note deleted successfully",
        updatedRows: result
      });
    } else {
      res.status(500).json({
        message: "Failed to delete note" 
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