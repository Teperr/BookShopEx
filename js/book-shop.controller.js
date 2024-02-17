'use strict'

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

var gBookToEdit = null

console.log('gQueryOptions:', gQueryOptions)



function onInit() {
    // renderRating()
    readQueryParams()
    renderBook()
    doTrans()

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
    gBookToEdit = getBookById(bookId)

    const elModal = document.querySelector('.add-button-dialog')

    elModal.querySelector('.title').value = gBookToEdit.title
    elModal.querySelector('.price').value = gBookToEdit.price
    elModal.querySelector('.dropdown-rating').value = gBookToEdit.rating



    elModal.showModal()
    // updateBook(bookId, newPrice)
    // renderBook()

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

    if (gBookToEdit) {
        updateBook(gBookToEdit.id, bookTitel, bookPrice, bookRating)
        gBookToEdit = null
    } else {

        addBook(bookTitel, bookPrice, bookRating)
    }

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
    setQueryParams()
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
    setQueryParams()
    renderBook()

}


function onNextPage() {
    var booksCount = getBooksCount(gQueryOptions)
    if (booksCount > (gQueryOptions.page.idx + 1) * gQueryOptions.page.size) {
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }

    setQueryParams()
    renderBook()
}


function onPrevPage() {
    var booksCount = getBooksCount(gQueryOptions)
    gQueryOptions.page.idx--

    if (gQueryOptions.page.idx === -1) {
        gQueryOptions.page.idx = Math.floor(Math.sqrt(booksCount)) - 1
    }

    setQueryParams()
    renderBook()
}

// Query Params

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        txt: queryParams.get('txt') || '',
        rating: +queryParams.get('rating') || 0
    }

    if (queryParams.get('sortBy')) {
        const prop = queryParams.get('sortBy')
        const dir = queryParams.get('sortDir')
        gQueryOptions.sortBy[prop] = dir
    }

    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }

    renderQueryParams()
}


function renderQueryParams() {

    document.querySelector('.filter .search').value = gQueryOptions.filterBy.txt
    document.querySelector('.filter .dropdown-rating').value = gQueryOptions.filterBy.rating

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    const sortBy = sortKeys[0]
    const dir = +gQueryOptions.sortBy[sortKeys[0]]

    document.querySelector('.sort-by-div select').value = sortBy || ''
    document.querySelector('.sort-by-div input').checked = (dir === -1) ? true : false

}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('txt', gQueryOptions.filterBy.txt)
    queryParams.set('rating', gQueryOptions.filterBy.rating)


    const sortKeys = Object.keys(gQueryOptions.sortBy)
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)


}

function onSetLang(lang){
    setLang(lang)

    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')


    renderBook()
    doTrans()


}