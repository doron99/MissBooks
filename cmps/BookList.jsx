import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {

    return (
        <ul className="flex-container ">
            {books.map(book =>
                <li key={book.id} className="flex-item list-style-none flex-item" >
                    <BookPreview book={book} />
                    <section className="book-actions" >
                        <button style={{width:'100%',display:'inline-block',flex:'1'}}><Link to={`/book/${book.id}`}>Select</Link></button>
                        <button style={{width:'100%',display:'inline-block',flex:'1'}} onClick={() =>onRemove(book.id)}>x</button>
                    </section>
                </li>
            )}
        </ul>
    )
}