const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      {/* Main Content */}
      <main className="flex-grow p-8 text-center mt-4">
        <h1 className="text-3xl font-semibold mb-6 text-headerText">Welcome to Access ED-UK</h1>
        <p className="text-lg mb-6 text-bodyText">
          Discover a platform designed to enhance your education experience. 
          Track your progress, access resources, and connect with others.
        </p>
      </main>

      
    </div>
  );
};

export default HomePage;


