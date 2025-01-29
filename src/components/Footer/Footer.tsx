import { RiGithubLine, RiLinkedinBoxLine, RiMailLine } from "@remixicon/react"

interface footerProps {
    theme: 'light' | 'dark'
}


const Footer: React.FC<footerProps> = ({ theme }) => {

    return (
        <footer className={`site-footer ${theme}`}>
            <a href="https://www.linkedin.com/in/tommy-flinch/">
                <RiLinkedinBoxLine />
            </a>
            <a href="https://github.com/tflinch">
                <RiGithubLine />
            </a>
            <a href="/contact">
                <RiMailLine />
            </a>


            <span className="footer__copy"> &#169; All rights reserved

            </span>

        </footer>
    )
}

export default Footer