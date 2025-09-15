const { useState, useEffect } = React
import {bookService} from '../services/book.service.js'
import {Chart} from '../cmps/Chart.jsx'

export function Dashboard() {
    const [books, setBooks] = useState([])
    const [arrDashboardData, setArrDashboardData] = useState([])

    useEffect(() => {
        loadBooks();
    },[])
    function loadBooks() {
        bookService.query(bookService.getDefaultFilter())
            .then(books => {
                setBooks(books);
                
                const groupBy = books.reduce((accumulator, element) => {
                    const groupKey = element.categories && element.categories[0] ? element.categories[0] : 'undefined';
                    accumulator[groupKey] = (accumulator[groupKey] || 0) + 1;
                    return accumulator;
                }, {});
                const data = Object.keys(groupBy)
                    .map(cat =>
                    ({
                        title: cat,
                        value: Math.round((groupBy[cat] / books.length) * 100)
                    }))
                
                setArrDashboardData(data);
            })
            .catch(err => {
                console.error('err:', err)
                showErrorMsg('Cannot load books')
            })
    }
 

    return (
        <section className="">
            <Chart data={arrDashboardData}/>
        </section>
    );
}