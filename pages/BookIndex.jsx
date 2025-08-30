const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import {BookFilter} from '../cmps/BookFilter.jsx'
import {BookList} from '../cmps/BookList.jsx'
export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedCar, setSelectedCar] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        console.log('filterBy happend', filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load books')
            })
    }, [filterBy])

    function onRemoveCar(carId) {
        bookService.remove(carId)
            .then(() => {
                setCars(prevCars => prevCars.filter(car => car.id !== carId))
                showSuccessMsg(`Car removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove car ' + carId)
            })
    }

    function onCarCreated(savedCar) {
        setCars([...cars, savedCar])
        setIsEdit(false)
    }

    function onCarUpdated(savedCar) {
        setCars(cars.map(car => (car.id === savedCar.id) ? savedCar : car))
        setSelectedCar(null)
        setIsEdit(false)
    }
    return (
        <div>
            
            <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <BookList books={books} onSelect={setSelectedCar} onRemove={onRemoveCar} />

        </div>
    )
}

