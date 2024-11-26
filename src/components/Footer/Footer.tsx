
interface footerProps {
    theme: 'light' | 'dark'
}


const Footer: React.FC<footerProps> = ({ theme }) => {

    return (
        <footer className={`site-footer ${theme}`}>
            <span className="footer__copy"> &#169; All rigths reserved </span>
        </footer>
    )
}

export default Footer