
import localFont from "next/font/local";
import "./globals.css";
import ClientSessionProvider from "./components/ClientSessionProvider";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from "react-toastify";

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


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="sunset">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>
        
        {/* ToastContainer placed globally */}
        <ToastContainer />
      </body>
    </html>
  );
}
