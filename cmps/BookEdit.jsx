import { BookPreview } from "./BookPreview.jsx"
// export function BookEdit({ isShow,book }) {

//     return (
//         <div>edit book</div>
//         // <ul className="flex-container ">
//         //     {books.map(book =>
//         //         <li key={book.id} className="flex-item list-style-none">
//         //             <BookPreview book={book} />
//         //             <section className="book-actions" >
//         //                 <button><Link to={`/book/${book.id}`}>Select</Link></button>
//         //                 {/* <button onClick={() => onSelect(book)}>Select</button> */}
//         //                 <button onClick={() => onRemove(book.id)}>x</button>
//         //             </section>
//         //         </li>
//         //     )}
//         // </ul>
//     )
// }
const { useState, useEffect } = React

export function BookEdit({ state, givenBook, onClose }) {
    // const [title, setTitle] = useState('');
    // const [price, setPrice] = useState('');
    const [book, setBook] = useState({title:'',price:''})

    // const handleNameChange = (e) => {
    //     setName(e.target.value);
    // };

    // const handleMovieChange = (index, value) => {
    //     const newMovies = [...movies];
    //     newMovies[index].movie = value;
    //     setMovies(newMovies);
    // };

    // const addMovie = () => {
    //     setMovies([...movies, { movie: '' }]);
    // };

    // const removeMovie = (index) => {
    //     if (movies.length == 1) return;
    //     const newMovies = movies.filter((_, i) => i !== index);
    //     setMovies(newMovies);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('User Name:', name);
    //     console.log('Movies:', movies);
    //     if ((name || '').length == 0) return;
    //     const objToReturn = {
    //         fullname: name,
    //         movies: movies.map(m => m.movie)
    //     }
    //     resetAllFields();
    //     onClose(objToReturn);
    // };
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
    // function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     onSetFilterBy(filterByToEdit)
    // }
    const resetAllFields = () => {
        //setName('')
        //setMovies([{ movie: '' }])
    }
    const onSubmitAdd = () => {
        resetAllFields();
        onClose();

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
                    {/* book:{book} */}
                    <button className="buttonX" onClick={() => onInternalClose()}>x</button>
                    {/* onSubmit={onSubmitAdd} */}
                                <pre>{JSON.stringify(book, null, 2)}</pre>

                    <form >
                        <label htmlFor="title">Book Name: </label>
                        <input value={book.title} onChange={handleChange}
                            type="text" placeholder="By Book Name" id="title" name="title"
                        />
                        <br/>
                        <label htmlFor="price">Price: &nbsp;</label>
                        <input value={book.price} onChange={handleChange}
                            type="number" placeholder="By Price" id="price" name="price"
                        />

                        <button hidden>Set Filter</button>
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