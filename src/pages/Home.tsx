import { RiLink } from '@remixicon/react';
import { ReactTyped } from "react-typed";
import StarsBackground from '../components/Stars/StarsBackground';
// import StarsBackground from '../components/Stars/StarsBackground'


interface HomeProps {
    theme: 'light' | 'dark'
}

const textLines = [`Hi, I'm Tommy`,
    'A Fullstack Developer',
    'With a spark for usable and scalable applications',
    'Check out my work below.',
]

const projects = [{
    project: 'Web',
    img: '../../src/assets/img/project1.jpg',
    title: 'Payment Site'
}, {
    project: 'Web',
    img: '../../src/assets/img/project2.jpg',
    title: 'Payment Site'
}
    , {
    project: 'Web',
    img: '../../src/assets/img/project3.jpg',
    title: 'Payment Site'
}
    , {
    project: 'Web',
    img: '../../src/assets/img/project4.jpg',
    title: 'Payment Site'
}
    , {
    project: 'Web',
    img: '../../src/assets/img/project5.jpg',
    title: 'Payment Site'
}
]

const project_card = projects.map((project) => {
    return (
        <div className="card">
            <img src={project.img} alt="Project 1" className="projects__img" />
            <div className="projects__modal">
                <div>
                    <span className="projects__subtitle">{project.project}</span>
                    <h3 className="projects__title">{project.project}</h3>
                    <a href="#" className="projects__button button button__small">
                        <RiLink></RiLink>
                    </a>
                </div>
            </div>
        </div>
    )
})

const Home: React.FC<HomeProps> = ({ theme }) => {

    return (
        <main className={theme}>
            <section className='hero section' data-padding='compact'>

                <StarsBackground theme={theme}></StarsBackground>

                <ReactTyped strings={textLines} typeSpeed={60} backSpeed={50} />

            </section>
            <section className='section'>
                <div className='wrapper'>
                    <h2>Featured Projects</h2>
                    <article className='equal-columns'>
                        {project_card}
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Home