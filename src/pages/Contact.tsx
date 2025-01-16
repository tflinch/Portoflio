import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, AlertColor } from "@mui/material";

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
    const [errors, setErrors] = useState<Partial<FormModel>>({});
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor } | null>(null);
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: Partial<FormModel> = {};
        let isValid = true;

        if (!messageDetails.name.trim()) {
            newErrors.name = "Name cannot be blank";
            isValid = false;
        }

        if (!messageDetails.email.trim()) {
            newErrors.email = "Email Address cannot be blank";
            isValid = false;
        } else {
            const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
            if (!emailRegex.test(messageDetails.email)) {
                newErrors.email = "Enter a valid email address";
                isValid = false;
            }
        }

        if (!messageDetails.number.trim()) {
            newErrors.number = "Mobile Number cannot be blank";
            isValid = false;
        }

        if (!messageDetails.subject.trim()) {
            newErrors.subject = "Subject cannot be blank";
            isValid = false;
        }

        if (!messageDetails.message.trim()) {
            newErrors.message = "Message cannot be blank";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            setSnackbar({
                open: true,
                message: "Your message has been sent successfully!",
                severity: "success",
            });
            console.log(messageDetails)
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            const errorMessages = Object.values(errors)
                .filter((error) => error)
                .join(", ");
            setSnackbar({
                open: true,
                message: errorMessages || "Please fix the errors in the form.",
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

        // Clear the error for this input field
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
                                    className={errors.name ? "error" : ""}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={messageDetails.email}
                                    onChange={handleChange}
                                    className={errors.email ? "error" : ""}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Mobile Number"
                                    value={messageDetails.number}
                                    onChange={handleChange}
                                    className={errors.number ? "error" : ""}
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Email Subject"
                                    value={messageDetails.subject}
                                    onChange={handleChange}
                                    className={errors.subject ? "error" : ""}
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
                                    className={errors.message ? "error" : ""}
                                ></textarea>
                            </div>

                            <input type="submit" value="Send Message" className="btn" />
                        </div>
                    </form>
                </div>
            </section>

            {/* Snackbar for feedback */}
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
