const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookPreview} from "../cmps/BookPreview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewEdit } from "../cmps/ReviewEdit.jsx"
import { Rating } from "../cmps/Rating.jsx"

import { showErrorMsg } from "../services/event-bus.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [review, setReview] = useState(null)

    const params = useParams()

    useEffect(() => {
        loadBook()
    }, [params.bookId]
    )

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
    function onPostReview({review}) {
        console.log('review', review);
        bookService.addReview(book.id,review)
        .then((updatedBook) => {
            console.log('after add review', updatedBook);
            setBook(updatedBook);
        })
        //setReview(null)
    }
    const onDeleteReview = (reviewId) => {
        bookService.deleteReview(book.id,reviewId)
        .then((updatedBook) => {
            console.log('after delete review', updatedBook);
            setBook(updatedBook);
        })
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details ">
            <div className="flex-container">
                <div className="flex-item-2 book-details-content ">
                    <h1>{book.title}</h1>
                    <p className="italic"><span className="blockquote book-details-subtitle">{book.subtitle}</span></p>
                    <p>Authors:
                        {
                            book.authors.map((a, index) => {
                                return <span className="badge" key={index}>{a}</span>;
                            })
                        }
                        
                    </p>

                    <p>Categories: 
                        {
                            book.categories.map((cat, index) => {
                                return <span className="badge" key={index}>{cat}</span>;
                            })
                        }
                    </p>
                    <p >language: {book.language}</p> 
                    <p>page Count: {book.pageCount}</p>
                    <p>published Year: {book.publishedDate}</p>

                    <hr/>
                    Description:<br/><br/>
                    <LongTxt 
                    classes={'book-desc'} 
                    txt={book.description} 
                    length={200}
                    />

                </div>
                <div className="flex-item-2 book-details-preview ">
                    <BookPreview  book={book} />

                </div>
            </div>
            <br/>
            <div>
                <ReviewEdit review={review} onPostReview={onPostReview}/>
                <br/>
                {book.reviews.map((review,index) => {
                    return <div key={index} style={{display:'flex'}}><div>{review.fullname}</div>
                    <Rating rating={review.rating}  /> 
                    <button onClick={() => onDeleteReview(review.id)}>x</button>
                   </div>
                })}
            </div>
            
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

