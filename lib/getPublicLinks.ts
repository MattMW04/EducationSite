

export const getPublicLinks = async (): Promise<[]> => {
    try {
        const response = await fetch('/api/quizzes/public');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch public quizzes');
        }

        if(data.length === 0) {
            console.log('No public quizzes found');
            throw new Error('No public quizzes found');
        }
        return data;
    } catch (error) {
        console.error('Error fetching public quizzes:', error);
        throw error;
    }
};