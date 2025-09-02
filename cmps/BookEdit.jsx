import { BookPreview } from "./BookPreview.jsx"
import { bookService } from "../services/book.service.js"
import { FloatTextInput } from "../cmps/FloatTextInput.jsx"

const { useState, useEffect } = React

export function BookEdit({ state, givenBook, onClose }) {

    const [book, setBook] = useState({title:'',price:''})

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
        } else if (txtInputId == 'txtPrice') {
            field = 'price';
        }
        setBook(prevBook => ({
            ...prevBook,
            [field]: value,
        }));

        
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
        resetAllFields();
        const newBookEntityWithoutId = bookService.createBook();
        newBookEntityWithoutId.title = book.title;
        newBookEntityWithoutId.listPrice.amount = book.price;
        newBookEntityWithoutId.thumbnail = "assets/svgs/book-cover.svg"

        bookService.save(newBookEntityWithoutId).then(res => {
            console.log('addedBook1111', res)
            onClose({book: res});
        });
        
    }

    const resetAllFields = () => {
        setBook({title:'',price:''})
    }

    const onInternalClose = () => {
        resetAllFields();
        onClose();

    }
    //---------- state 1 ---------//
    if (state == 'hidden') return null;
    //---------- state 2 ---------//
    else if (state == 'add') {
        return (
            <div className="modal-backdrop" >
                <div className="modal" >
                    <button className="buttonX" onClick={() => onInternalClose()}>x</button>
                    {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}

                    <form onSubmit={onSubmitAddBook}>
                        <h2>Add new book</h2>
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
                        txt={book.price} 
                        label="Price" 
                        placeholder="Price"
                        onChange={handleChangeNew}  />
                       
                        <br/><br/>
                        <button type="submit">Add</button>
                    </form>
                    {/* <div className="watcher-add-section d-flex" onSubmit={handleSubmit}>
                        <div style={{paddingTop:'30px'}}>
                            <div >
                                <input placeholder='watcher name' type="text" value={name} onChange={handleNameChange} required />
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Movies</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies.map((movie, index) => (
                                    <tr key={index}>
                                    <td>
                                        <input
                                        type="text"
                                        value={movie.movie}
                                        onChange={(e) => handleMovieChange(index, e.target.value)}
                                        required
                                        />
                                    </td>
                                    <td>
                                        {index === movies.length - 1 && ( // Show "+" button only in the last row
                                        <button type="button" onClick={addMovie}>+</button>
                                        )}
                                        {index < movies.length - 1 &&
                                            <button type="button" onClick={() => removeMovie(index)}>-</button>
                                        }
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button type="button" onClick={handleSubmit}>Add Watcher</button>
                        </div>
                    </div> */}
                </div>
            </div>
            
        );
    //---------- state 3 ---------//
    } else {
        return (
        <div className="modal-backdrop">
            <div className='modal watcher-dialog'>
                <button className="buttonX" type='button' onClick={() => onClose()}>x</button>
                {/* <div className="d-flex">
                    <h2>{watcher.fullname}</h2>

                    <ul>
                        {watcher.movies.map(movie => {
                            return <li key={movie}>{movie}</li>
                        })}
                    </ul>
                </div> */}
               
            </div>
        </div>
        
    )
    }
}