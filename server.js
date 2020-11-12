const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

app.get('/', (req, res) => {

    Book.find({}, (err, foundBooks) => {
        if (err) console.log(err);
        res.render('index', {foundBooks: foundBooks});
    });
});

app.route('/add')
    .get((req, res) => {
        res.render('add')
    })
    .post((req, res) => {
        // retrieve inserted data
        const title = req.body.title;
        const author = req.body.author;
        const pages = req.body.pages;
        const user = req.body.user;

        // Create a new record to insert into the DB
        const newBook = new Book({
            title,
            author,
            pages,
            user: user || 'anonymous'
        });

        // save the new document
        newBook.save();

        // redirect to the homepage
        res.redirect('/');

    });

app.post('/delete', (req, res) => {
    // Retrieve id of the record
    const deletedBookId = req.body.delete;

    // Using mongoose method to delete it
    Book.findByIdAndRemove(deletedBookId, err => {
        if (err) console.log(err);
        
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});