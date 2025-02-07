'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavBar from './Navbar/NavBar';

const Header = () => {
    const [theme, setTheme] = useState('sunset');

    // Load the theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'sunset';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // Unified theme change handler
    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="flex flex-col">
            <header className="bg-base-200">
                <nav className="navbar px-4 flex justify-between items-center flex-wrap mr-4">
                    <div className="flex-none">
                        <span className="text-xl font-bold">AccessEDUK</span>
                    </div>

                    <NavBar />

                    <div className="flex-none flex items-center space-x-4 mt-2 md:mt-0">
                        {/* Theme Toggle */}
                        <div className="flex items-center space-x-2 mr-4">
                            <span className="text-sm font-medium" data-tip="Toggle light theme">
                                Light
                            </span>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={theme === 'sunset'}
                                onChange={() => handleThemeChange(theme === 'light' ? 'sunset' : 'light')}
                                data-tip="Toggle light/dark theme"
                            />
                            <span className="text-sm font-medium">Dark</span>
                        </div>

                        {/* Theme Selector Dropdown */}
                        <div className="tooltip tooltip-bottom" data-tip="Select your theme">
                            <select
                                className="select select-bordered w-40"
                                value={theme}
                                onChange={(e) => handleThemeChange(e.target.value)}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="sunset">Sunset</option>
                                <option value="retro">Retro</option>
                            </select>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;