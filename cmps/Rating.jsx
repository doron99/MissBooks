const { useState, useEffect,forwardRef,useImperativeHandle } = React

export const Rating = forwardRef(({rating = null, readOnly = true, onRateChanged}, ref) => {
    const [_rating, set_Rating] = useState(null);
    useEffect(() => {
        set_Rating(!rating ? 0 : rating)
    },[rating])
    const handleStarClick = (index) => {
        const curr = index + 1;
        set_Rating(curr); // Set the rating based on the clicked star index
        onRateChanged(curr)
    };
    const resetRatingStars = () => {
        console.log('resetRatingStars internal')
        set_Rating(0);
    }

    useImperativeHandle(ref, () => ({
        resetRatingStars,
    }));

  return (
        <div className="" >
            <div className="star-rating" style={{position:'relative'}}>
                 <div className="show-result" style={{position:'absolute',display:'none'}}>
                    {_rating} {_rating === 1 ? 'star' : 'stars!'}
                </div>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`star ${index < _rating ? 'active' : ''}`}
                    onClick={() => !readOnly && handleStarClick(index)}
                    style={{ color: index < _rating ? 'yellow' : 'gray',cursor:!readOnly?'pointer':'default' }} // Change color based on rating
                >
                    ★ 
                </span>
            ))}
           
            </div>
           
       
        </div>
    )
});