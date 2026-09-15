import React from 'react'
import Navber from '../components/Navber'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import FeaturedBooks from './FeaturedBooks'
import Books from './Books'
import About from '../components/About'

const Home = () => {
    return (
        <>
            <Hero />
            <Books />
            <main>

            </main>
            <About />
            <Footer />
        </>
    )
}

export default Home