const { useState, useEffect } = React
import {bookService} from '../services/book.service.js'
import {Chart} from '../cmps/Chart.jsx'

export function Dashboard() {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState({})
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
                            // Initialize the count for the groupKey if it doesn't exist
                            accumulator[groupKey] = (accumulator[groupKey] || 0) + 1;
                            return accumulator; // Return the accumulator for the next iteration
                        }, {});
                        const _arrDashboardData = [];
                        Object.entries(groupBy).map(([key, value]) => {
                            _arrDashboardData.push({title:key,value:value})
                        })
                        setArrDashboardData(_arrDashboardData);

                        setCategories(groupBy)
                        console.log(groupBy);
                        const styles = `display:grid;`
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