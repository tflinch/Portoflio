interface Data {
    name: string;
    email: string;
    number: string;
    message: string;
    subject: string;
    company: string;
}

interface Payload extends Data {
    elapsedMs: number;
}

// Public endpoint URL, not a credential -- the VITE_ prefix is correct here.
// The Resend API key lives only in the Lambda's environment.
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const sendEmail = async (payload: Payload): Promise<void> => {
    if (!ENDPOINT) {
        throw new Error('Contact form is not configured.');
    }

    let response: Response;
    try {
        response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch {
        throw new Error('Network error. Please try again later.');
    }

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to send message. Please try again later.');
    }
};

export { sendEmail };
export type { Data, Payload };
