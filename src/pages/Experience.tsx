import { RiCheckboxCircleLine } from "@remixicon/react"

interface experienceProps {
    theme: 'light' | 'dark'
}

const Experience: React.FC<experienceProps> = ({ theme }) => {

    return (
        <main className={theme}>
            <section className="section" >
                <div className="wrapper" id="resume" data-width='wide'>
                    {theme === 'light' ? <h1 className={`${theme} work_title`}>Experience</h1> : <h1 className={`${theme} work_title dark`}>Experience</h1>}
                    <div className="resume__area">
                        <h2 className="resume__title">Accenture</h2>
                        <div className="resume__box">
                            <div className="resume__group">
                                <div className="resume__data">
                                    <div>
                                        <h3 className="resume__name">Senior Analyst, Software/Application/Cloud Technologies</h3>
                                        <span className="resume__level">February 2022 - Present  <RiCheckboxCircleLine /> </span>
                                    </div>
                                </div>
                                <p>
                                    Serve as team co-lead for a support team, overseeing development of software for innovative applications, implementing scalable infrastructure solutions, and fostering collaboration to deliver high-quality solutions
                                </p>
                                <ul>
                                    <li>
                                        Developed software and robotic automation solutions, including integration with Boston Dynamics’ robotic dog SDK using Python, expanding capabilities with Flask API endpoints for robot control
                                    </li>
                                    <li>
                                        Expanded automated mission capabilities for synchronous input/output from Neurosity headsets, integrating brain-computer interface features into robotic missions
                                    </li>
                                    <li>
                                        Designed and developed static HTML & Vanilla JS Proof of Concepts, cloud architected using AWS services (S3, CloudFront, API Gateway, Lambda, Secrets Manager)
                                    </li>
                                    <li>
                                        Spearheaded design and implementation of CI/CD pipelines using Azure Pipelines for efficient deployment and automation, enhancing project Proof of Concept with Azure tools
                                    </li>
                                    <li>
                                        Collaborated with developers and stakeholders to define project requirements, scaling applications using modern technology stacks to accommodate evolving business needs
                                    </li>
                                    <li>
                                        Provided full-stack development expertise, including both front-end and back-end services, to deliver comprehensive solutions that meet organizational goals
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="resume__area">
                        <h2 className="resume__title">BroadRidge</h2>
                        <div className="resume__box">
                            <div className="resume__group">
                                <div className="resume__data">
                                    <div>
                                        <h3 className="resume__name">ICS SRE Associate</h3>
                                        <span className="resume__level">March 2021 - February 2022</span>
                                    </div>
                                </div>
                                <p>
                                    Spearheaded management and development of scalable application operations, ensuring optimal performance and reliability in alignment with organizational objectives
                                </p>
                                <ul>
                                    <li>
                                        Designed and implemented robust disaster recovery plans and failovers for financial applications, mitigating risks and ensuring business continuity in event of system failures or disruptions
                                    </li>
                                    <li>
                                        Led efforts to measure and optimize system performance, proactively anticipating customer needs and driving continuous innovation to enhance capabilities and maintain competitive advantage
                                    </li>
                                    <li>
                                        Provided primary operational support and engineering expertise for multiple large, distributed software applications, demonstrating proficiency in troubleshooting and problem resolution
                                    </li>
                                    <li>
                                        Ensured compliance with SLA obligations by implementing comprehensive documentation and system design procedures, fostering transparency and accountability in service delivery
                                    </li>
                                    <li>
                                        Collaborated with developers and stakeholders to define project requirements, scaling applications using modern technology stacks to accommodate evolving business needs
                                    </li>
                                    <li>
                                        Leveraged advanced analytics techniques to gather and analyze metrics from operating systems and applications, facilitating performance tuning and fault identification to optimize system performance and reliability
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="resume__area">
                        <h2 className="resume__title">Freelance </h2>
                        <div className="resume__box">
                            <div className="resume__group">
                                <div className="resume__data">
                                    <div>
                                        <h3 className="resume__name">Consultant/Full Stack Developer</h3>
                                        <span className="resume__level">January 2019 - January 2020</span>
                                    </div>
                                </div>
                                <p>Worked as freelance consultant, collaborating with clients to identify technology needs, devise innovative solutions, and oversee project implementation to achieve strategic objectives</p>
                                <ul>
                                    <li>
                                        Led multiple client engagements, delivering tailored technology solutions to address business challenges and drive digital transformation, and advised clients on best practices and emerging technology trends
                                    </li>
                                    <li>
                                        Played pivotal role in project management, ensuring timely and budget-conscious delivery, while fostering strong client relationships and contributing to business development initiatives
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="resume__area">
                        <h2 className="resume__title">Accenture </h2>
                        <div className="resume__box">
                            <div className="resume__group">
                                <div className="resume__data">
                                    <div>
                                        <h3 className="resume__name">Senior Analyst, Cloud Migration & Imp </h3>
                                        <span className="resume__level">December 2017 - December 2019</span>
                                    </div>
                                </div>
                                <p>Led cloud migration projects, providing innovative solutions to complex technology challenges for clients, and spearheaded cloud infrastructure building initiatives, generating $10M</p>
                                <ul>
                                    <li>
                                        Successfully negotiated and finalized high-value agreements encompassing Data Center, Cloud, Network, and End User Services, establishing long-term partnerships, and driving business growth
                                    </li>
                                    <li>
                                        Demonstrated expertise in analyzing and addressing intricate technology challenges faced by clients, developing comprehensive solutions that optimized performance and efficiency
                                    </li>
                                    <li>
                                        Implemented strategic cost-saving measures, including operational streamlining and resource optimization, leading to a notable 15% reduction in overhead costs and bolstering financial sustainability
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <h2 className={`${theme} work_title`} data-padding='block-end'>Education & Personal Development</h2>
                    <div className="resume__area">
                        <h2 className="resume__title">Kingsborough Community College </h2>
                        <div className="resume__box">
                            <div className="resume__group">

                                <ul>
                                    <li>
                                        Associate of Science (AS) in Computer Science Information
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h2 className="resume__title">NPower </h2>
                        <div className="resume__box">
                            <div className="resume__group">

                                <ul>
                                    <li>
                                        Certificate, Cloud Development, AWS Solution Architect Associates
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <h2 className="resume__title">General Assembly   </h2>
                        <div className="resume__box">
                            <div className="resume__group">

                                <ul>
                                    <li>
                                        SEI Bootcamp
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Repeat other skills areas here */}
                </div>
            </section>
        </main>
    )
}

export default Experience