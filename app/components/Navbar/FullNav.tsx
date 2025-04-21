// This component is a full screen width navigation bar used for laptop, tablet and monitor screens
"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function FullNav({ navLinks }) {
    const pathname = usePathname();
    return (
        <div className="flex justify-center items-center w-full relative">
            <div className="flex-1 flex justify-center space-x-4 mt-2 md:mt-0 max-w-screen-lg flex-wrap">
                {navLinks.map((link, index) =>
                    link.subLinks ? (
                        <div key={index} className="dropdown dropdown-bottom dropdown-center">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex-1 text-center btn btn-ghost w-24 p-2 text-sm"
                            >
                                {link.label}
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                {link.subLinks.map((subLink, subIndex) => (
                                    <li key={subIndex}>
                                        <Link href={subLink.href} className={`${pathname === subLink.href ? 'bg-blue-500 text-white' : ''}`}>
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
                            className="flex-1 text-center btn btn-ghost w-24 p-2 text-sm">
                            {link.label}
                        </button>
                    ) : (
                        <Link key={index} href={link.href} className={`flex-1 text-center btn btn-ghost w-24 p-2 text-sm ${pathname === link.href ? 'bg-blue-500 text-white border-b-4 border-blue-600 shadow-lg transition-all duration-300' : ''}`}>
                            {link.label}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}