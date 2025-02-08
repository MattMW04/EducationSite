// This component is a full screen width navigation bar used for laptop, tablet and monitor screens

import Link from 'next/link';

export default function FullNav() {
    return (
        <div className="flex-1 flex justify-center space-x-8 mt-2 md:mt-0 bg-#1A1B41">
            <Link href="/" className="flex-1 text-center btn btn-ghost">
                Home
            </Link>
            <Link href="/example-page" className="flex-1 text-center btn btn-ghost">
                Example Page
            </Link>
            <Link href="/testMetaData" className="flex-1 text-center btn btn-ghost">
                Test MetaData
            </Link>
            <Link href="/Account/Login" className="flex-1 text-center btn btn-ghost ml-4">
                Login
            </Link>
            <Link href="/Account/SignUp" className="flex-1 text-center btn btn-ghost">
                Sign Up
            </Link>
            <Link href="/Account/" className="flex-1 text-center btn btn-ghost">
                Styled Login
            </Link>
        </div>
    );
};