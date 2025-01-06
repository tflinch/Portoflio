const BASE_URL = "https://api.github.com/graphql"
const ACCESS_KEY = `${import.meta.env.VITE_ACCESS_KEY}`

interface ContributionCalendar {
    colors: string[];
    totalContributions: number;
    weeks: {
        contributionDays: {
            color: string;
            contributionCount: number;
            date: string;
            weekday: number;
        }[];
        firstDay: string;
    }[];
}

interface GitHubUserContributions {
    data: {
        user: {
            name: string;
            contributionsCollection: {
                contributionCalendar: ContributionCalendar;
            };
        };
    };
}


const getContributions = async (): Promise<GitHubUserContributions> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `bearer ${ACCESS_KEY}`,
        },
        body: JSON.stringify({
            query: `
                query {
                    user(login: "tflinch") {
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
        const errorBody = await response.text();
        throw new Error(`Error: ${response.status}, Body: ${errorBody}`);
    }
    

    const data = await response.json();
    console.log(data.data.user);
    const totalContributions = data.data.user.contributionsCollection.contributionCalendar.totalContributions
    console.log(totalContributions)
    return totalContributions;
};


export {getContributions}