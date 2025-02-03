'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async () => {
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        // Password confirmation check
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        setError('');

        // Check if the username already exists
        const checkUserResponse = await fetch('/api/auth/check-user', {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: { 'Content-Type': 'application/json' },
        });

        const checkUserData = await checkUserResponse.json();

        if (checkUserData.exists) {
            setError('Username is already taken');
            setIsLoading(false);
            return;
        }

        // Proceed to sign up the user
        const signUpResponse = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const signUpData = await signUpResponse.json();

        if (signUpData.error) {
            setError(signUpData.error);
        } else {
            router.push('/'); // Redirect to the home page after successful sign-up
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow p-4">
                <div className="max-w-sm mx-auto p-6 rounded-lg shadow-lg border border-base-300">
                    <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSignUp();
                        }}
                    >
                        <label className="flex flex-col">
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="flex flex-col">
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="flex flex-col">
                            Confirm Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <button
                            type="submit"
                            className="mt-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    {error && <div className="text-red-500 mt-4">{error}</div>}

                    <button
                        type="button"
                        className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4"
                        onClick={() => signIn('github')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                        </svg>
                        Sign up with GitHub
                    </button>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SignUpPage;
