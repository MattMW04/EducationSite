import Link from 'next/link';
import React from 'react';
import {X} from "lucide-react";
import {signOut} from 'next-auth/react';


type HandleToggle = () => void;

interface MobileMenuProps {
    handleToggle: HandleToggle;
    isOpen: boolean;
    navLinks: { href: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({handleToggle, isOpen, navLinks}) => {
    return (
        <div className={`fixed top-0 right-0 h-full w-64 bg-nav text-white p-4 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
            <div className="absolute top-2 left-0 w-full flex justify-between items-center">
            <h2 className="text-lg text-white-500 ml-4">Menu</h2>
            <button onClick={handleToggle} className="text-white mr-4">
                <X className="w-8 h-8 hover:text-blue-500" size="100" />
            </button>
            </div>
            <div className="flex-1 flex flex-col">
            {navLinks.map((link, index) =>
                    link.label === "Logout" ? (
                        <button
                            key={index}
                            onClick={() => signOut()}
                            className="flex-1 text-center btn btn-ghost" >
                            {link.label}
                        </button>
                    ):(
                        <Link key={index} href={link.href} className= "flex-1 text-center btn btn-ghost">
                            {link.label}
                        </Link>

                    )
            )}
            </div>
        </div>
    )
}    
export default MobileMenu     