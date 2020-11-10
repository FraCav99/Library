const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryDB', {
    useNewUrlParser: true, useUnifiedTopology: true
});

const app = express();

// Use EJS as view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// Create Schema for Books
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is missing']
    },
    author: {
        type: String,
        required: [true, 'author is missing']
    },
    pages: {
        type: Number,
        required: [true, 'pages number missing']
    },
    user: String
});

// Create Books model
const Book = mongoose.model('Book', BookSchema);

const book1 = new Book({
    title: 'book1',
    author: 'Joe Doe',
    pages: 342,
    user: 'nick123'
});

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});