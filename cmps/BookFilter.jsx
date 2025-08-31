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

    const { txt, price, isOnSale , isVintage, readerLevel } = filterByToEdit
    return (
        <section className="car-filter">
            {/* <pre>{JSON.stringify(filterByToEdit, null, 2)}</pre> */}

            <fieldset >
                <legend>Filter Books</legend>

                <form onSubmit={onSubmitFilter} style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                    <div style={{marginBottom:'5px'}}>
                        <label style={{width:'100px',display:'inline-block'}} htmlFor="txt">Book Name: </label>
                        <input value={txt} onChange={handleChange}
                            type="text" placeholder="By Book Name" id="txt" name="txt"
                        />
                    </div>
                    <div style={{marginBottom:'5px'}}>
                        <label style={{width:'100px',display:'inline-block'}} htmlFor="price">Price: &nbsp;</label>
                        <input value={price} onChange={handleChange}
                            type="number" placeholder="By Price" id="price" name="price"
                        />
                    </div>
                    
                    
                    
                    <div style={{marginBottom:'5px'}}>
                    <label style={{width:'100px',display:'inline-block'}} htmlFor="isOnSale">On Sale: &nbsp;</label>
                    <input value={isOnSale} onChange={handleChange}
                        type="checkbox"  id="isOnSale" name="isOnSale"
                    />
                    </div>
                    
                    <div>
                        <label  style={{width:'100px',display:'inline-block'}} htmlFor="isVintage">Vintage: &nbsp;</label>
                        <input value={isVintage} onChange={handleChange}
                            type="checkbox"  id="isVintage" name="isVintage"
                        />
                    </div>
                </div>
                
                
                
                <fieldset style={{width:'150px'}}>
                    <legend>Reader Level:</legend>
                    <div>
                    <input type="radio" id="all" name="readerLevel" value="all"
                        checked={readerLevel === 'all'}
                        onChange={handleChange}/>
                    <label for="all">All</label>
                    </div>
                    <div>
                       <input type="radio" id="light" name="readerLevel" value="light"
                    checked={readerLevel === 'light'}
                    onChange={handleChange} />
                <label htmlFor="light">Light</label>
                    </div>
                    <div>
                    <input type="radio" id="descent" name="readerLevel" value="descent"
                        checked={readerLevel === 'descent'}
                        onChange={handleChange}/>
                    <label for="descent">Descent</label>
                    </div>
                    <div>
                    <input type="radio" id="serious" name="readerLevel" value="serious"
                        checked={readerLevel === 'serious'}
                        onChange={handleChange}/>
                    <label for="serious">Serious </label>
                    </div>
                </fieldset>


                <button hidden>Set Filter</button>
            </form>

            </fieldset>
            
        </section>
    )
}