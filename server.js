// Install some dependencies

// HTTP framework for handling requests
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) return console.log("Error connecting to MySQL:", err);
    
    console.log("Connected to MySQL as id:", db.threadId);
})



// your code goes down here


// your code goes up here
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Retrieve data from patients and providers
app.get('/data', (req, res) => {
    //const patientsQuery = 'SELECT * FROM patients';
    //const providersQuery = 'SELECT * FROM providers';

    db.query('SELECT * FROM patients', (err, results)  => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data');
        } else {
            res.render('data',{results:results})
        }

        db.query('SELECT * FROM providers', (err, results)  => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving data');
            } else {
                res.render('data',{results:results})
            }
        });
    });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    console.log('Sending message to browser...');
    app.get('/', (req, res) => { 
        res.send('Server Started Successfully!');
    });
});
