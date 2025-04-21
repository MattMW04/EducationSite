'use client';

import { useState } from 'react'; 

import MobileMenu from './MobileMenu';

import {Menu, X} from "lucide-react";

// This component is a hamburger menu used for mobile screens

export default function HamburgerMenu({navLinks}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar flex justify-center items-center w-full relative p-4">
            {/* Mobile menu with lucide react icon */}
            <button 
                onClick={handleToggle}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                name= "menu"
                className="absolute right-2 transition-colors duration-500 hover:bg-gray-200 rounded-full p-2">
                <Menu className="lg:hidden md:hidden transition-colours duration-500 hover:text-blue-500" size={50} />
            </button>
            {isOpen && (
            <MobileMenu handleToggle={handleToggle} isOpen={isOpen} navLinks={navLinks} />
            )}
        </div>
    );
};