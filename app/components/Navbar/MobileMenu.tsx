import Link from 'next/link';
import React from 'react';

type HandleToggle = () => void;

interface MobileMenuProps {
    handleToggle: HandleToggle;
}

const MobileMenu: React.FC<MobileMenuProps> = ({handleToggle}) => {
    return (
        <div className="absolute top-0 left-0 w-48 bg-gray-800 text-white p-4 z-50">
            <div className="flex justify-between items-center">
                <h2 className="text-lg text-white-500">Menu</h2>
                <input type="button" onClick={() => { handleToggle(); }} className="btn text-white absolute top-0 right-0 m-4 bg-red-500" value="X"/>
            </div>
            <ul className="flex space x-4 flex-col">
                <li className="py-2 hover">
                    <Link href="/">Home</Link>
                </li>
                <li className="py-2">
                    <Link href="/calendar/month">Monthly Calendar</Link>
                </li>
                <li className="py-2">
                    <Link href="/calendar/week">Weekly Calendar</Link>
                </li>
            </ul>
        </div>
    )
};    
export default MobileMenu;    