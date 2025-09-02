const { Link } = ReactRouterDOM
import {bookService} from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg, onBookRemove } from "../services/event-bus.service.js"

export function BookPreview({ book }) {
    const readerLevel = getRenderLevel(book.pageCount);

     if (!book.listPrice) return <span>book not found</span>

    const bookAgeCategory = calcBookAgeCategory(book.publishedDate);
    const spanBookAgeBadge = bookAgeCategory != '' ? <span className="badge bookAgeCategory">{bookAgeCategory}</span> : '';
    const spanReaderLevel = <span className="badge readerLevel">{readerLevel}</span>
    const priceClass = calcPriceClass(book.listPrice.amount) ;
    const spanPrice = <span className={priceClass}>{book.listPrice.amount}{getCurrency(book.listPrice.currencyCode)}</span>
    const imgOnSale =  book.listPrice.isOnSale ? <img className="sale-icon" src="assets/img/sale.png" alt="" /> : ""

    return (
        <article className="book-preview-container ">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
            <div>
               
                {imgOnSale}
                <div className="img-container">
                    <span className="book-title">{book.title}</span>

                    <img 
                        className="book-cover" 
                        src={book.thumbnail.replace('http://','https://www.')} 
                        alt="" />
                </div>
                <div>
                    <span className="badge readerLevel">{readerLevel}</span>
                    <span className="badge readerLevel">{readerLevel}</span>
                </div>
             <h4>Price: {spanPrice}</h4>
             <section className="book-actions" >
                <button style={{width:'100%',display:'inline-block',flex:'1'}}><Link to={`/book/${book.id}`}>Select</Link></button>
                <button style={{width:'100%',display:'inline-block',flex:'1'}} onClick={() =>onRemove(book.id)}>x</button>
            </section>
            </div>
            
        </article>
    )
}
function onRemove(bookId) {
        if (!confirm('are you sure to delete?')) return;

        bookService.remove(bookId)
            .then(() => {
                onBookRemove(bookId);
                //setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                //showSuccessMsg(`book removed`)
            })
            .catch(err => {
                console.log('err:', err)
                //showErrorMsg('Cannot remove book ' + bookId)
            })
    }
function getCurrency(currencyCode) {
    if (currencyCode == 'EUR')
        return '€';
    return '₪';
}
function calcBookAgeCategory(year) {
    const yearsDifference = new Date().getFullYear()-year;
    return yearsDifference > 10 ? 'Vintage' : (yearsDifference <= 1 ? 'New' : '')
}
function calcPriceClass(amount) {
    if (amount > 150) {
        return 'red';
    } else if (amount < 20) {
        return 'green'
    }
    return '';
}
function getRenderLevel(pageCount){
    return pageCount > 500 
        ? 'Serious Reading' : (pageCount > 200 
            ? 'Descent Reading' 
            : 'Light Reading')
}
