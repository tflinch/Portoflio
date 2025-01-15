import { useState } from "react";

interface ContactProps {
    theme: "light" | "dark";
}

interface FormModel {
    name: string;
    email: string;
    number: string;
    message: string;
    subject: string;
}

const initialFormModel: FormModel = {
    name: "",
    email: "",
    number: "",
    message: "",
    subject: "",
};

const Contact: React.FC<ContactProps> = ({ theme }) => {
    const [messageDetails, setMessageDetails] = useState<FormModel>(initialFormModel);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Fixed the typo
        console.log("Form submitted with data:", messageDetails);
        // Add form submission logic here, such as sending data to an API
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMessageDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <main className={theme}>
            <section className="section">
                <div className="wrapper" data-width="narrow">
                    <form onSubmit={handleSubmit}>
                        <div className="equal-columns" data-alignment="centered">
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={messageDetails.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={messageDetails.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Mobile Number"
                                    value={messageDetails.number}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Email Subject"
                                    value={messageDetails.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="text-box">
                                <textarea
                                    name="message"
                                    cols={30}
                                    rows={10}
                                    placeholder="Your Message"
                                    value={messageDetails.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <input type="submit" value="Send Message" className="btn" />
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Contact;
