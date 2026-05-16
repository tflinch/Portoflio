import { RiCss3Line, RiGitRepositoryLine, RiHtml5Line, RiJavascriptLine, RiReactjsLine, RiDatabase2Line, RiNodejsLine, RiCloudLine, RiFirebaseLine, RiLineChartLine, RiBrainLine } from '@remixicon/react';
import StarsBackground from '../components/Stars/StarsBackground.tsx';

interface aboutProps {
    theme: 'light' | 'dark';
}

const About: React.FC<aboutProps> = ({ theme }) => {
    return (
        <main className={theme}>
            <section className="section">
                <StarsBackground theme={theme} />
                <div className="wrapper" data-width="wide">
                    <div className="bento-grid">
                        <div className="bento-tile bento-tile--photo">
                            <img
                                className="about-image"
                                src="https://port-images-bucket.s3.us-east-1.amazonaws.com/img/tommy-flinch.JPG"
                                alt="man smiling for a candid photo"
                            />
                        </div>
                        <div className="bento-tile bento-tile--bio flow font-family-basic">
                            <h2>Hi!👋🏾</h2>
                            <p className="about_content">
                                I’m Tommy Flinch — a software engineer concentrating in reliability, with a passion for the clean energy industry. After four years at Accenture building software for robotic platforms and cloud infrastructure, I’m joining NextPower as Power Reliability & Monitoring Engineer II to lead monitoring and uptime across an operating solar portfolio.
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
                        <div className="bento-tile bento-tile--currently">
                            <h2>Currently</h2>
                            <p>
                                Azure Data Scientist Associate (DP-100, April 2026). Preparing for the NextPower transition while sharpening Python, Azure ML, and time-series monitoring for the renewables space.
                            </p>
                        </div>
                        <div className="bento-tile bento-tile--stats">
                            <h2>By the Numbers</h2>
                            <p>8+ Years of Work</p>
                            <p>5+ Satisfied Customers</p>
                        </div>
                        <div className="bento-tile bento-tile--skills">
                            <h2>Skills</h2>
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
                                            <h3 className="skills__name">AWS</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="skills__group">
                                    <div className="skills__data">
                                        <RiBrainLine />
                                        <div>
                                            <h3 className="skills__name">Azure ML</h3>
                                            <span className="skills__level">Advance</span>
                                        </div>
                                    </div>
                                    <div className="skills__data">
                                        <RiLineChartLine />
                                        <div>
                                            <h3 className="skills__name">Observability</h3>
                                            <span className="skills__level">Intermediate</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
