import { RiLink } from '@remixicon/react';
import { ReactTyped } from "react-typed";
import StarsBackground from '../components/Stars/StarsBackground';
import { useState } from 'react';
import { platform } from 'os';
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
    platform: 'web',
    img: '../../src/assets/img/eventflow-screely.png',
    title: 'Event Flow',
    category: 'logistic'
}, {
    platform: 'web',
    img: '../../src/assets/img/thelasticey-screely.png',
    title: 'The Last Icey',
    category: 'game'
}
    , {
    platform: 'web',
    img: '../../src/assets/img/spoiledpotato-screely.png',
    title: 'Spoiled Potato',
    category: 'enterainment'
}
    , {
    platform: 'web',
    img: '../../src/assets/img/dailypoints-screely.png',
    title: 'Daily Points',
    category: 'e-commerce'
}
    , {
    platform: 'mobile',
    img: '../../src/assets/img/weathersection.jpeg',
    title: 'Weather Section',
    category: 'weather'
}
]

const project_card = projects.map((project) => {
    return (
        <div className="card" key={project.img}>
            <img src={project.img} alt="Project 1" className="projects__img" />
            <div className="projects__modal">
                <div>
                    <ul className='tag-list' role='list'>
                        <li data-platform={project.platform}>{project.platform}</li>
                        <li data-category={project.category}>{project.category}</li>
                    </ul>
                    <span className="projects__subtitle">{project.title}</span>
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
    const [filterPlatform, setFilterPlatform] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterPlatform(event.target.value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(event.target.value);
    };

    const filteredProjects = projects.filter((project) => {
        const platformMatch =
            filterPlatform === 'all' || project.platform.toLowerCase() === filterPlatform.toLowerCase();
        const categoryMatch =
            filterCategory === 'all' || project.category.toLowerCase() === filterCategory.toLowerCase();
        return platformMatch && categoryMatch;
    });

    return (
        <main className={theme}>
            <section className='hero section' data-padding='compact'>

                <StarsBackground theme={theme}></StarsBackground>

                <ReactTyped strings={textLines} typeSpeed={60} backSpeed={50} style={{ fontSize: '2rem' }} />

            </section>
            <section className='section'>
                <div className='wrapper'>
                    <h2>Featured Projects</h2>
                    <div className="flex-group">

                        <select name="platform" id="platform" onChange={handlePlatformChange}>
                            <option value="all">Type: All</option>
                            <option value="web">Web</option>
                            <option value="mobile">Mobile</option>
                        </select>
                        <select name='category' id='category' onChange={handleCategoryChange}>
                            <option value="all">Type: All</option>
                            <option value="e-commerce">E-Commerce</option>
                            <option value="enterainment">Entertainment</option>
                            <option value='game'>Game</option>
                            <option value='logistic'>Logistic</option>
                            <option value='weather'>Weather</option>
                        </select>
                    </div>
                    <article className='equal-columns' data-columns='three'>
                        {filteredProjects.map((project) => (
                            <div className="card" key={project.img}>
                                <img src={project.img} alt={project.title} className="projects__img" />
                                <div className="projects__modal">
                                    <div>
                                        <ul className="tag-list" role="list">
                                            <li data-platform={project.platform}>{project.platform}</li>
                                            <li data-category={project.category}>{project.category}</li>
                                        </ul>

                                        <h3 className="projects__title">{project.title}</h3>
                                        <a href="#" className="projects__button button button__small">
                                            <RiLink />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Home