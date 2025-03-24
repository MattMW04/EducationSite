
export const getUserLinks = async (): Promise<[] | []> => {
    try {
        const response = await fetch('/api/quizzes/user');
        const data = await response.json();
        if (!response.ok) {
            console.log(data.message)
            return [];
        }

        if(data.length === 0) {
            console.log('No public quizzes found');
            return [];
        }
        return data;
    } catch (error) {
        console.error('Error fetching public quizzes:', error);
        throw error;
    }
};