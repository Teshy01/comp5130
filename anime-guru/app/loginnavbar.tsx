"use client";
import React, { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import app from "../app/lib/firebase"; // Import Firebase initialization

const Navbar = () => {
    const [isClick, setIsClick] = useState(false);
    const router = useRouter(); // Initialize useRouter
    const toggleNavbar = () => {
        setIsClick(!isClick);
    };

    const handleLogout = async () => {
        try {
            const auth = getAuth(app); // Initialize Firebase auth
            await signOut(auth); // Log the user out
            router.push('/'); // Redirect to the homepage after logging out
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <>
            <nav className="bg-black sticky top-0 z-50">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <a href="/homepage" className="text-white">
                                    Anime Guru
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center space-x-4">
                                <a href="/profile" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                    Profile
                                </a>
                                <button
                                    onClick={handleLogout} // Call handleLogout on click
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white 
                                hover:text-white focus:outline-none focus:ring-2 focus:ring-inster focus:ring-white"
                                onClick={toggleNavbar}
                            >
                                {isClick ? (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {isClick && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="/profile" className="text-white block hover:bg-white hover:text-black rounded-lg p-2">
                                Profile
                            </a>
                            <button
                                onClick={handleLogout} // Call handleLogout on click
                                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
