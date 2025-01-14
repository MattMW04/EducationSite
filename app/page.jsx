'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Navbar */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-4">
          <h1 className="text-2xl font-bold mb-4">Home Page</h1>
          <p className="mb-4">This is the home page in Next.js</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

