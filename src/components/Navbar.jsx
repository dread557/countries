import React, { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Link } from 'react-router-dom'


const Navbar = () => {
    const { isLightTheme, toggleTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 88)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })
    return (
        <div className={sticky ? 'sticky' : 'navbar'} style={{ background: theme.bg, boxShadow: theme.bxSdw }}>
            <Link to='/' style={{ color: theme.txt }}><h1>Where in the word?</h1></Link>
            <button className='dark-mode-btn' style={{ color: theme.txt }} onClick={toggleTheme}>{isLightTheme ? '☾ Dark Mode' : '☾ Light Mode'}</button>
        </div>
    )
}

export default Navbar