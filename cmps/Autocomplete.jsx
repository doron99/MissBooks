const { useState, useEffect,useRef } = React
import {FloatTextInput} from './FloatTextInput.jsx'
import { debounce } from "../services/util.service.js"
import { bookService } from '../services/book.service.js';
import { googleBookService } from '../services/google-book.service.js';

//todo: finish
export function Autocomplete({ onSuggestionSelect }) {
    const [txt,setTxt] = useState('');
    const [results,setResults] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const suggestionsRef = useRef(null);

    const onSetSearch = (txt) => {
        console.log('happend')
        googleBookService.get(txt).then(res => {
            console.log(res);
            if (res.length > 0) {
                setResults(res)
                toggleSuggestions();
            } else {
                console.log('remove listener')
                document.removeEventListener('mousedown', handleClickOutside);
            }
            
        })
        
        
    }
    const handleClickOutside = (event) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
            setIsOpen(false); // Close suggestions if clicked outside
        }
    };

    const handleRowClick = (row) => {
        setIsOpen(false); // Close suggestions on row click
        onSuggestionSelect({row:row});
        // Optionally, you can handle the selected suggestion here
    };

    useEffect(() => {
        if (isOpen) {
            // Add event listener for clicks outside the suggestions
            document.addEventListener('mousedown', handleClickOutside);
            console.log('add listener')
        } else {
            // Clean up the event listener when suggestions are closed
            console.log('remove listener')
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleSuggestions = () => {
        setIsOpen(true); // Open suggestions on input focus
    };

    const onSetSearchDebounce = useRef(debounce(onSetSearch, 1000)).current

    useEffect(() => {
        onSetSearchDebounce(txt)
    }, [txt])
    
    //if (!txt || txt.length === 0) return null;

    const handleChangeNew = (value,txtInputId) => {
        setTxt(value);

        
    };
    const style = {
        position:'absolute',
        background: 'deepskyblue',
        zIndex: '1000',
        left: '0',
        top: '0',
        margin:'0'
    }
    const suggestions = isOpen 
    ? <div style={{position:'relative'}}>
                <ul className='autocomplete-suggestions' ref={suggestionsRef}>
                {results.map((res, index) => (
                    <li className='autocomplete-suggestions-li' key={index} onClick={() => handleRowClick(res)}>
                        {res.title} <span>+</span>
                    </li>
                ))}
            </ul>
        </div>
    : null
    return (
        <div style={{position:'relative'}}>
            
            <FloatTextInput 
            id="txtSearch"
            txt={txt} 
            label="search book" 
            placeholder="Autocomplete"
            onChange={handleChangeNew}  />
            {suggestions}
            
        </div>
        
    )

}
