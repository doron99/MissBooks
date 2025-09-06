import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
const BOOK_KEY = 'bookDB'
const BOOK_SEARCH_KEY = 'bookSearchDB'

const currYear = new Date().getFullYear();

setBooksForSearch();
export const googleBookService = {
    get,
    isBookExistsByTitle
}




function get(txt,debugMode = false) {
    if (txt.length == 0) return Promise.resolve([]);
    return debugMode ? storageService.query(BOOK_SEARCH_KEY) : getBooksfromApi()
        .then(books => {
            const regExp = new RegExp(txt, 'i')
            books = books.filter(book => regExp.test(book.title))
            return books;
        })
}


function setBooksForSearch() {
    console.log('setBooksForSearch')
    let books = utilService.loadFromStorage(BOOK_SEARCH_KEY)
    if (!books || !books.length) {
    fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
        .then(response => response.json())
        .then(data => {
            
            const newList = [];
            for(let i = 0; i < data.items.length; i++) {
                newList.push(convertBookData(data.items[i]))
            }
            utilService.saveToStorage(BOOK_SEARCH_KEY, newList)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    }
}
function getBooksfromApi() {
    
    return fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
        .then(response => response.json())
        .then(data => {
            
            const newList = [];
            for(let i = 0; i < data.items.length; i++) {
                newList.push(convertBookData(data.items[i]))
            }
            return Promise.resolve(newList)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return Promise.resolve([])
        });

    
}
function convertBookData(originalData) {
    const thumbnail = 
    originalData 
    && originalData.volumeInfo 
    && originalData.volumeInfo.imageLinks 
    && originalData.volumeInfo.imageLinks.thumbnail ? originalData.volumeInfo.imageLinks.thumbnail : "assets/svgs/book-cover.svg"
    return {
        id: originalData.id,
        title: originalData.volumeInfo.title || utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4), // No subtitle provided in the original data
        authors: originalData.volumeInfo.authors,
        publishedDate: new Date(originalData.volumeInfo.publishedDate).getFullYear(),
        description: originalData.volumeInfo.description,
        pageCount: originalData.volumeInfo.pageCount,
        categories: originalData.volumeInfo.categories,
        thumbnail: thumbnail,
        language: originalData.volumeInfo.language,
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    };
}
function isBookExistsByTitle(title) {
    return storageService.query(BOOK_KEY)
    .then(books => {
        if (books.some(book => book.title == title))
            return Promise.resolve(true);
       
        return Promise.resolve(false);
    })
}