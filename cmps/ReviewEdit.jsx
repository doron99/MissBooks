import { BookPreview } from "./BookPreview.jsx"
import {FloatTextInput} from "../cmps/FloatTextInput.jsx"
import {Rating} from "./Rating.jsx"

import { showErrorMsg } from "../services/event-bus.service.js";

// const { Link,useNavigate,useParams } = ReactRouterDOM

const { useState, useEffect } = React

export function ReviewEdit({ }) {
    const [review,setReview] = useState({fullname:'',rating:'',readAt:'2025-01-01'})
    
    const handleChangeNew = (value,txtInputId) => {
        console.log('handleChangeNew',value,txtInputId)
        let field = '';
        if (txtInputId == 'fullname') {
            field = 'fullname';
        } else if (txtInputId == 'rating') {
            field = 'rating';
        } else if (txtInputId == 'readAt') {
            field = 'readAt'
        }
        setReview(prevFilter => ({ ...prevFilter, [field]: value }))

    };
    function onSubmitAddBook() {

    }
    function onRateChanged(rating) {
        console.log('onRateChanged',rating)
    }
    return (
        <div className="" style={{border:'1px solid black', width:'90%',marginBottom:'20px',marginRight:'auto',marginLeft:'auto',padding:'20px'}}
        >

                        <pre>{JSON.stringify(review, null, 2)}</pre>
                        <h2>Add Review</h2>
                        <form onSubmit={onSubmitAddBook}  >
                            <div style={{display:'flex',justifyContent:'',gap:'5px'}}>
                                <FloatTextInput style={{display:'block',alignSelf:'center'}}
                                    id="fullname"
                                    txt={review.fullname} 
                                    label="full Name" 
                                    placeholder="full Name"
                                    onChange={handleChangeNew}  />
                                <Rating style={{display:'block',alignSelf:'center'}}  onRateChanged={(event) => handleChangeNew(event, 'rating')}/>
                                
                                <FloatTextInput style={{display:'block',alignSelf:'center'}}
                                    id="readAt"
                                    type="date"
                                    txt={review.readAt} 
                                    label="read at" 
                                    placeholder="read at"
                                    onChange={handleChangeNew}  />
                                </div>
                            
                             {/* <input
                                style={{ padding: '7px', fontSize: '15px',display:'block',alignSelf:'center' }}
                                type="date"
                                id="start"
                                name="trip-start"
                                value={review.readAt}
                                min="2018-01-01"
                                max="2029-12-31"
                                onChange={(event) => handleChangeNew(event.target.value, 'readAt')} // Pass the event correctly
                            /> */}
                            
                            <button type="submit">Post Review</button>
                        </form>
                          
                    </div>
    )
}