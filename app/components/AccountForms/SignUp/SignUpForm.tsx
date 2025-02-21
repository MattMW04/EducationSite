'use client'; // This ensures React client-side logic works

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; 
import SignUpFormErrorMessage from '@/app/components/AccountForms/SignUp/SignUpFormErrorMessage';
import { signIn } from 'next-auth/react';

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const errorRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter(); 

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            if (errorRef.current) {
                errorRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

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
            await signIn('credentials',{
                username,
                password,
                redirect: false,
                });
            router.push('/');
        }
    };

    return (
        <div className="mt-4 p-2" ref= {errorRef}>
            {error && <SignUpFormErrorMessage error={error} />}

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                <div>
                    <label className="block text-bodyText font-medium mb-1">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                        placeholder="Enter your username"
                        className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                    />
                </div>

                <div>
                    <label className="block text-bodyText font-medium mb-1">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                    />
                </div>

                <div>
                    <label className="block text-bodyText font-medium mb-1">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your password"
                        className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-buttonPrimary text-buttonText py-3 rounded-md font-bold hover:bg-buttonHover mt-4 cursor-pointer"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
