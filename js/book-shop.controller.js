'use strict'

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
}

console.log('gQueryOptions:', gQueryOptions)



function onInit() {

    renderBook()

}

function renderBook() {
    const elTable = document.querySelector('table')
    const books = getBooks(gQueryOptions)
    // console.log('books:', books)

    const tableHeder = `<tr><th>Title</th><th>Price</th><th>Rating</th><th>Actions</th></tr>`

    const strHtml = books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.rating}</td>
            <td>
                <button onclick="onReadBook('${book.id}')" class="read-button">Read</button>
                <button onclick="onUpdateBook('${book.id}')" class="update-button">Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="delete-button">Delete</button>
            </td>
        </tr>
    `)

    elTable.innerHTML = tableHeder + strHtml.join('')
    renderStats()
}

function renderStats() {
    const elExpensive = document.querySelector('.expensive-books')
    const elAverage = document.querySelector('.average-books')
    const elCheap = document.querySelector('.cheap-books')

    elExpensive.innerText = getBookAbove200()
    elAverage.innerText = getBookBetween()
    elCheap.innerText = getBookBelow80()

}

function onClearButtons() {
    const elSearch = document.querySelector('.search')
    const elRating = document.querySelector('.dropdown-rating')

    elSearch.value = elRating.value = ''


    gQueryOptions.filterBy.txt = gQueryOptions.filterBy.rating = ''


    console.log('gQueryOptions:', gQueryOptions)

    renderBook()

}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBook()
}


function onUpdateBook(bookId) {
    const newPrice = +prompt('Put new price')

    updateBook(bookId, newPrice)
    renderBook()

}


function onAddBook() {
    const bookTitel = prompt('Book Name Here')
    const bookPrice = +prompt('Book Price Here')

    addBook(bookTitel, bookPrice)
    renderBook()


}


function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTitel = document.querySelector('.book-details h2 span')
    const elPre = document.querySelector('pre')

    const book = readBook(bookId)
    const bookStr = JSON.stringify(book, null, 4)

    elTitel.innerText = book.title
    elPre.innerText = bookStr

    elModal.showModal()
}

function onFilterBy(ev, val) {
    const elSearch = document.querySelector('.search')
    const elRating = document.querySelector('.dropdown-rating')

    gQueryOptions.filterBy.txt = elSearch.value
    gQueryOptions.filterBy.rating = elRating.value

    // console.log('gQueryOptions:', gQueryOptions)

    // filterBy(ev.data, ev)
    renderBook()

}