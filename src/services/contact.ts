interface Data {
    name: string;
    email: string;
    number: string;
    message: string;
    subject: string;
}

const sendEmail = async (formData: Data): Promise<void> => {
    const { name, email, number, message, subject } = formData;

    const apiUrl = new URL("https://api.elasticemail.com/v2/email/send");
    const API_KEY = import.meta.env.VITE_EMAIL_API_KEY;
    const EMAIL_FROM = import.meta.env.VITE_EMAIL_FROM;

    // Set query parameters
    apiUrl.searchParams.append("apikey", API_KEY);
    apiUrl.searchParams.append("subject", subject);
    apiUrl.searchParams.append("from", EMAIL_FROM);
    apiUrl.searchParams.append("to", EMAIL_FROM);
    apiUrl.searchParams.append(
        "bodyHtml",
        `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${number}</p><p>Message: ${message}</p>`
    );
    apiUrl.searchParams.append("isTransactional", "false");

    try {
        const response = await fetch(apiUrl.toString(), {
            method: "GET", // ElasticEmail API uses GET for query parameter-based requests
        });

        const responseData = await response.json();
        if (!response.ok || !responseData.success) {
            console.error("Error sending email:", responseData);
            throw new Error(responseData.error || "Failed to send email.");
        }
        console.log("Email sent successfully:", responseData);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email. Please try again later.");
    }
};

export { sendEmail };

