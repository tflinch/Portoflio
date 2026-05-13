interface Data {
    name: string;
    email: string;
    number: string;
    message: string;
    subject: string;
}

const sendEmail = async (formData: Data): Promise<void> => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey) {
        throw new Error("Contact form is not configured.");
    }

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            phone: formData.number,
            subject: formData.subject,
            message: formData.message,
            from_name: formData.name,
            replyto: formData.email,
        }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message.");
    }
};

export { sendEmail };
