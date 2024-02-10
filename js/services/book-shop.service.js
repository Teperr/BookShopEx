'use strict'
// console.log('book-shop.service:')

var gBooks
_createBooks()

var bookNameSearch = []

console.log('gBooks:', gBooks)


function getBooks(options) {

    var books = _filterBook(options.filterBy)
    console.log('books:', books)

    if (options.sortBy.title) {
        books.sort((book1, book2) => book1.title.localeCompare(book2.title) * options.sortBy.title)
        
    } else if (options.sortBy.price) {
        books.sort((book1, book2) => (book1.price - book2.price) * options.sortBy.price)

    } else if (options.sortBy.rating) {
        books.sort((book1, book2) => (book1.rating - book2.rating) * options.sortBy.rating)
    }

    console.log('options.sortBy:', options.sortBy)

    return books

}



function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)

    _saveBooks()
}


function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice

    _saveBooks()
}


function addBook(bookTitel, bookPrice) {
    if (!bookTitel || !bookPrice) return
    const book = _createBook(bookTitel, bookPrice)
    gBooks.unshift(book)

    _saveBooks()

}


function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    console.log('book:', book)
    return book

}

function _filterBook(filterBy) {
    const txt = filterBy.txt.toLowerCase()
    const rating = filterBy.rating

    if (!rating) {
        var filterBooks = gBooks.filter(book => book.title.toLowerCase().includes(txt))
    } else {
        filterBooks = gBooks.filter(book => book.title.toLowerCase().includes(txt) && +book.rating === +rating)
    }

    return filterBooks
}


function getBookAbove200() {
    const numberOfBook = gBooks.filter(book => book.price > 200)
    // console.log('numberOfBook:', numberOfBook.length)
    return numberOfBook.length

}

function getBookBetween() {
    const numberOfBook = gBooks.filter(book => book.price > 80 && book.price < 200)
    // console.log('numberOfBook:', numberOfBook.length)
    return numberOfBook.length

}

function getBookBelow80() {
    const numberOfBook = gBooks.filter(book => book.price < 80)
    // console.log('numberOfBook:', numberOfBook.length)
    return numberOfBook.length

}





// privet function


function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('The life about Omer', 120),
            _createBook('The life about Shira', 300),
            _createBook('The life about Teper', 87)
        ]
        _saveBooks()
    }

}

function _createBook(bookTitel, bookPric, rating) {
    return {
        id: makeId(3),
        title: bookTitel,
        price: bookPric,
        imgUrl: null,
        rating: rating || getRandomIntInclusive(1, 5)
    }

}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)

}