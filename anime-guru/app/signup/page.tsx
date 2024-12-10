/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Navbar from "../navbar";
import { addDoc, collection, getCountFromServer, query, where } from "firebase/firestore";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../lib/firestore";
import app from "../lib/firebase";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) =>
        /^(?=.*[0-9])(?=.*[a-zA-Z]).{7,}$/.test(password);

    // Optimized function to check if the email exists using getCountFromServer
    const emailExistsInDatabase = async (email: string): Promise<boolean> => {
        const userCollection = collection(db, "userData");
        const q = query(userCollection, where("email", "==", email));
        const snapshot = await getCountFromServer(q); // Efficient count query
        return snapshot.data().count > 0; // If count > 0, email exists
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate inputs
        if (!validateEmail(email)) {
            setError("Invalid email address. Please include '@' and a valid domain.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 7 characters long and include at least one number.");
            return;
        }

        try {
            // Check if email exists and create the user concurrently
            const auth = getAuth(app);
            const emailExistsPromise = emailExistsInDatabase(email);
            const createUserPromise = createUserWithEmailAndPassword(auth, email, password);

            const [emailExists, userCredential] = await Promise.allSettled([
                emailExistsPromise,
                createUserPromise,
            ]);

            // Handle email existence check
            if (emailExists.status === "fulfilled" && emailExists.value) {
                setError("Email already exists. Please use a different email.");
                return;
            }

            // Handle Firebase Authentication success
            if (userCredential.status === "fulfilled") {
                const user = userCredential.value.user;

                // Add user data to Firestore
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    createdAt: new Date(),
                };

                try {
                    const docRef = await addDoc(collection(db, "userData"), userData);
                    console.log("Document written with ID: ", docRef.id); // Log Firestore doc ID for debugging

                    // Set the success message
                    setSuccess("Successfully Registered!");
                    setError(null);  // Clear any previous errors
                } catch (firestoreError) {
                    console.error("Error adding document: ", firestoreError);
                    setError("Failed to register. Please try again later.");
                    setSuccess(null);
                }
            } else {
                // Handle Firebase Authentication error
                throw new Error(userCredential.reason.message);
            }
        } catch (err: any) {
            console.error("Sign-up error:", err);
            setError(err.message || "Failed to register. Please try again later.");
            setSuccess(null);
        }
    };

    return (
        <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
            <div className="w-full h-screen">
                <Navbar />
                <div className="flex justify-center items-center overflow-hidden pt-60">
                    <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20">
                        <h1 className="text-center text-white font-light text-4xl rounded-t-xl m-0 py-4">
                            Sign Up
                        </h1>
                        <form onSubmit={handleSubmit} className="p-6">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-2 px-3 w-full text-black text-lg font-light outline-none"
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="py-2 px-3 w-full text-black text-lg font-light outline-none mt-3"
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                            <div className="flex mt-5 justify-between items-center">
                                <a
                                    href="/login"
                                    className="text-white cursor-pointer transition hover:text-cyan-300"
                                >
                                    Already Registered?
                                </a>
                                <button
                                    type="submit"
                                    className="bg-black text-grey font-medium py-2 px-8 transition hover:text-cyan-300"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </aside>
                </div>
            </div>
        </main>
    );
}
