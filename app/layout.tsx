
import localFont from "next/font/local";
import "./globals.css";
import ClientSessionProvider from "./components/ClientSessionProvider";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: 'AccessEDUK ',
  description: 'This is the home page for the AccessEDUK website',
  keywords: ['AccessEDUK', 'Home Page', 'Next.js', 'React', 'Tailwind CSS'],
};


export default function RootLayout({ children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-#EAF4fa">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-#EAF4fa`}
      >
        <ClientSessionProvider>
          {/* Header with Navbar */}
          <Header />
          {children}
          <Analytics />
          {/* Footer */}
          <Footer />
        </ClientSessionProvider>
        
        {/* ToastContainer  */}
        <ToastContainer />
      </body>
    </html>
  );
}
