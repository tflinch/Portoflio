import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, AlertColor } from "@mui/material";

import { sendEmail } from '../services/contact.ts'
import StarsBackground from '../components/Stars/StarsBackground';


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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC<ContactProps> = ({ theme }) => {
    const [messageDetails, setMessageDetails] = useState<FormModel>(initialFormModel);
    const [errors, setErrors] = useState<Partial<FormModel>>({});
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor } | null>(null);
    const navigate = useNavigate();

    const validateForm = (): { isValid: boolean; errors: Partial<FormModel> } => {
        const newErrors: Partial<FormModel> = {};

        if (!messageDetails.name.trim()) {
            newErrors.name = "Name cannot be blank";
        }

        if (!messageDetails.email.trim()) {
            newErrors.email = "Email Address cannot be blank";
        } else if (!emailPattern.test(messageDetails.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!messageDetails.number.trim()) {
            newErrors.number = "Mobile Number cannot be blank";
        }

        if (!messageDetails.subject.trim()) {
            newErrors.subject = "Subject cannot be blank";
        }

        if (!messageDetails.message.trim()) {
            newErrors.message = "Message cannot be blank";
        }

        setErrors(newErrors);
        return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { isValid, errors: latestErrors } = validateForm();

        if (!isValid) {
            const errorMessages = Object.values(latestErrors)
                .filter((e) => e)
                .join(", ");
            setSnackbar({
                open: true,
                message: errorMessages || "Please fix the errors in the form.",
                severity: "error",
            });
            return;
        }

        try {
            await sendEmail(messageDetails);
            setSnackbar({
                open: true,
                message: "Your message has been sent successfully!",
                severity: "success",
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err: unknown) {
            console.error("Email sending error:", err);
            const apiErrorMessage = err instanceof Error
                ? err.message
                : "Failed to send email. Please try again later.";
            setSnackbar({
                open: true,
                message: apiErrorMessage,
                severity: "error",
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setMessageDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSnackbarClose = () => {
        setSnackbar(null);
    };

    return (
        <main className={theme}>
            <section className="section contact-section">
                <StarsBackground theme={theme} />
                <div className="wrapper" data-width="narrow">
                    <form onSubmit={handleSubmit} noValidate className="contact-form">
                        <div className="equal-columns" data-alignment="centered">
                            <div className="input-box">
                                <div className="input-field">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={messageDetails.name}
                                        onChange={handleChange}
                                        className={errors.name ? "error" : ""}
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={messageDetails.email}
                                        onChange={handleChange}
                                        className={errors.email ? "error" : ""}
                                    />
                                </div>
                            </div>

                            <div className="input-box">
                                <div className="input-field">
                                    <label htmlFor="number">Mobile Number</label>
                                    <input
                                        id="number"
                                        type="text"
                                        name="number"
                                        value={messageDetails.number}
                                        onChange={handleChange}
                                        className={errors.number ? "error" : ""}
                                    />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="subject">Email Subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={messageDetails.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? "error" : ""}
                                    />
                                </div>
                            </div>

                            <div className="text-box">
                                <div className="input-field">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        cols={30}
                                        rows={10}
                                        value={messageDetails.message}
                                        onChange={handleChange}
                                        className={errors.message ? "error" : ""}
                                    ></textarea>
                                </div>
                            </div>

                            <input type="submit" value="Send Message" className="btn" />
                        </div>
                    </form>
                </div>
            </section>

            {snackbar && (
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            )}
        </main>
    );
};

export default Contact;
