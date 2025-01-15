'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { Suspense, useState, useEffect } from 'react';

const loadingCircle = () => (
  <div className="flex justify-center items-center mt-6 ">
    <div className="text-center">
      <span className="loading loading-spinner text-info text-6xl"></span>
      <p className="text-2xl">Loading...</p>
    </div>
  </div>
);

const fetchData = async () => {
  const response = await fetch('http://localhost:3000/api/ping');
  const data = await response.json();
  return data;
};

const DataFetchComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const getData = async () => {
      setTimeout(async () => {
        const result = await fetchData();
        setData(result.collections);
        setLoading(false); 
      }, 2000);  // 3 second delay to simulate loading
    };

    getData();
  }, []);

  if (loading) {
    return <div>{loadingCircle()}</div>;  
  }

  if (!Array.isArray(data)) {
    return <div>Error: Data is not an array</div>;
  }

  return (
    <div>
      <h2>Data from API</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> 
        ))}
      </ul>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Navbar */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Home Page</h1>
        <p className="mb-4">This is the home page in Next.js</p>
        < DataFetchComponent />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default HomePage;


