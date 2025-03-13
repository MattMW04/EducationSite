import UserRoutesList from '../components/UserRoutesList';

export default function AUserRoutesPage() {
  const userId = 'someUserId'; 
  return (
    <main>
      <UserRoutesList userId={userId} />
    </main>
  );
}
