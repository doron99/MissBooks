const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('target',target.value)
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    // function handleTxtChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    // }


    const { txt, price } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Book Name: </label>
                <input value={txt} onChange={handleChange}
                    type="text" placeholder="By Book Name" id="txt" name="txt"
                />
                <br/>
                <br/>
                <label htmlFor="price">Price: &nbsp;</label>
                <input value={price} onChange={handleChange}
                    type="number" placeholder="By Price" id="price" name="price"
                />

                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}