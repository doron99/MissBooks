const { useState, useEffect } = React
const { Outlet, Link, NavLink } = ReactRouterDOM
export function AboutUs() {
    return (
        <section className="home">
            
            <section className="page-header-container w-90">
                <div style={{display:'flex',alignItems:'center'}}>
                    <h1>About Us</h1>
                    <img 
                    src="assets/svgs/users.svg" 
                    alt="Tag Icon" 
                    className="icon-color-clr2"
                    style={{width:'40px',height:'40px',marginLeft:'5px'}} />
                </div>
                 <h2>Our Story</h2>
                 <p>Founded with a passion for storytelling and community, our bookstore has been a cozy corner for book lovers since day one. What started as a small local shop has grown into a vibrant space where readers of all ages come to discover, connect, and get inspired.</p>
            </section>
            <div className="row w-90" style={{margin:'auto'}}>
                <section className="col-md-6">
                    <h2>What We Believe</h2>
                    <p>We believe books have the power to educate, entertain, and transform lives. Our mission is to make reading accessible, enjoyable, and meaningful for everyone — from curious kids to lifelong learners.</p>
                </section>

                <section className="col-md-6">
                    <h2>Why Choose Us</h2>
                    <p>Whether you're searching for the latest bestseller, a rare classic, or just a quiet place to explore, we’re here to help. With personalized recommendations, friendly service, and a carefully curated collection, we’re more than just a bookstore — we’re your reading partner.</p>
                </section>

               
            </div> 
            <div style={{width: '90%',margin: 'auto'}}>
                <nav className="app-header  main-layout " style={{width:'400px',display:'flex'}}>
                    <NavLink style={{padding:'10px'}} to="/about/team">Team</NavLink>
                    <NavLink style={{padding:'10px'}} to="/about/goal">Goal</NavLink>
                </nav>
                    <Outlet />

            </div>
            
        </section>

       
    )
}