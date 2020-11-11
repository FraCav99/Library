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
    user: {
        type: String,
        default: "anonymous"
    }
});

// Create Books model
const Book = mongoose.model('Book', BookSchema);

const book1 = new Book({
    title: 'book1',
    author: 'Joe Doe',
    pages: 342,
    user: 'nick123'
});

const book2 = new Book({
    title: 'book2',
    author: 'Anna Letcher',
    pages: 323
});

//book2.save();

app.get('/', (req, res) => {

    Book.find({}, (err, foundBooks) => {
        if (err) console.log(err);
        res.render('index', {foundBooks: foundBooks});
    });
});

app.route('/add')
    .get((req, res) => {
        res.render('add');
    })
    .post((req, res) => {
        // retrieve inserted data
        // const title = req.body.
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});