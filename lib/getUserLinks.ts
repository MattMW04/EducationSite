export const getUserLinks = async (): Promise<any[]> => {
    try {
        const [linksResponse, resultsResponse] = await Promise.all([
            fetch('/api/quizzes/user'),
            fetch('/api/QuizResults')
        ]);

        const links = await linksResponse.json();
        const results = await resultsResponse.json();

        if (!linksResponse.ok || !resultsResponse.ok) {
            console.log(links.message || results.message);
            return [];
        }

        const combined = links.map((link: any) => {
            const result = results.find((res: any) => res.quizId === link._id);
            return {
                ...link,
                highScore: result?.bestScore || 0
            };
        });

        return combined;
    } catch (error) {
        console.error('Error fetching user links or quiz results:', error);
        throw error;
    }
};