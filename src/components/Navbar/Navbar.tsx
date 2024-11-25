import { Link, NavLink, } from 'react-router-dom';
import { RiMoonFill, RiSunFill, RiMenuLine, RiMenuFold2Line } from '@remixicon/react';
import './navbar.css'
import { useState } from 'react';


interface NavbarProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void; // function that returns void
}



const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, }) => {
    const [menuOpen, setMenuOpen] = useState(false)


    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <header className={`site-header ${theme}`}>
            <div className="wrapper" data-width='wide' data-padding='compact'>
                <div className="site-header__inner">
                    <Link to="/" className='title'> <h1>Tommy Flinch</h1></Link>
                    <div aria-controls="primary-nav" aria-expanded={menuOpen ? 'true' : 'false'}>
                        <span className='visually-hidden'>Menu</span>
                        {menuOpen ? <RiMenuFold2Line size={26} className={`my-icon`} onClick={toggleMenu} /> : <RiMenuLine size={26} className={`my-icon`} onClick={toggleMenu} />}
                        {theme == 'light' ? <RiMoonFill size={26} color='black' className='my-icon' onClick={switchTheme} /> : <RiSunFill size={26} color='white' className='my-icon' onClick={switchTheme} />}
                    </div>
                    <nav id='primary-nav' className={`primary-navigation ${theme}`}>
                        <ul>
                            <li><NavLink to="/Experience">Experience</NavLink></li>

                            <li><NavLink to="/About">About</NavLink></li>
                            <li><Link to="/contact">Contact</Link></li>

                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    )
}

export default Navbar;