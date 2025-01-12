'use client'; 

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <p className="mb-4">This is the home page in Next.js</p>
      <Link href="/example-page" className="text-blue-500 hover:underline">
        Go to example page
      </Link>
      <input type="checkbox" className="toggle" defaultChecked />
    </div>
  );
  
};

export default HomePage;