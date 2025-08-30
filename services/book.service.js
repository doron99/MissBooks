import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
const BOOK_KEY = 'bookDB'
_createBooks();
export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regExp.test(car.vendor))
            }
            if (filterBy.pageCount) {
                cars = cars.filter(car => car.speed >= filterBy.pageCount)
            }
            return cars
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
        .then(car => _setNextPrevCarId(car))
}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}

function getDefaultFilter() {
    return { txt: '', pageCount: '' }
}



function _setNextPrevCarId(car) {
    return query().then((cars) => {
        const carIdx = cars.findIndex((currCar) => currCar.id === car.id)
        const nextCar = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0]
        const prevCar = cars[carIdx - 1] ? cars[carIdx - 1] : cars[cars.length - 1]
        car.nextCarId = nextCar.id
        car.prevCarId = prevCar.id
        return car
    })
}

function _createCars() {
    let cars = loadFromStorage(BOOK_KEY)
    if (!cars || !cars.length) {
        cars = [
            _createCar('audu', 300),
            _createCar('fiak', 120),
            _createCar('subali', 50),
            _createCar('mitsu', 150)
        ]
        saveToStorage(BOOK_KEY, cars)
    }
}
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
function _createCar(vendor, speed = 250) {
    const car = getEmptyCar(vendor, speed)
    car.id = makeId()
    return car
}