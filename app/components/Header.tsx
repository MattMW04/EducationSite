'use client';

import FullNav from './Navbar/FullNav';
import HamburgerMenu
 from './Navbar/HamburgerMenu';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <div className="flex flex-col bg-background">
            <header className="bg-base-200 bg-background flex items-center justify-between p-4">
                <div className="text-xl font-bold">AccessEDUK</div>
                {isDesktop && (
                    <nav className="navbar flex justify-center items-center w-full">
                        <FullNav />
                    </nav>
                )}

                {!isDesktop && (
                    <nav className="navbar flex justify-center items-center w-full">
                        <HamburgerMenu />
                    </nav>
                )}
                
            </header>
        </div>
    );
};

export default Header;