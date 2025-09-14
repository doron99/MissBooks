import {FloatTextInput} from "../cmps/FloatTextInput.jsx"
import {Rating} from "./Rating.jsx"

import { showErrorMsg } from "../services/event-bus.service.js";

// const { Link,useNavigate,useParams } = ReactRouterDOM

const { useState, useEffect, useRef } = React

export function ReviewEdit({ onPostReview, style = {} }) {
    const ratingRef = useRef();

    const getDefaultReview = () => {
        return {fullname:'',rating:'',readAt:'2025-01-01'}
    }
    const [_review,set_Review] = useState(getDefaultReview())

    const handleChangeNew = (value,txtInputId) => {
        //console.log('handleChangeNew',value,txtInputId)
        let field = '';
        if (txtInputId == 'fullname') {
            field = 'fullname';
        } else if (txtInputId == 'rating') {
            field = 'rating';
        } else if (txtInputId == 'readAt') {
            field = 'readAt'
        }
        set_Review(prevFilter => ({ ...prevFilter, [field]: value }))

    };
    function onSubmitPostReview(event) {
        console.log('onSubmitPostReview',event)
        event.preventDefault()
        if (_review.fullname.length == 0 || _review.rating == 0) {
            showErrorMsg('fullname or star missing');
            return;
        }
        set_Review(getDefaultReview());
        resetRatingStars();
        onPostReview({
            review: _review
        })
    }
    // const resetData = () => {
    //     set_Review(getDefaultReview());
    // };
   
    const resetRatingStars = () => {
    if (ratingRef.current) {
      ratingRef.current.resetRatingStars();
    }
  };
    return (
        <div className="" 
        style={style}
        // style={{border:'1px solid black', width:'auto',marginBottom:'20px',
        //     marginRight:'auto',marginLeft:'auto',padding:'20px'
        // }}
        >

                        <pre>{JSON.stringify(_review, null, 2)}</pre>
                        <h2>Add Review</h2>
                        <form onSubmit={onSubmitPostReview}  >
                              <span
                                // className={num <= rating ? 'selected' : ''}
                                // key={num}
                                onClick={() => handleChangeNew(_review.rating,'rating')}>
                                ⭐
                            </span>
            
                            <div style={{display:'block',justifyContent:'',gap:'5px'}}>
                                <FloatTextInput style={{display:'block',alignSelf:'center'}}
                                    id="fullname"
                                    txt={_review.fullname} 
                                    label="full Name" 
                                    placeholder=""
                                    onChange={handleChangeNew}  />
                                    <br/>
                                <FloatTextInput style={{display:'block',alignSelf:'center'}}
                                    id="readAt"
                                    type="date"
                                    txt={_review.readAt} 
                                    label="read at" 
                                    placeholder=""
                                    onChange={handleChangeNew}  />
                                <Rating 
                                ref={ratingRef} 
                                readOnly={false} 
                                style={{display:'block',alignSelf:'center'}}  
                                onRateChanged={(event) => handleChangeNew(event, 'rating')}/>
                                
                                
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
                            
                            <button style={{display:'block',margin:'5px 0 0 0'}} type="submit">Post Review</button>
                        </form>
                          
                    </div>
    )
}