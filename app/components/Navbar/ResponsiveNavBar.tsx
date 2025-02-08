'use client'; 

import MediaQuery from 'react-responsive';
import FullNav from './FullNav';
import HamburgerMenu from './HamburgerMenu';

// This component will render either the FullNav or HamburgerMenu component based on the viewport width 
export default function ResponsiveNavBar() {
    return (
        <nav>
            {/* This will only render on viewports with a width of 768px and above */}
            <MediaQuery minWidth={768}>
                <FullNav />
            </MediaQuery>

            {/* This will render on viewports narrower than 768px */}
            <MediaQuery maxWidth={767}>
                <HamburgerMenu />
            </MediaQuery>
        </nav>
    );
}