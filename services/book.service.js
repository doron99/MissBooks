import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
const BOOK_KEY = 'bookDB'

const currYear = new Date().getFullYear();

_createBooks();
export const bookService = {
    query,
    get,
    remove,
    save,
    //getEmptyBook,
    getDefaultFilter,
    createBook,
    addReview,
    deleteReview,
    getFilterFromSrcParams
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            if (filterBy.isOnSale) {
                books = books.filter(book => book.listPrice.isOnSale == filterBy.isOnSale)
            }
            if (filterBy.isVintage) {
                books = books.filter(book => currYear-book.publishedDate > 10)
            }
            if (filterBy.isNew) {
                books = books.filter(book => currYear-book.publishedDate <= 1)
            }
            if (filterBy.readerLevel) {
                switch (filterBy.readerLevel) {
                    case 'all':
                        break;
                    case 'serious':
                        books = books.filter(book => book.pageCount > 500)
                        break;
                    case 'descent':
                        books = books.filter(book => book.pageCount > 200 && book.pageCount < 500)
                        break;
                    case 'light':
                        books = books.filter(book => book.pageCount < 100)
                        break;
                    default:

                    }
                
            }
            return books
        })
}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}
function addReview(bookId,review) {
    review.id = utilService.makeId()
    return get(bookId)
        .then(book => {
            book.reviews = book.reviews ? [...book.reviews, review] : [review];
            return save(book)
        })
        .catch(error => {
            console.error('Error adding review:', error);
        });
}
function deleteReview(bookId,reviewId) {
    
    return get(bookId)
        .then(book => {
            book.reviews = book.reviews.filter(review => review.id != reviewId);
            return save(book)
        })
        .catch(error => {
            console.error('Error updating review:', error);
        });
}

function getDefaultFilter() {
    return { txt: '', price: '', isOnSale: false, isVintage: false, readerLevel:'all', isNew: false}
}
function getFilterFromSrcParams(srcParams) {
    const txt = srcParams.get('txt') || ''
    const price = srcParams.get('price') || ''
    const isOnSale = srcParams.get('isOnSale') && srcParams.get('isOnSale') == 'true' ? true : false
    const isVintage = srcParams.get('isVintage') && srcParams.get('isVintage') == 'true' ? true : false
    const readerLevel = srcParams.get('readerLevel') || 'all'
    const isNew = srcParams.get('isNew') && srcParams.get('isNew') == 'true' ? true : false


    return { 
        txt: txt, 
        price: price, 
        isOnSale: isOnSale, 
        isVintage: isVintage, 
        readerLevel:readerLevel, 
        isNew: isNew
    }


}


function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

// function _createCars() {
//     let cars = loadFromStorage(BOOK_KEY)
//     if (!cars || !cars.length) {
//         cars = [
//             _createCar('audu', 300),
//             _createCar('fiak', 120),
//             _createCar('subali', 50),
//             _createCar('mitsu', 150)
//         ]
//         saveToStorage(BOOK_KEY, cars)
//     }
// }
//it creates 20 books and save to db
function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
    console.log('books', books)
}
function createBook() {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const book = {
            //id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: ``,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        return book;
}
