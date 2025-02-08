'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavBar from './Navbar/NavBar';

const Header = () => {

    return (
        <div className="flex flex-col bg-background">
            <header className="bg-base-200 bg-background flex items-center justify-between p-4">
                <div className="text-xl font-bold">AccessEDUK</div>
                <nav className="navbar flex justify-center items-center w-full">
                    <NavBar />
                </nav>
            </header>
        </div>
    );
};

export default Header;