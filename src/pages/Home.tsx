import { RiLink } from '@remixicon/react';
import { ReactTyped } from "react-typed";
import StarsBackground from '../components/Stars/StarsBackground';
import { useState, useEffect } from 'react';

// import StarsBackground from '../components/Stars/StarsBackground'


interface HomeProps {
    theme: 'light' | 'dark'
}

const positioningRoles = [
    'Full-Stack Engineer',
    'Azure Data Scientist',
    'Reliability Engineer',
];

const projects = [{
    platform: 'web',
    img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/eventflow-screely.png',
    title: 'Event Flow',
    category: 'logistic',
    git_link: 'https://github.com/tflinch/event-flow-frontend'
}, {
    platform: 'web',
    img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/thelasticey-screely.png',
    title: 'The Last Icey',
    category: 'game',
    git_link: 'https://github.com/tflinch/The-Last-Icey'
}
    , {
    platform: 'web',
    img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/spoiledpotato-screely.png',
    title: 'Spoiled Potato',
    category: 'entertainment',
    git_link: 'https://github.com/tflinch/SpoiledPotato'
}
    , {
    platform: 'web',
    img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/dailypoints-screely.png',
    title: 'Daily Points',
    category: 'e-commerce',
    git_link: 'https://github.com/tflinch/Daily-Points'
}
    , {
    platform: 'mobile',
    img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/weathersection.jpeg',
    title: 'Weather Section',
    category: 'weather',
    git_link: 'https://github.com/ejspriggs/fireteamproject'
}
]

const Home: React.FC<HomeProps> = ({ theme }) => {
    const [filterPlatform, setFilterPlatform] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filteredProjects, setFilteredProjects] = useState(projects);

    const filterCards = (platform: string, category: string) => {
        const newFilteredProjects = projects.filter((project) => {
            const platformMatch =
                platform === 'all' || project.platform.toLowerCase() === platform.toLowerCase();
            const categoryMatch =
                category === 'all' || project.category.toLowerCase() === category.toLowerCase();
            return platformMatch && categoryMatch;
        });
        setFilteredProjects(newFilteredProjects);
    };

    const handleFilterChange = (newPlatform: string, newCategory: string) => {
        if (!document.startViewTransition) {
            setFilterPlatform(newPlatform);
            setFilterCategory(newCategory);
            filterCards(newPlatform, newCategory);
        } else {
            document.startViewTransition(() => {
                setFilterPlatform(newPlatform);
                setFilterCategory(newCategory);
                filterCards(newPlatform, newCategory);
            });
        }
    };

    useEffect(() => {
        filterCards(filterPlatform, filterCategory);
    }, [filterPlatform, filterCategory]);

    return (
        <main className={theme}>
            <section className="hero section" data-padding="compact">
                <StarsBackground theme={theme}></StarsBackground>
                <h1>Hi, I'm Tommy.</h1>
                <ReactTyped
                    strings={positioningRoles}
                    typeSpeed={60}
                    backSpeed={50}
                    loop
                    style={{ fontSize: '2rem' }}
                />
                <p>Building reliable systems and the data pipelines that watch them.</p>
            </section>
            <section className="section">
                <div className="wrapper">
                    <div className="sub_wrapper">
                        <h2>Featured Projects</h2>
                        <div className="flex-group">
                            <label htmlFor="platform" className="visually-hidden">Platform</label>
                            <select
                                name="platform"
                                id="platform"
                                onChange={(e) => handleFilterChange(e.target.value, filterCategory)}
                            >
                                <option value="all">All platforms</option>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                            </select>
                            <label htmlFor="category" className="visually-hidden">Category</label>
                            <select
                                name="category"
                                id="category"
                                onChange={(e) => handleFilterChange(filterPlatform, e.target.value)}
                            >
                                <option value="all">All categories</option>
                                <option value="e-commerce">E-Commerce</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="game">Game</option>
                                <option value="logistic">Logistic</option>
                                <option value="weather">Weather</option>
                            </select>
                        </div>
                    </div>
                    <article className="equal-columns" data-columns="three">
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
                                        <a href={project.git_link} className="projects__button button button__small">
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
    );
};

export default Home;
