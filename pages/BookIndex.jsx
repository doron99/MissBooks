const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import {BookFilter} from '../cmps/BookFilter.jsx'
import {BookList} from '../cmps/BookList.jsx'
import {BookEdit} from '../cmps/BookEdit.jsx'

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedCar, setSelectedCar] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [bookEditState, setBookEditState] = useState('hidden')
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        console.log('filterBy happend', filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load books')
            })
    }, [filterBy])

    function onRemoveCar(bookId) {
        if (!confirm('are you sure to delete?')) return;

        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`book removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove book ' + bookId)
            })
    }

    function onBookCreated(savedBook) {
        setBooks(prevBooks => [...prevBooks, savedBook])
        setIsEdit(false)
    }

    // function onCarUpdated(savedCar) {
    //     setCars(cars.map(car => (car.id === savedCar.id) ? savedCar : car))
    //     setSelectedCar(null)
    //     setIsEdit(false)
    // }
    function openBookEditModal() {
        setBookEditState('add')
    }
    function onBookEditClose(savedBook) {
        if (savedBook) {
            onBookCreated(savedBook)
        }
        setBookEditState('hidden');
    }
    return (
        <div>
            <button onClick={openBookEditModal}>Add Book</button>
            <BookEdit state={bookEditState} book={selectedBook} onClose={onBookEditClose} />
            <BookFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <BookList books={books}  onRemove={onRemoveCar} />

        </div>
    )
}

