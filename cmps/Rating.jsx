const { useState, useEffect } = React

export function Rating({ rating = null, onRateChanged }) {
    const [_rating, set_Rating] = useState(0);
    useEffect(() => {
        set_Rating(!rating ? 0 : rating)
    },[])
    const handleStarClick = (index) => {
        set_Rating(index + 1); // Set the rating based on the clicked star index
        onRateChanged(_rating)
    };

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
                    onClick={() => handleStarClick(index)}
                    style={{ color: index < _rating ? 'yellow' : 'gray',cursor:'pointer' }} // Change color based on rating
                >
                    ★
                </span>
            ))}
           
            </div>
           
       
        </div>
    )
}