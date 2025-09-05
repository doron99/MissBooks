const { useState, useEffect } = React
//todo: finish
export function FloatTextInput({ id , type='text',txt = '', label = '...' , palceholder = '',style={}, onChange }) {
    const [inputValue, setInputValue] = useState(txt);
    useEffect(() => {
        setInputValue(txt); // Update state when txt prop changes
    }, [txt]);
    
    

    const handleChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue,id); // Send the new value to the parent component
    };


    
    return (
        <div style={style} className="float-text-input ">
            <label htmlFor="floatField1 " style={{background:'transparent'}}>{label}</label>
            <input type={type}  placeholder={palceholder} style={{background:'transparent'}}
                value={inputValue}
                onChange={handleChange} />
        </div>
    )

}