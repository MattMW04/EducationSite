'use client'; // 'use client'; directive is used to indicate that this file should be treated as a client-side component in Next.js. This is necessary for components that rely on client-side features such as hooks and state management ie using React.
// Note - you cannot export metadata from these components with this directive 
import Link from 'next/link'; // Link component is used to navigate between pages in Next.js without a full page reload.
import Header from '@/components/Header';
import Footer from '@/components/Footer';


// Example of using a functional component in Next.js


export default function ExamplePage() {
  return (
    <div className="flex flex-col min-h-screen">
            {/* Header with Navbar */}
            <Header />
            
            {/* Main Content */}
            <main className="flex-grow p-4">
              <h1 className="text-2xl font-bold mb-4">Example Page</h1>
              <p className="mb-4">This is an example page in Next.js</p>
              <Link href="/">
                Back to home page (next.js link usage)
              </Link>
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
  );
}



