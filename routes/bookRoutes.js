const express = require('express');

const router = express.Router();
const books = require('../data/bookData');
let booksDirectory = books;

//getting all books
router.get('/books', (req,res)=>{

    res.status('200').json({
        message : 'success',
        length : booksDirectory.length,
        booksDirectory});

});
// a single book
router.get('/books/:id',(req,res)=>{
    const id = req.params.id;
    const book = booksDirectory.find(book => book.isbn === id);
    if(!book){
        res.status('404').json({
        message : 'book is not available'
    })
    }
    res.status('200').json({
        message : 'succcess',
        length : 1,
        book
    })
    
});
//adding a new book
router.post('/books',(req,res)=>{
    const {isbn,title,subtitle,author,published,publisher,pages,description,website} = req.body;
    //check is book already exists
    const bookExists = booksDirectory.find(book => book.isbn === isbn);
    if(bookExists){

        res.status('404').json({
        message : 'Book already exists'
    })
    return;
    }
    const newBook = {isbn,title,subtitle,author,published,publisher,pages,description,website};
    booksDirectory.push(newBook);
    res.status('200').json({
        message : 'Book Added Successfully Added',
        addedIsbn : newBook.isbn,
        newBook
    })

    
});
//updating an existing book
router.put('/books/:id',(req,res)=>{
    const id = req.params.id;
     const {isbn,title,subtitle,author,published,publisher,pages,description,website} = req.body;
const bookExists = booksDirectory.find(book => book.isbn === id);
if(!bookExists){

        res.status('404').json({
        message : "Book doesn't exists"
    })
    return;
    }
    const updateField = (val,prev) => !val ? prev : val;
    const updatedBook = {
        isbn : id,
        title : updateField(title , bookExists.title),
        subtitle : updateField(subtitle , bookExists.subtitle),
        author : updateField(author , bookExists.author),
        publisher : updateField(publisher , bookExists.publisher),
        published : updateField(published , bookExists.published),
        pages : updateField(pages , bookExists.pages),
        description : updateField(description , bookExists.description),
        website : updateField(website , bookExists.website),
    }
    const bookIndex = booksDirectory.findIndex(book => book.isbn === id);
    booksDirectory.splice(bookIndex,1,updatedBook);
    res.status('200').json({
        message : 'Book Successfully Updated',
       updatedBook
    })


    
});
//deleting a book
router.delete('/books/:id',(req,res)=>{
    const id = req.params.id;
    const bookS = booksDirectory.find(book => book.isbn === id);
    if(!bookS){
        res.status('404').json({
        message : "Book doesn't exists"
    })
    return;
    }
    booksDirectory = booksDirectory.filter(book => book.isbn != bookS.isbn);
     res.status('200').json({
        message : 'Book Successfully Deleted',
        length : booksDirectory.length,
       booksDirectory,
    })
    
    
});

module.exports = router;
