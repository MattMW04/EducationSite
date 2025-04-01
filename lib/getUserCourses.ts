export const getUserCourses = async (): Promise<any[]> => {
  try {
    const response = await fetch('/api/courses/user');
    if (!response.ok) {
      throw new Error('Failed to fetch user courses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user courses:', error);
    throw error;
  }
};
