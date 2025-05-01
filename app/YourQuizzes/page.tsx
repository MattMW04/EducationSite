import UserQuizList from '@/components/QuizLists/UserQuizList';

export const metadata = {
  title: 'AccessEDUK: Your Quizzes',
  description: 'View and manage your quizzes',
};


export default function AUserRoutesPage() {
  
  return (
    <main>
      <UserQuizList  />
    </main>
  );
}
