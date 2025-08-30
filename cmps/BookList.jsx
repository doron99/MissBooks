import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM
export function BookList({ books, onRemove, onSelect }) {

    return (
        <ul className="flex-container ">
            {books.map(book =>
                <li key={book.id} className="flex-item list-style-none">
                    <BookPreview book={book} />
                    <section className="book-actions" >
                        <button><Link to={`/book/${book.id}`}>Select</Link></button>
                        {/* <button onClick={() => onSelect(book)}>Select</button> */}
                        <button onClick={() => onRemove(book.id)}>x</button>
                    </section>
                </li>
            )}
        </ul>
    )
}