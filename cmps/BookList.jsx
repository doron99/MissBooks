import { BookPreview } from "./BookPreview.jsx"
export function BookList({ books, onRemove }) {
    
    return (
        <ul className="flex-container ">
            {books.map(book =>
                <li key={book.id} className="flex-item list-style-none" >
                    <BookPreview book={book} showActions={true} />
                    
                </li>
            )}
        </ul>
    )
}