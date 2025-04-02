"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import {X} from "lucide-react";
import {signOut} from 'next-auth/react';


type HandleToggle = () => void;

interface MobileMenuProps {
    handleToggle: HandleToggle;
    isOpen: boolean;
    navLinks: { href: string; label: string; subLinks?: { href: string; label: string }[] }[]; // subLinks can be removed if not needed
}

const MobileMenu: React.FC<MobileMenuProps> = ({ handleToggle, isOpen, navLinks }) => {
    const pathname = usePathname();
    return (
        <div className={`fixed top-0 right-0 h-full w-64 bg-nav text-white p-4 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
            <div className="absolute top-2 left-0 w-full flex justify-between items-center">
                <h2 className="text-lg text-white-500 ml-4">Menu</h2>
                <button onClick={handleToggle} className="text-white mr-6">
                    <X className="w-8 h-8 hover:text-blue-500" size="100" />
                </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 mt-8">
                {navLinks.map((link, index) =>
                    link.subLinks ? (
                        <div key={index} className="dropdown dropdown-bottom dropdown-center ">
                            <div
                                tabIndex={0}
                                role="button"
                                className="text-center btn btn-ghost"
                            >
                                {link.label}
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-50 p-2 shadow-sm mx-auto">
                                {link.subLinks.map((subLink, subIndex) => (
                                    <li key={subIndex}>
                                        <Link href={subLink.href} className={`${pathname === subLink.href ? 'border-b-2 border-white' : ''}`}>
                                            {subLink.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : link.label === "Logout" ? (
                        <button
                            key={index}
                            onClick={() => signOut()}
                            className="text-center btn btn-ghost">
                            {link.label}
                        </button>
                    ) : (
                        <Link key={index} href={link.href} className={`text-center btn btn-ghost ${pathname === link.href ? 'border-b-2 border-white' : ''}`}>
                            {link.label}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
};
export default MobileMenu;