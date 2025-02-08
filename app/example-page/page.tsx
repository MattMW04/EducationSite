'use client'; // 'use client'; directive is used to indicate that this file should be treated as a client-side component in Next.js. This is necessary for components that rely on client-side features such as hooks and state management ie using React.
// Note - you cannot export metadata from these components with this directive 
import Link from 'next/link'; // Link component is used to navigate between pages in Next.js without a full page reload.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState, useEffect } from 'react'; // React hooks are used to manage state and lifecycle methods in functional components. useState and useEffect are two of the most commonly used hooks in React.


// Example of using a functional component in Next.js


export default function ExamplePage() {
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
  const [theme, setTheme] = useState('sunset');

    // Load the theme from localStorage on component mount
    useEffect(() => {
        console.log('Theme:', theme);
    }, [theme]);

    // Unified theme change handler
    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

  return (
    <div className="flex flex-col min-h-screen">
            
            
            {/* Main Content */}
            <main className="flex-grow p-4">
              <h1 className="text-2xl font-bold mb-4">Example Page</h1>
              <p className="mb-4">This is an example page in Next.js</p>
              <Link href="/">
                Back to home page (next.js link usage)
              </Link>
              <DataFetchComponent />
              <div className="flex-none flex items-center space-x-4 mt-2 md:mt-0">
                        {/* Theme Toggle */}
                        <div className="flex items-center space-x-2 mr-4">
                            <span className="text-sm font-medium" data-tip="Toggle light theme">
                                Light
                            </span>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={theme === 'Sigma'}
                                onChange={() => handleThemeChange(theme === 'Sigma' ? 'Beta' : 'Sigma')}
                                data-tip="Toggle example"
                            />
                            <span className="text-sm font-medium">Dark</span>
                        </div>

                        {/* Theme Selector Dropdown */}
                        <div className="tooltip tooltip-bottom" data-tip="Select your theme">
                            <select
                                className="select select-bordered w-40"
                                value={theme}
                                onChange={(e) => handleThemeChange(e.target.value)}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="sunset">Sunset</option>
                                <option value="retro">Retro</option>
                            </select>
                        </div>
                    </div>
            </main>
            
            
        </div>
  );
}



