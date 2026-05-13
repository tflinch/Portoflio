import { Link, NavLink } from 'react-router-dom';
import { RiMoonFill, RiSunFill, RiMenuLine, RiMenuFold2Line } from '@remixicon/react';
import './navbar.css'
import { useState } from 'react';

interface NavbarProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const themeLabel = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
    const themeIcon = theme === 'light'
        ? <RiMoonFill size={26} color='black' className='my-icon' />
        : <RiSunFill size={26} color='white' className='my-icon' />;

    return (
        <header className={`site-header ${theme}`}>
            <div className="wrapper" data-width='wide' data-padding='compact'>
                <div className="site-header__inner">
                    <Link to="/" className='title'> <h1>Tommy Flinch</h1></Link>
                    <div className="header-controls" data-menu-open={menuOpen ? 'true' : 'false'}>
                        <button
                            type="button"
                            className="icon-button"
                            onClick={switchTheme}
                            aria-label={themeLabel}
                        >
                            {themeIcon}
                        </button>
                        <button
                            type="button"
                            className="icon-button"
                            onClick={toggleMenu}
                            aria-controls="primary-nav"
                            aria-expanded={menuOpen}
                            aria-label="Toggle menu"
                        >
                            {menuOpen
                                ? <RiMenuFold2Line size={26} className='my-icon' />
                                : <RiMenuLine size={26} className='my-icon' />}
                        </button>
                    </div>
                    <nav id='primary-nav' className={`primary-navigation ${theme}`}>
                        <ul>
                            <li><NavLink to="/experience">Experience</NavLink></li>
                            <li><Link to="/#projects">Projects</Link></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li>
                                <button
                                    type="button"
                                    className="icon-button"
                                    onClick={switchTheme}
                                    aria-label={themeLabel}
                                >
                                    {themeIcon}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;