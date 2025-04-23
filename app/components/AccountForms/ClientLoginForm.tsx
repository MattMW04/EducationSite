"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast} from 'react-toastify';
import FormWrapper from '@/app/components/AccountForms/FormWrapper';
import  LoginFormError  from '@/app/components/AccountForms/LoginFormError';
import Link from 'next/link';
import handleLogin from '@/lib/handleLogin';


const ClientLoginForm = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (error) {
            errorRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [error]);


    const handleLogout = async () => {
        const result = await signOut({ redirect: false }); 
        if (result?.url) {
            toast.success("Logout successful!", { position: "top-right" });
            router.push(result.url); // Redirect to the URL returned by signOut
        } else {
            toast.error("Logout failed. Please try again.");
        }
    };

    if (status === "loading") {
        return (
            <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
                <main className="flex justify-center items-starts w-full ">
                    <FormWrapper title="">
                        <div className="flex flex-col items-center justify-center min-h-screen">
                            <p className="text-gray-500 mb-4">Checking authentication...</p>
                            <span className="loading loading-spinner text-info text-6xl"></span>
                        </div>
                    </FormWrapper>
                </main>
            </div>
            
        );
    }

    if (session) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center bg-background">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-sm" role="alert">
                    <strong className="font-bold ml-4 mr-4">Error:</strong>
                    <span className="block sm:inline p-2">You are logged in as: {session.user.name}</span>
                    <span className="block sm:inline">Role: {session.user?.role ?? "Not assigned"} </span>
                    <span className="block sm:inline">id: {session.user?.id ?? "Not assigned"} </span>
                    <input type="button" onClick={handleLogout} className="btn text-white m-4 bg-red-500 rounded-md px-4 py-2 cursor-pointer hover:bg-red-600" value="Logout" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen flex items-start justify-center pt-24 p-4 w-full">
            <main className="flex justify-center items-starts w-full ">
                <FormWrapper title="Login">
                {error && <LoginFormError error={error}  />}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-bodyText font-medium mb-1" htmlFor="username">
                                Username:
                            </label>
                            <input
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete='username'
                                required
                                placeholder="Enter your username"
                                className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-bodyText font-medium mb-1" htmlFor="password">
                                Password:
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                autoComplete='current-password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                className="w-full p-3 border border-divider rounded-md bg-white focus:ring-2 focus:ring-primary focus:outline-none text-black"
                            />
                        </div>

                        <input
                            type="button"
                            value="Login"
                            onClick={ () => handleLogin(username, password, router, setError)}
                            className="w-full bg-buttonPrimary text-buttonText py-3 rounded-md font-bold hover:bg-buttonHover mt-4 cursor-pointer"
                        />
                    </form>

                    <div className="flex justify-center items-center mt-4">
                        <p className="text-black text-center mr-2">Don&apos;t Have An Account?</p>
                        <Link href="/Account/SignUp" className="text-link hover:text-linkHover text-center">Sign Up here</Link>
                    </div>
                </FormWrapper>
            </main>
        </div>
    );
};

export default ClientLoginForm;