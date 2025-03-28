export const getPublicLinks = async (): Promise<any[]> => {
    try {
        const [linksResponse, resultsResponse] = await Promise.all([
            fetch('/api/quizzes/public'),
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
                highScore: result?.bestScore || "N/A"
            };
        });

        return combined;
    } catch (error) {
        console.error('Error fetching public links or quiz results:', error);
        throw error;
    }
};