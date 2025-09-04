const { useState, useEffect } = React
//todo: finish
export function FloatTextInput({ id , type='text',txt = '', label = '...' , palceholder = '', onChange }) {
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
        <div  className="float-text-input ">
            <label htmlFor="floatField1 ">{label}</label>
            <input type={type}  placeholder={palceholder} 
                value={inputValue}
                onChange={handleChange} />
        </div>
    )

}