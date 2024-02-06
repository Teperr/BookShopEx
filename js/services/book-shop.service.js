'use strict'
// console.log('book-shop.service:')

var gBooks = [
    { id: makeId(3), title: 'The life about Omer', price: 120, imgUrl: 'lori-ipsi.jpg' },
    { id: makeId(3), title: 'The life about Shira', price: 300, imgUrl: 'lori-ipsi.jpg' },
    { id: makeId(3), title: 'The life about Teper', price: 87, imgUrl: 'lori-ipsi.jpg' },
]
console.log('gBooks:', gBooks)


function getBooks() {

    return gBooks

}



function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}


function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
}


function addBook(bookTitel, bookPrice) {
    const book = _createBook(bookTitel, bookPrice)
    gBooks.unshift(book)

}


// privet function
function _createBook(bookTitel, bookPric) {
    return {
        id: makeId(3),
        title: bookTitel,
        price:bookPric,
        imgUrl: null
    }

}