import express from 'express';
import { getResults, getNoteById, insertNote } from './database.js';

const PORT = 8080;


const noteApp = express();

// Middleware to parse JSON bodies.
noteApp.use(express.json());

// Routes for Database operations.
noteApp.get('/notes', 
  async (req, res) => {
    const notes = await getResults();
    res.json(notes);
  }
)

// Route for POST new note.
noteApp.post('/newNote', 
  async (req, res) => {
    const {title, contents} = req.body;
    const result =  await insertNote(title, contents);
    // res.json({
    //   message: "Note inserted successfully",
      
    // });
    if(result) {
      res.json({
        message: "Note inserted successfully",
        noteId: result
      });
    } else {
      res.status(500).json({
        message: "Failed to insert note" 
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


noteApp.listen(8080, () => {
  console.log(`server is running on port ${PORT}`)
})