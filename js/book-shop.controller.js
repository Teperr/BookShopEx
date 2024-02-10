'use strict'

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

console.log('gQueryOptions:', gQueryOptions)



function onInit() {
    // renderRating()
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


// function renderRating() {
//     const ratings = getRating()

//     const strHtml = ratings.map(rating => `
//         <option>${rating}</option>
//     `).join('')
//     console.log('strHtml:', strHtml)

//     const elLists = document.querySelectorAll('.dropdown-rating')
//     console.log('elLists:', elLists)
//     elLists.forEach(list => list.innerHTML += strHtml)
//     console.log('elLists:', elLists)
// }

function renderStats() {
    const elExpensive = document.querySelector('.expensive-books')
    const elAverage = document.querySelector('.average-books')
    const elCheap = document.querySelector('.cheap-books')

    elExpensive.innerText = getBookAbove200()
    elAverage.innerText = getBookBetween()
    elCheap.innerText = getBookBelow80()

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
    // const bookTitel = prompt('Book Name Here')
    // const bookPrice = +prompt('Book Price Here')
    document.querySelector('.add-button-dialog').showModal()



    // addBook(bookTitel, bookPrice)
    // renderBook()


}

function onSaveCar() {
    const elModal = document.querySelector('.add-button-dialog form')

    const elTitle = document.querySelector('.add-button-dialog .title')
    const elPrive = document.querySelector('.add-button-dialog .price')
    const elRating = document.querySelector('.add-button-dialog .rating')

    const bookTitel = elTitle.value
    const bookPrice = elPrive.value
    const bookRating = elRating.value

    addBook(bookTitel, bookPrice, bookRating)
    elModal.reset()

    renderBook()

}

function onCloseBookModal() {
    document.querySelector('.add-button-dialog').close()

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

function onClearButtons() {
    const elSearch = document.querySelector('.search')
    const elRating = document.querySelector('.dropdown-rating')

    elSearch.value = elRating.value = ''
    gQueryOptions.filterBy.txt = gQueryOptions.filterBy.rating = ''

    renderBook()
}


function onSortBy() {
    const elSortBy = document.querySelector('.sort-by')
    const elAscending = document.querySelector('.sort-ascending')
    const elDescending = document.querySelector('.sort-descending')

    var sortBy = elSortBy.value

    if (elAscending.checked) var dir = 1
    else if (elDescending.checked) dir = -1

    gQueryOptions.sortBy = { [sortBy]: dir }

    console.log('gQueryOptions:', gQueryOptions)
    renderBook()

}


function onNextPage() {
    var booksCount = getBooksCount(gQueryOptions)
    if (booksCount > (gQueryOptions.page.idx + 1) * gQueryOptions.page.size) {
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }

    renderBook()
}


function onPrevPage() {
    var booksCount = getBooksCount(gQueryOptions)
    gQueryOptions.page.idx--

    if (gQueryOptions.page.idx === -1) {
        gQueryOptions.page.idx = Math.floor(Math.sqrt(booksCount)) - 1
    }

    renderBook()
}

