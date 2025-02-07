// This component is a full screen width navigation bar used for laptop, tablet and monitor screens

import Link from 'next/link';

export default function FullNav() {
    return (
        <div className="flex-1 flex justify-center space-x-8 mt-2 md:mt-0">
            <Link href="/" className="btn btn-ghost">
                Home
            </Link>
            <Link href="/example-page" className="btn btn-ghost">
                Example Page
            </Link>
            <Link href="/testMetaData" className="btn btn-ghost">
                Test MetaData
            </Link>
            <Link href="/Account/Login" className="btn btn-ghost ml-4">
                Login
            </Link>
        </div>
    );
};