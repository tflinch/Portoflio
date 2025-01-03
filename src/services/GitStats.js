const BASE_URL = "https://api.github.com/graphql"

const getContributions = async () => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": process.env.ACCESS_KEY
        },
        body: JSON.stringify({
            query: `
                query {
                    user(login: "${username}") {
                        name
                        contributionsCollection {
                            contributionCalendar {
                                colors
                                totalContributions
                                weeks {
                                    contributionDays {
                                        color
                                        contributionCount
                                        date
                                        weekday
                                    }
                                    firstDay
                                }
                            }
                        }
                    }
                }
            `,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
};