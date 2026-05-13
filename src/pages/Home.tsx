import { RiGithubLine, RiExternalLinkLine } from '@remixicon/react';
import { ReactTyped } from "react-typed";
import { Card, CardActions, CardContent, CardMedia, Chip, IconButton, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import StarsBackground from '../components/Stars/StarsBackground';
import { useState, useEffect } from 'react';

interface HomeProps {
    theme: 'light' | 'dark'
}

const positioningRoles = [
    'Full-Stack Engineer',
    'Azure Data Scientist',
    'Reliability Engineer',
];

interface Project {
    platform: 'web' | 'mobile';
    category: 'logistic' | 'game' | 'entertainment' | 'e-commerce' | 'weather';
    img: string;
    title: string;
    description: string;
    tech: string[];
    git_link: string;
    live_url?: string;
}

// TODO: update description, tech, and live_url per project as each one is
// restood up. Current copy is a placeholder draft.
const projects: Project[] = [
    {
        platform: 'web',
        category: 'logistic',
        img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/eventflow-screely.png',
        title: 'Event Flow',
        description: 'Event-management interface for organizers — schedules, attendees, and logistics in one view.',
        tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        git_link: 'https://github.com/tflinch/event-flow-frontend',
    },
    {
        platform: 'web',
        category: 'game',
        img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/thelasticey-screely.png',
        title: 'The Last Icey',
        description: 'Browser game with keyboard-driven action and original sprite art.',
        tech: ['JavaScript', 'HTML5 Canvas', 'CSS'],
        git_link: 'https://github.com/tflinch/The-Last-Icey',
    },
    {
        platform: 'web',
        category: 'entertainment',
        img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/spoiledpotato-screely.png',
        title: 'Spoiled Potato',
        description: 'Movie review aggregator with user-driven ratings and watchlist tracking.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB'],
        git_link: 'https://github.com/tflinch/SpoiledPotato',
    },
    {
        platform: 'web',
        category: 'e-commerce',
        img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/dailypoints-screely.png',
        title: 'Daily Points',
        description: 'Loyalty-rewards platform letting customers track and redeem daily points.',
        tech: ['React', 'Firebase', 'JavaScript'],
        git_link: 'https://github.com/tflinch/Daily-Points',
    },
    {
        platform: 'mobile',
        category: 'weather',
        img: 'https://port-images-bucket.s3.us-east-1.amazonaws.com/img/weathersection.jpeg',
        title: 'Weather Section',
        description: 'Fire-alert dashboard with geolocation overlays — team capstone built with Leaflet.js.',
        tech: ['React', 'Leaflet.js', 'OpenWeather API'],
        git_link: 'https://github.com/ejspriggs/fireteamproject',
    },
];

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

    const location = useLocation();
    useEffect(() => {
        if (!location.hash) return;
        const target = document.querySelector(location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

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
            <section className="section" id="projects">
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
                            <Card
                                key={project.git_link}
                                variant="outlined"
                                sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <CardMedia
                                    component="img"
                                    height={180}
                                    image={project.img}
                                    alt={`${project.title} screenshot`}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <Stack
                                        direction="row"
                                        spacing={0.5}
                                        useFlexGap
                                        flexWrap="wrap"
                                        sx={{ mt: 1.5 }}
                                    >
                                        {project.tech.map((t) => (
                                            <Chip key={t} label={t} size="small" />
                                        ))}
                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <IconButton
                                        href={project.git_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} on GitHub`}
                                        size="small"
                                    >
                                        <RiGithubLine />
                                    </IconButton>
                                    {project.live_url && (
                                        <IconButton
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit live ${project.title} site`}
                                            size="small"
                                        >
                                            <RiExternalLinkLine />
                                        </IconButton>
                                    )}
                                </CardActions>
                            </Card>
                        ))}
                    </article>
                </div>
            </section>
        </main>
    );
};

export default Home;
