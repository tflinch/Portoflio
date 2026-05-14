import { RiCheckboxCircleLine } from "@remixicon/react"

interface experienceProps {
    theme: 'light' | 'dark'
}

const Experience: React.FC<experienceProps> = ({ theme }) => {

    return (
        <main className={theme}>
            <section className="section" >
                <div className="wrapper" id="resume" data-width='wide'>
                    <div className="flow">
                        {theme === 'light' ? <h1 className={`${theme} work_title`}>Experience</h1> : <h1 className={`${theme} work_title dark`}>Experience</h1>}
                        <div className="timeline">
                            <div className="resume__area timeline__item">
                                <div className="timeline__date">
                                    <span className="resume__level">Starting 2026 <RiCheckboxCircleLine /></span>
                                </div>
                                <div className="timeline__content">
                                    <h2 className="resume__title">NextPower</h2>
                                    <div className="resume__box">
                                        <div className="resume__group">
                                            <div className="resume__data">
                                                <div>
                                                    <h3 className="resume__name">Power Reliability & Monitoring Engineer II</h3>
                                                </div>
                                            </div>
                                            {/* TODO: refine description and add bullets after starting the role. */}
                                            <p>
                                                Reliability and monitoring engineering across NextPower's operating solar portfolio — turning field telemetry into uptime improvements and data-driven asset-management decisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="resume__area timeline__item">
                                <div className="timeline__date">
                                    <span className="resume__level">February 2022 — Present <RiCheckboxCircleLine /></span>
                                </div>
                                <div className="timeline__content">
                                    <h2 className="resume__title">Accenture</h2>
                                    <div className="resume__box">
                                        <div className="resume__group">
                                            <div className="resume__data">
                                                <div>
                                                    <h3 className="resume__name">Senior Analyst, Software/Application/Cloud Technologies</h3>
                                                </div>
                                            </div>
                                            <p>
                                                Co-lead a software support team building robotic, cloud, and brain-computer-interface applications for client innovation programs.
                                            </p>
                                            <ul>
                                                <li>
                                                    Built Python + Flask API endpoints that drive missions on Boston Dynamics’ robotic dog (Spot).
                                                </li>
                                                <li>
                                                    Integrated Neurosity brain-computer-interface headsets into automated robotic missions for synchronous I/O.
                                                </li>
                                                <li>
                                                    Shipped client-facing proofs of concept on AWS (S3, CloudFront, API Gateway, Lambda, Secrets Manager) with vanilla-JS front-ends.
                                                </li>
                                                <li>
                                                    Built CI/CD pipelines in Azure DevOps to automate PoC deployment and remove manual handoffs.
                                                </li>
                                                <li>
                                                    Worked across the full stack — front-end, back-end services, and the cloud glue between them — to ship systems end-to-end.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="resume__area timeline__item">
                                <div className="timeline__date">
                                    <span className="resume__level">March 2021 — February 2022</span>
                                </div>
                                <div className="timeline__content">
                                    <h2 className="resume__title">BroadRidge</h2>
                                    <div className="resume__box">
                                        <div className="resume__group">
                                            <div className="resume__data">
                                                <div>
                                                    <h3 className="resume__name">ICS SRE Associate</h3>
                                                </div>
                                            </div>
                                            <p>
                                                Site Reliability Engineering across financial-services applications under strict SLAs.
                                            </p>
                                            <ul>
                                                <li>
                                                    Built DR plans and active-passive failovers for financial applications to keep business continuity through outages.
                                                </li>
                                                <li>
                                                    Profiled and tuned production systems to head off performance regressions before customers reported them.
                                                </li>
                                                <li>
                                                    First-line engineering support for several large, distributed financial applications — triage, root-cause, fix.
                                                </li>
                                                <li>
                                                    Owned SLA compliance through runbooks and design documentation that codified ops decisions.
                                                </li>
                                                <li>
                                                    Pulled OS and application telemetry into structured analyses for fault identification and capacity planning.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="resume__area timeline__item">
                                <div className="timeline__date">
                                    <span className="resume__level">January 2019 — January 2020</span>
                                </div>
                                <div className="timeline__content">
                                    <h2 className="resume__title">Freelance</h2>
                                    <div className="resume__box">
                                        <div className="resume__group">
                                            <div className="resume__data">
                                                <div>
                                                    <h3 className="resume__name">Consultant / Full Stack Developer</h3>
                                                </div>
                                            </div>
                                            <p>Independent consultant scoping and delivering technology projects for small-business clients.</p>
                                            <ul>
                                                <li>
                                                    Ran multiple client engagements end-to-end — discovery, build, and post-launch handoff.
                                                </li>
                                                <li>
                                                    Owned scope and budget on every engagement; earned repeat business from satisfied clients.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="resume__area timeline__item">
                                <div className="timeline__date">
                                    <span className="resume__level">December 2017 — December 2019</span>
                                </div>
                                <div className="timeline__content">
                                    <h2 className="resume__title">Accenture</h2>
                                    <div className="resume__box">
                                        <div className="resume__group">
                                            <div className="resume__data">
                                                <div>
                                                    <h3 className="resume__name">Senior Analyst, Cloud Migration & Implementation</h3>
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
                            </div>
                        </div>
                        <h2 className={`${theme} work_title`} data-padding='block-end'>Certifications</h2>
                        <div className="resume__area">
                            <div className="resume__box">
                                <div className="resume__group">
                                    <ul className="cert-list">
                                        <li>
                                            <img
                                                src="https://port-images-bucket.s3.us-east-1.amazonaws.com/img/microsoft-certified-associate-badge.svg"
                                                alt="Microsoft Certified: Azure Data Scientist Associate badge"
                                                className="cert-badge"
                                            />
                                            <span>Azure Data Scientist Associate (DP-100), April 2026</span>
                                        </li>
                                        <li>
                                            <img
                                                src="https://port-images-bucket.s3.us-east-1.amazonaws.com/img/aws-saa-badge-resized.f.png.png"
                                                alt="AWS Certified Solutions Architect Associate badge"
                                                className="cert-badge"
                                            />
                                            <span>AWS Solutions Architect Associate</span>
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

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Experience
