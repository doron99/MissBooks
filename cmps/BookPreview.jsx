import {bookService} from '../services/book.service.js'

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
                    {spanBookAgeBadge}
                    <span className="badge readerLevel">{readerLevel}</span>
                </div>
             <h4>Price: {spanPrice}</h4>
            </div>
            
        </article>
    )
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
