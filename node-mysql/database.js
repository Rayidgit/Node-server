import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool(
  {
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  }
).promise(); 

// (async () => {
//   try {
//     const result = await pool.query('SELECT * FROM notes');
//     console.log(result);
//   }
//   catch (err) {
//     console.log(err);
//   }
  
// })();
// TO GET ALL THE NOTES FROM THE TABLE.
async function getResults() {
  const result = await pool.query('SELECT * FROM notes');
  return result[0];
}



async function getNoteById(id){
  const [result] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return result[0];
}


         
async function insertNote(title, contents){
  const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents])
  return result.insertId;
} 


// const newNote = await insertNote('Third note', 'I am a Computer Engineering undergraduate student');
// console.log(result);

const result = await getResults();
console.log(result);

const resultById = await getNoteById(2);
console.log(resultById);


export { getResults, getNoteById, insertNote };