const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookPreview} from "../cmps/BookPreview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
// import { showErrorMsg } from "../services/event-bus.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        console.log('loadBook',params.bookId)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.error('err:', err)
                //showErrorMsg('Cannot load car')
                navigate('/book')
            })
    }

    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/book')
        // navigate(-1)
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details ">
            <div className="flex-container">
                <div className="flex-item-2 book-details-content ">
                    <h1>{book.title}</h1>
                    <p>{book.subtitle}</p>
                    <p>authors: {book.authors.join(',')}</p>
                    <p>categories: {book.categories.join(',')}</p>
                    <p>language: {book.language}</p>
                    <p>page Count: {book.pageCount}</p>
                    <p>published Year: {book.publishedDate}</p>

                    <hr/>
                    Description:<br/><br/>
                    <LongTxt txt={book.description} length={50}/>

                </div>
                <div className="flex-item-2 book-details-preview ">
                    <BookPreview  book={book}/>

                </div>
            </div>
            <br/>
            
            <nav className="next-prev">
                <Link className="button" to={`/book/${book.prevBookId}`}> &lt; Previous Book</Link> | 
                <Link className="button" to={`/book/${book.nextBookId}`}>Next Book &gt;</Link> 
            </nav>
            <br/>
            <hr />
            <button onClick={onBack}>Back</button>
            <br/>
        </section>
    )
}

