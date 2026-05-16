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


// TO GET A NOTE BY ID.
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
  return result.affectedRows;
} 



async function deleteNote(id){
  const [result] = await pool.query(`DELETE FROM notes WHERE id = ?`, [id])
  return result.affectedRows;
}



export { getResults, getNoteById, insertNote, updateNote, deleteNote };