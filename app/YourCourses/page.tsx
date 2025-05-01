import UserCourseList from '@/components/CourseLists/UserCourseList';

export const metadata = {
  title: 'AccessEDUK: Your Courses',
  description: 'View and manage your courses',
};

export default function YourCoursesPage() {
  return (
    <div className="container mx-auto p-4">
      <UserCourseList />
    </div>
  );
}
