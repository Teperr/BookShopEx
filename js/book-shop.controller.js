'use strict'
// console.log('controller:')
// 

function onInit() {

    renderBook()

}

function renderBook() {
    const elTable = document.querySelector('table')
    const books = getBooks()
    // console.log('books:', books)

    const tableHeder = `<tr><th>Title</th><th>Price</th><th>Actions</th></tr>`

    const strHtml = books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button onclick="onReadBook('${book.id}')" class="read-button">Read</button>
                <button onclick="onUpdateBook('${book.id}')" class="update-button">Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="delete-button">Delete</button>
            </td>
        </tr>
    `)

    elTable.innerHTML = tableHeder + strHtml.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBook()
}


function onUpdateBook(bookId){
    const newPrice = +prompt('Put new price')

    updateBook(bookId, newPrice)
    renderBook()

}