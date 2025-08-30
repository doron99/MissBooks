const { useState, useEffect } = React

export function AboutUs() {
    return (
        <section className="home">
            <h2>AboutUs</h2>
            <section>
            <h2>Our Story</h2>
            <p>Founded with a passion for storytelling and community, our bookstore has been a cozy corner for book lovers since day one. What started as a small local shop has grown into a vibrant space where readers of all ages come to discover, connect, and get inspired.</p>
        </section>

        <section>
            <h2>What We Believe</h2>
            <p>We believe books have the power to educate, entertain, and transform lives. Our mission is to make reading accessible, enjoyable, and meaningful for everyone — from curious kids to lifelong learners.</p>
        </section>

        <section>
            <h2>Why Choose Us</h2>
            <p>Whether you're searching for the latest bestseller, a rare classic, or just a quiet place to explore, we’re here to help. With personalized recommendations, friendly service, and a carefully curated collection, we’re more than just a bookstore — we’re your reading partner.</p>
        </section>
       </section>
       
    )
}