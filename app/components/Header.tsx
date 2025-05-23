'use client';

import FullNav from './Navbar/FullNav';
import React, { useState, useEffect } from 'react';
import HamburgerMenu from './Navbar/HamburgerMenu';
import { useSession } from 'next-auth/react';
import {getNavLinks} from '@/lib/getNavLinks';

const Header = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    const {data: session} = useSession();
    const navLinks = getNavLinks(session);

    useEffect(() => {
        // ensure that the component is mounted before setting state
        setIsMounted(true); 

        // check if the window width is greater than or equal to 840px
        const handleResize = () => {
            const width = window.innerWidth;
            setIsDesktop(width >= 840);
            setIsTablet(width >= 768 && width < 840);
        };

        // run on mount
        handleResize();
        // listen for resize events 
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMounted) {
        return null; 
    }

    return (
        <div className="flex flex-col bg-header">
            <header className="bg-header flex items-center justify-between p-4">
                <div className="text-xl font-bold">AccessEDUK</div>
                {isDesktop ? (
                    <nav className="navbar flex justify-center items-center w-full">
                        <FullNav navLinks={navLinks} />
                    </nav>
                ) : (
                    <nav className="navbar flex justify-center items-center w-full">
                        <HamburgerMenu navLinks={navLinks} />
                    </nav>
                )}
            </header>
        </div>
    );
};

export default Header;