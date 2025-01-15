
import Header from '@/components/Header'; 
import Footer from '@/components/Footer'; 

// Example of using a functional component in Next.js

export const metadata = {
    title: 'TestMetaData-AccessEDUK',
    description: 'This is the home page for the AccessEDUK website',
    keywords: ['AccessEDUK', 'Home Page', 'Next.js', 'React', 'Tailwind CSS'],
};

export default function ExampleMetaDataPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header with Navbar */}
            <Header />
            
            {/* Main Content */}
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Example Meta Data page</h1>
                <p className="mb-4">This is an example page in Next.js using meta data - look at title at top and inspect to see</p>
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}