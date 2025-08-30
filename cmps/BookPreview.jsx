export function BookPreview({ book }) {
    const readerLevel = getRenderLevel(book.pageCount);
     
    const bookAgeCategory = calcBookAgeCategory(book.publishedDate);
    const spanBookAgeBadge = bookAgeCategory != '' ? <span className="badge bookAgeCategory">{bookAgeCategory}</span> : '';
    const spanReaderLevel = <span className="badge readerLevel">{readerLevel}</span>
    const priceClass = calcPriceClass(book.listPrice.amount)
    return (
        <article className="book-preview-container">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
            <div>
                <div className="badges-list" >
                    {spanReaderLevel}
                    {spanBookAgeBadge}
                </div>
                <img className="sale-icon" src="assets/img/sale.png" alt="" />
                <div className="img-container">
                    <span className="book-title">{book.title}</span>

                    <img 
                        className="book-cover" 
                        src={book.thumbnail.replace('http://','https://www.')} 
                        alt="" />
                </div>

            </div>
            <h4>Price: <span className={priceClass}>{book.listPrice.amount}</span></h4>
        </article>
    )
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
