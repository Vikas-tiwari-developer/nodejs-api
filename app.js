const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { response } = require('express');

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended : false }));

app.use(bodyParser.json());

// 

// Listen on environment port or 5000
app.listen(PORT , () => console.log(`Listen on the port ${PORT}`));

// Mysql connection
const db_conn = mysql.createPool({
   connectionLimit : 10,
   host : 'localhost',
   user : 'root',
   password : '',
   database : 'crud_nodejs'
});

// GET all Developers
app.get('/developers', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         conn.query('SELECT * FROM developers' , (err, rows) => {
             conn.release() // return the connection to pool

             if(!err){
                 res.send(rows);
             } else{
                 console.log(err);
             }
         });
    });
});

// GET specific Developers by id
app.get('/developers/:id', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         conn.query('SELECT * FROM developers WHERE id = ?' , [req.params.id] , (err, rows) => {
             conn.release() // return the connection to pool

             if(!err){
                 res.send(rows);
             } else{
                 console.log(err);
             }
         });
    });
});

// Delete specific Developers by id
app.delete('/developers/:id', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         conn.query('DELETE  FROM developers WHERE id = ?' , [req.params.id] , (err, rows) => {
             conn.release() // return the connection to pool

             if(!err){
                 res.send(`Developers with records ID ${[req.params.id] } has been removed.`);
             } else{
                 console.log(err);
             }
         });
    });
});

// Add Records /  Developers 
app.post('', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         const params =  req.body

         conn.query('INSERT INTO  developers SET ?' , params , (err, rows) => {
             conn.release() // return the connection to pool

             if(!err){
                 res.send(`Developers with name  ${params.id } has been Added.`);
             } else{
                 console.log(err);
             }
         });

         console.log(req.body);
    });
});

// Update Records /  Developers 
app.put('', (req, res) => {
    db_conn.getConnection( (err, conn) => {
         if(err) throw err
         console.log(`connected as id ${conn.threadId}`)

         const params =  req.body
         const { id, name, tagline, description, image } = req.body 

         conn.query('UPDATE  developers SET name = ? , tagline = ?, description = ?, image = ? WHERE id = ?',
          [name , tagline , description , image, id] , (err , rows) => {
             conn.release() // return the connection to pool

             if(!err){
                 res.send(`Developers with name  ${params.id } has been Added.`);
             } else{
                 console.log(err);
             }
         });

         console.log(req.body);
    });
});
