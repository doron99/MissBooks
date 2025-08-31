const { useState, useEffect } = React

export function HomePage() {
    return (
    <section className="home">
        
        <section className="page-header-container w-90">
            <div style={{display:'flex',alignItems:'center'}}>
                    <h1>Miss Books</h1>

                    <img 
                    src="assets/svgs/home.svg" 
                    alt="Tag Icon" 
                    className="icon-color-clr2"
                    style={{width:'40px',height:'40px',marginLeft:'5px'}} />
                </div>
            <h2>Explore Our Collection</h2>
            <p>Browse thousands of titles across all genres including fiction, non-fiction, mystery, romance, fantasy, science, history, and more. Whether you're a casual reader or a lifelong book lover, there's something here for everyone.</p>
        </section>
        <div className="row w-90" style={{margin:'auto'}}>
            <section className="col-md-4">
                <h2>New Arrivals</h2>
                <p>Stay up to date with the latest releases from top authors around the world. Our collection is updated weekly with fresh titles, so you'll never run out of options.</p>
            </section>

            <section className="col-md-4">
                <h2>Staff Picks</h2>
                <p>Not sure where to start? Check out our staff recommendations — carefully selected reads we think you'll love. From hidden gems to literary favorites, we've got you covered.</p>
            </section>

            <section className="col-md-4">
                <h2>Visit Us In-Store or Shop Online</h2>
                <p>Prefer to flip through pages in person? Visit our cozy store to experience books the old-fashioned way. Or enjoy fast, convenient online shopping with home delivery or in-store pickup.</p>
            </section>
        </div> 
    </section>
    )
}

