// This component is a full screen width navigation bar used for laptop, tablet and monitor screens

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function FullNav({navLinks}) {
    return (
        <div className="flex justify-center items-center w-full relative">
            <div className="flex-1 flex justify-center space-x-8 mt-2 md:mt-0 max-w-screen-lg">
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
    );
};