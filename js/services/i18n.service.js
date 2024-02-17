'use strict'



const gTrans = {
    title: {
        en: 'Book library',
        he: 'ספריה'
    },
    rating: {
        en: 'Select Rating',
        he: 'בחר דירוג'
    },
    'filtering-and-sorting': {
        en: 'Filtering & Sorting',
        he: 'סינון & מיון'
    },
    search: {
        en: 'Search',
        he: 'חיפוש'
    },
    clear: {
        en: 'Clear',
        he: 'מחק שדות'
    },
    'add-book': {
        en: 'Add a Book',
        he: 'הוספת ספר'
    },
    save: {
        en: 'Save',
        he: 'שמירה'
    },
    cancel: {
        en: 'Cancel',
        he: 'ביטול'
    },
    'select-sorting': {
        en: 'Select Sorting',
        he: 'מיין',
    },
    'by-title': {
        en: 'By Title',
        he: 'על פי כותרת',
    },
    'by-price': {
        en: 'By Price',
        he: 'על פי מחיר'
    },
    ascending: {
        en: 'Ascending',
        he: 'סדר עולה'
    },
    descending: {
        en: 'Descending',
        he: 'סדר יורד'
    },
    'prev-page': {
        en: 'Prev Page',
        he: 'עמוד קודם'
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'book-name': {
        en: 'Book Name:',
        he: 'שם הספר:'
    },
    'expensive-books': {
        en: 'Expensive Books (Above 200):',
        he: 'ספרים יקרים (מעל 200):'
    },
    'average-books': {
        en: 'Average Books (Between 80-200):',
        he: 'ספרים בטווח (בין 80-200):'
    },

    'cheap-books': {
        en: 'Cheap Books (Below 80):',
        he: 'ספרים זולים (מתחת 80):'
    },

}

var gCurrLang = 'en'

function getTrans(transKey) {

    const transMap = gTrans[transKey]

    if (!transMap) return 'UNKNOWN'

    let transTxt = transMap[gCurrLang]

    if (!transTxt) transTxt = transMap.en

    return transTxt
}

function doTrans() {
    const elDataTrans = document.querySelectorAll('[data-trans]')

    elDataTrans.forEach(el => {
        console.log('el:', el)

        const transKey = el.dataset.trans

        const transTxt = getTrans(transKey)

        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt

    })

}

function setLang(lang) {
    gCurrLang = lang
}