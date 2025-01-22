import { RiCss3Line, RiGitRepositoryLine, RiHtml5Line, RiJavascriptLine, RiReactjsLine, RiDatabase2Line, RiNodejsLine, RiCloudLine, RiFirebaseLine } from '@remixicon/react';
import { useState, useEffect } from 'react';
import { getContributions } from '../services/GitStats.ts';
import StarsBackground from '../components/Stars/StarsBackground.tsx';

interface aboutProps {
    theme: 'light' | 'dark';
}

interface ContributionCalendar {
    colors: string[];
    totalContributions: number;
    weeks: {
        contributionDays: {
            color: string;
            contributionCount: number;
            date: string;
            weekday: number;
        }[];
        firstDay: string;
    }[];
}

interface GitHubUserContributions {
    data: {
        user: {
            name: string;
            contributionsCollection: {
                contributionCalendar: ContributionCalendar;
            };
        };
    };
}

const About: React.FC<aboutProps> = ({ theme }) => {
    const [contributions, setContributions] = useState<GitHubUserContributions | null>(null);

    useEffect(() => {
        const fetchDefaultContributions = async () => {
            try {
                const data = await getContributions();
                setContributions(data);
            } catch (error) {
                console.error('Error fetching contributions:', error);
            }
        };

        fetchDefaultContributions();
    }, []);

    return (
        <main className={theme}>
            <section className="section">

                <div className="wrapper" data-width="wide">
                    <div className="equal-columns" data-gap="large">
                        <div >
                            <img className="about-image" src="https://port-images-bucket.s3.us-east-1.amazonaws.com/img/tommy-flinch.JPG" alt="man smiling for a candid photo" />
                        </div>
                        <div className="flow font-family-basic">
                            <h2 className={theme}>Hi!👋🏾 </h2>
                            <p className="about_content">
                                I’m Tommy Flinch, a passionate software engineer and creative problem solver based in New York. My work bridges the gap between innovative technology and impactful design, with a focus on creating scalable, user-centric digital solutions. Whether I’m developing back-end systems or crafting seamless user interfaces, I strive to deliver meaningful experiences that leave a lasting impact.
                            </p>
                            <p className="about_content">
                                Throughout my career, I’ve had the privilege of contributing to projects that challenge me to combine technical expertise with creative thinking. From leading the development of a fire alert system leveraging geolocation and Leaflet.js, to building dynamic APIs for robotic automation, I’ve consistently embraced opportunities to expand my skill set and deliver solutions that address real-world challenges.
                            </p>
                            <p className="about_content">
                                My journey in technology has also been shaped by a love for learning and mentorship. I’ve worked on projects that demanded collaboration across disciplines, balancing the needs of designers, engineers, and stakeholders to stay within scope while ensuring quality. From accessibility testing to unit testing, these experiences taught me the importance of meticulous attention to detail and fostering teamwork to achieve shared goals.
                            </p>
                            <p className="about_content">
                                Beyond coding, I am deeply committed to empowering others through technology. Whether mentoring robotics teams or collaborating with nonprofits to teach full stack engineering education, I strive to inspire the next generation of innovators. Technology has the power to change lives, and I’m dedicated to making it accessible to everyone, one project at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="wrapper" data-width="narrow">
                    <div className="equal-columns" data-auto="none">
                        <div className="card" data-background='grey'>
                            <h2 data-aligntment="center">Stats</h2>
                            <p>8+ Years of Work</p>
                            <p>{contributions ? `${contributions}+ Contributions This Year` : 'Loading Contributions...'}</p>
                            <p>5+ Satisfied Customers</p>
                        </div>
                        <div className="card" data-overflow='none' data-background='grey'>
                            <h2 data-aligntment="center">Skills</h2>
                            <div className="skills__box">
                                <div className="skills__group">
                                    <div className="skills__data">
                                        <RiHtml5Line className="my-icon" />
                                        <div>
                                            <h3 className="skills__name">HTML</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiCss3Line />
                                        <div>
                                            <h3 className="skills__name">CSS</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiJavascriptLine />
                                        <div>
                                            <h3 className="skills__name">JS</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="skills__group">
                                    <div className="skills__data">
                                        <RiReactjsLine />
                                        <div>
                                            <h3 className="skills__name">React</h3>
                                            <span className="skills__level">Intermediate</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <img className="icon" src="https://port-images-bucket.s3.us-east-1.amazonaws.com/icons/python.png" alt="python logo" />
                                        <div>
                                            <h3 className="skills__name">Python</h3>
                                            <span className="skills__level">Intermediate</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiGitRepositoryLine />
                                        <div>
                                            <h3 className="skills__name">Git</h3>
                                            <span className="skills__level">Intermediate</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="skills__group">
                                    <div className="skills__data">
                                        <img className="icon" src="https://port-images-bucket.s3.us-east-1.amazonaws.com/icons/php-fill.png" alt="python logo" />
                                        <div>
                                            <h3 className="skills__name">PHP</h3>
                                            <span className="skills__level">Basic</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiDatabase2Line />
                                        <div>
                                            <h3 className="skills__name">MySQL</h3>
                                            <span className="skills__level">Intermediate</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiFirebaseLine />
                                        <div>
                                            <h3 className="skills__name">Firebase</h3>
                                            <span className="skills__level">Intermediate</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="skills__group">
                                    <div className="skills__data">
                                        <RiNodejsLine />
                                        <div>
                                            <h3 className="skills__name">Node Js</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiCloudLine />
                                        <div>
                                            <h3 className="skills__name">Cloud</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <StarsBackground theme={theme}></StarsBackground>
            </section>
        </main>
    );
};

export default About;
