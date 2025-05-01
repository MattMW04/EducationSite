
import PublicQuizList from '../components/QuizLists/PublicQuizList';

export const metadata = {
  title: 'AccessEDUK: Quizzes',
  description: 'Browse all available quizzes',
};

export default function AllPublicRoutesPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <PublicQuizList/>
    </main>
  );
}
