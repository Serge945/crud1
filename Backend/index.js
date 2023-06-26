import express from 'express';
import mysql from 'mysql';
import cors from 'cors'

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Valentina2023',
    database: 'test'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('Hello, this is the backend');
});

app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books';

    db.query(query, (err, data) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json(err);
        } else {
            res.json(data);
        }
    });
});
app.post("/books", (req, res)=>{
    const q = "INSERT INTO Books (`title`, `description`, `price`,`cover`) VALUES (?, ?, ?, ?)";
    const values = [
       req.body.title,
       req.body.description,
       req.body.price,
       req.body.cover,
    ];
    

    db.query(q, values, (err , data )=>{
        if(err) return res.json(err)
        return res.json("books has been created successfully")
    })
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
  
    db.query(q, [bookId], (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json("Book has been deleted successfully");
      }
    });
  });
  app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, description, price, cover } = req.body;
    const query = "UPDATE books SET title = ?, description = ?, price = ?, cover = ? WHERE id = ?";
  
    db.query(query, [title, description, price, cover, bookId], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json(err);
      } else {
        if (result.affectedRows > 0) {
          res.json("Book has been updated successfully");
        } else {
          res.json("Book not found");
        }
      }
    });
  });
  
  
app.listen(8800, () => {
    console.log('Server listening on port 8800');
});
