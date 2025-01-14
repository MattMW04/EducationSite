'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
    const [theme, setTheme] = useState('sunset');

    // Load the theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'sunset';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // Unified theme change handler
    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="flex flex-col">
            
            <header className="bg-base-200">
                <nav className="navbar px-4 flex justify-between items-center">
                    
                    <div className="flex-none">
                        <span className="text-xl font-bold">EducationApp</span>
                    </div>

                    
                    <div className="flex-1 flex justify-center space-x-8">
                        <Link href="/" className="btn btn-ghost">
                            Home
                        </Link>
                        <Link href="/example-page" className="btn btn-ghost">
                            Example Page
                        </Link>
                        <Link href="/Account/Login" className="btn btn-ghost">
                            Login
                        </Link>
                    </div>

                    <div className="flex-none flex items-center space-x-4">
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
                        
                        <Link href="/Account/Login" className="btn btn-ghost ml-4">
                            Login
                        </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;