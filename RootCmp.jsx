
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <UserMsg />
                <main className="">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                         <Route path="/about" element={<AboutUs />}>
                            {/* <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} /> */}
                        </Route> 
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    
                </main>
                
            </section>
        </Router>
        
    )
} 