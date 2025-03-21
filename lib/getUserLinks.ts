export const getUserLinks = async (): Promise<[] | string> => {
    try {
        const response = await fetch('/api/quizzes/user');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch User quizzes');
        }

        if(data.length === 0) {
            console.log('No public quizzes found');
            return `${data.message}`;
        }
        return data;
    } catch (error) {
        console.error('Error fetching public quizzes:', error);
        throw error;
    }
};