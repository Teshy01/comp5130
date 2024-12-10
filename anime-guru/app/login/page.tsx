/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Navbar from "../navbar";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../lib/firebase";



export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const auth = getAuth(app);

        try {
            // Attempt to sign in the user
            await signInWithEmailAndPassword(auth, email, password);
            
            // If successful, redirect to homepage
            router.push("/homepage");
        } catch (err: any) {
            // Handle errors and display appropriate messages
            if (err.code === "auth/user-not-found") {
                setError("Email does not match any account.");
            } else if (err.code === "auth/wrong-password") {
                setError("Password is incorrect.");
            } else {
                setError("Failed to log in. Please try again later.");
            }
        }
    };

    return (
        <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
            <div className="w-full h-screen">
                <Navbar />
                <div className="flex justify-center items-center overflow-hidden pt-60">
                    <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20">
                        <h1 className="text-center text-white font-light text-4xl rounded-t-xl m-0 py-4">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit} className="p-6">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-2 px-3 w-full text-black text-lg font-light outline-none"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="py-2 px-3 w-full text-black text-lg font-light outline-none mt-3"
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <div className="flex mt-5 justify-between items-center">
                                <a
                                    href="/signup"
                                    className="text-white cursor-pointer transition hover:text-cyan-300"
                                >
                                    Not Yet Registered?
                                </a>
                                <button
                                    type="submit"
                                    className="bg-black text-grey font-medium py-2 px-8 transition hover:text-cyan-300"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </aside>
                </div>
            </div>
        </main>
    );
}
