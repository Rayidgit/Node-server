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

// TO GET ALL THE NOTES FROM THE TABLE.
async function getResults() {
  const result = await pool.query('SELECT * FROM notes ORDER BY id DESC');
  return result[0];
}


<<<<<<< HEAD
// TO GET A NOTE BY ID.
=======
// TO GET A SINGLE NOTE  FROM THE TABLE.
>>>>>>> c53b9a2de7c20f047a0dcb6c8f41539524a52a61
async function getNoteById(id){
  const [result] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return result[0];
}


         
async function insertNote(title, contents){
  const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents])
  return result.insertId;
} 


async function updateNote(title, contents,id){
  const [result] = await pool.query(`UPDATE notes SET title = ?, contents = ? WHERE id = ? `, [title, contents,id])
  return result.affectedRows && result.insertId;
} 



async function deleteNote(id){
  const [result] = await pool.query(`DELETE FROM notes WHERE id = ?`, [id])
  return result.affectedRows;
}



export { getResults, getNoteById, insertNote, updateNote, deleteNote };