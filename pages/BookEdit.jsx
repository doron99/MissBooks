import { bookService } from "../services/book.service.js"
import { FloatTextInput } from "../cmps/FloatTextInput.jsx"
import { showErrorMsg } from "../services/event-bus.service.js";

const { Link,useNavigate,useParams } = ReactRouterDOM

const { useState, useEffect } = React

export function BookEdit({ }) {
    const navigate = useNavigate();
    const [book, setBook] = useState(null)
    const {bookId} = useParams()


    function getNewBook() {
        const newBook = bookService.createBook();
        newBook.title = '';
        newBook.listPrice.amount = '';
        newBook.thumbnail = "assets/svgs/book-cover.svg"

        return newBook;
    }
    useEffect(() => {
        if (bookId) {
            setBook(loadBook())
        } else {
            setBook(getNewBook());
        };
    },[])
    function loadBook() {
        bookService.get(bookId)
        .then(setBook)
        .catch(err => console.error(err));
    }
     function handleChange({ target }) {
        console.log('target',target)
        const field = target.name
        let value = target.value
        console.log('value',value)

        switch (target.type) {
            case 'number':
                //value = +value || ''

            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }
        ///const { name, value } = target;
        setBook(prevBook => ({
            ...prevBook,
            [field]: value,
        }));

        //setBook(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const handleChangeNew = (value,txtInputId) => {
        let field = '';
        if (txtInputId == 'txtTitle') {
            field = 'title';
            setBook(prevBook => ({
            ...prevBook,
            [field]: value,
        }));
        } else if (txtInputId == 'txtPrice') {
            field = 'price';
            //nested level
            setBook(prevBook => ({
            ...prevBook,
            listPrice: {
                ...prevBook.listPrice, 
                amount: value
            },
        }));
        }
    };
    function isFormValid() {
        if (book.title.length == 0 || book.price == '') {
            return false;
        }
        return true;
    }
    function onSubmitAddBook(ev) {
        ev.preventDefault();
        if (!isFormValid()) {
            alert('book name and price are mandatory fields')
            return;
        }

        bookService.save(book).then(res => {
            //console.log('addedBook1111', res)
            navigate('/book');
        }).catch(err => {
            console.error(err);
            showErrorMsg('error')
        });
        
    }
    if (!book) return <span>loading</span>
    const title = book.id ? 'Update book' : 'Add new book'

    const btnText = book.id ? 'Update' : 'Add'
        return (
            <div className="" >

                <button className="buttonX" ><Link to={`/book`}>Back</Link></button>
                {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}

                <form onSubmit={onSubmitAddBook}>
                    <h2>{title}</h2>
                    <FloatTextInput 
                        id="txtTitle"
                        txt={book.title} 
                        label="Book Name" 
                        placeholder="Book Name"
                        onChange={handleChangeNew}  />
                    
                    <br/>
                    <br/>
                    <FloatTextInput 
                    id="txtPrice"
                    type="number"
                    txt={book.listPrice.amount} 
                    label="Price" 
                    placeholder="Price"
                    onChange={handleChangeNew}  />
                    
                    <br/><br/>
                    <button type="submit">{btnText}</button>
                </form>
                  
            </div>
            
        );
}