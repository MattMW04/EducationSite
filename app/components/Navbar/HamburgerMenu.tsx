'use client';

import { useState } from 'react'; 

import MobileMenu from './MobileMenu';

// This component is a hamburger menu used for mobile screens

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
    console.log('clicked', isOpen);
    setIsOpen(!isOpen);
};

    return (
        <div className="navbar flex justify-center items-center w-full relative p-4">
            <div className="absolute right-5 flex-shrink-0">
                <svg className="block h-8 w-8 text-blue-500 fill-current hover:outline hover:outline-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={() => { handleToggle(); }}>
                    <title>Mobile menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </div>
            {isOpen && (
                <MobileMenu handleToggle={handleToggle} />
            )}
        </div>
    );
};