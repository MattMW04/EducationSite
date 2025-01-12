'use client'; // 'use client'; directive is used to indicate that this file should be treated as a client-side component in Next.js. This is necessary for components that rely on client-side features such as hooks and state management.

import Link from 'next/link'; // Link component is used to navigate between pages in Next.js without a full page reload.

// Example of using a functional component in Next.js


export default function ExamplePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Example Page</h1>
      <p className="mb-4">This is an example page in Next.js</p>
      <Link href="/" className="text-blue-500 hover:underline">Go back to home</Link>
    </div>
  );
}



