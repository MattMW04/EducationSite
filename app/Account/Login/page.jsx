'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import handleSubmit from '@/lib/exampleLogin.mjs';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow p-4">
                <div className="max-w-sm mx-auto p-6 rounded-lg shadow-lg border border-base-300">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <label className="flex flex-col">
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='email'
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <label className="flex flex-col">
                            Password:
                            <input
                                type="password"
                                value={password}
                                autoComplete='current-password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                        <input
                            type="button"
                            value="Login"
                            onClick={() => handleSubmit(email, password)}
                            className="mt-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 cursor-pointer"
                        />
                    </form>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LoginPage;
