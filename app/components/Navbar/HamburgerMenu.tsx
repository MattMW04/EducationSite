'use client';

import { useState } from 'react'; 

import MobileMenu from './MobileMenu';

import {Menu, X} from "lucide-react";

// This component is a hamburger menu used for mobile screens

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar flex justify-center items-center w-full relative p-4">
                {/* Mobile menu with lucide react icon */}
                <button 
                    onClick={handleToggle}>
                    <Menu className="lg:hidden md:hidden fixed top-7 right-4"  size={50} />
                </button>
            {isOpen && (
                <MobileMenu handleToggle={handleToggle} />
            )}
            
        </div>
    );
};