'use client';

import dynamic from 'next/dynamic';
// this component loads the responsive navbar view controller

// Dynamic import with SSR disabled - 
const ResponsiveNavBar = dynamic(() => import('./ResponsiveNavBar'), {ssr: false,});

export default function NavBar() {
    return <ResponsiveNavBar />;
}