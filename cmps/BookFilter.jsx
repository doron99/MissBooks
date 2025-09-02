const { useState, useEffect } = React
import {SvgIcon} from "../cmps/SvgIcon.jsx"
import {FloatTextInput} from "../cmps/FloatTextInput.jsx"
export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('target',target)
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
    const handleChangeNew = (newValue,txtInputId) => {
        //setTxt(newValue); // Update the state with the new value
        let field = '';
        if (txtInputId == 'txtBookNameFilter') {
            field = 'txt';
        } else if (txtInputId == 'txtPriceFilter') {
            field = 'price';
        }
                
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: newValue }))

        
    };

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    const iconSvgStyle = {
            width:'20px',
            height:'20px',
            display:'inline-block'
        }
    const { txt, price, isOnSale , isVintage, readerLevel, isNew } = filterByToEdit
    return (
        <section  style={{width:'100%'}}>
            {/* <pre>{JSON.stringify(filterByToEdit, null, 2)}</pre> */}

            <fieldset className="car-filter" style={{maxWidth:'630px',margin:'auto'}} >
                <legend className="car-filter-legend">
                    <div style={{display:'flex',alignItems:'center'}}>
                        <span style={{display:'inline-block'}}>Filter Books</span>
                        <SvgIcon iconName='filter' style={iconSvgStyle}/>
                    </div>
                    </legend>

                <form className="car-filter-form" onSubmit={onSubmitFilter} >
                
                <div>
                    <div style={{marginBottom:'5px'}}>
                        {/* <label style={{width:'100px',display:'inline-block'}} htmlFor="txt">Book Name: </label>
                        <input value={txt} onChange={handleChange}
                            type="text" placeholder="By Book Name" id="txt" name="txt"
                        />
                        <br/> */}
                        <FloatTextInput 
                        id="txtBookNameFilter"
                        txt={txt} 
                        label="Book Name" 
                        placeholder="Book Name"
                        onChange={handleChangeNew}  />
                    </div>
                    <div style={{marginBottom:'5px'}}>
                        {/* <label style={{width:'100px',display:'inline-block'}} htmlFor="price">Price: &nbsp;</label>
                        <input value={price} onChange={handleChange}
                            type="number" placeholder="By Price" id="price" name="price"
                        /> */}
                        <FloatTextInput 
                        id="txtPriceFilter"
                        txt={txt} 
                        label="Price" 
                        placeholder="Price"
                        onChange={handleChangeNew}  />
                    </div>
                    
                    
                    
                    
                </div>
                
                <div>
                    <div style={{marginBottom:'5px'}}>
                        <label style={{width:'100px',display:'inline-block'}} htmlFor="isOnSale">On Sale: &nbsp;</label>
                        <input value={isOnSale} onChange={handleChange}
                            type="checkbox"  id="isOnSale" name="isOnSale"
                        />
                    </div>
                    
                    <div style={{marginBottom:'5px'}}>
                        <label  style={{width:'100px',display:'inline-block'}} htmlFor="isVintage">Vintage: &nbsp;</label>
                        <input value={isVintage} onChange={handleChange}
                            type="checkbox"  id="isVintage" name="isVintage"
                        />
                    </div>
                    <div>
                        <label  style={{width:'100px',display:'inline-block'}} htmlFor="isNew">New: &nbsp;</label>
                        <input value={isNew} onChange={handleChange}
                            type="checkbox"  id="isNew" name="isNew"
                        />
                    </div>
                </div>
                
                
                <fieldset style={{width:'150px'}}>
                    <legend>Reader Level:</legend>
                    <div>
                    <input type="radio" id="all" name="readerLevel" value="all"
                        checked={readerLevel === 'all'}
                        onChange={handleChange}/>
                    <label htmlFor="all">All</label>
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
                    <label htmlFor="descent">Descent</label>
                    </div>
                    <div>
                    <input type="radio" id="serious" name="readerLevel" value="serious"
                        checked={readerLevel === 'serious'}
                        onChange={handleChange}/>
                    <label htmlFor="serious">Serious </label>
                    </div>
                </fieldset>


            </form>

            </fieldset>
            
        </section>
    )
}