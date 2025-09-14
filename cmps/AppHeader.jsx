const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section>
                <h1 style={{fontSize:'1.2rem'}}>Miss Books</h1>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Books</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>

                </nav>
            </section>
        </header>
    )
}