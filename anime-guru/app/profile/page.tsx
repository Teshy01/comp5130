/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import LogNav from "../loginnavbar";
import ProtectedRoute from "../protectedroute";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../lib/firestore"; // Firestore db instance
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../lib/firebase";
import { AnimeList } from "../animeprofilelist";

export default function Profile() {
    const [animeList, setAnimeList] = useState<any[]>([]); // Store anime list
    const [user, setUser] = useState<any>(null); // Store current user

    // Function to fetch added anime from Firestore
    const getAnimeFromProfile = async (userId: string) => {
        try {
            const animeCollectionRef = collection(db, "addedAnime");
            const q = query(animeCollectionRef, where("user_id", "==", userId));
            const querySnapshot = await getDocs(q);

            const fetchedAnime = querySnapshot.docs.map((doc) => doc.data());
            setAnimeList(fetchedAnime); // Set fetched anime data in state
        } catch (error) {
            console.error("Error fetching anime from Firestore:", error);
        }
    };

    // Listen to authentication state changes
    useEffect(() => {
        const auth = getAuth(app);
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set user state if logged in
                getAnimeFromProfile(currentUser.uid); // Fetch anime data for the logged-in user
            } else {
                setUser(null); // Clear user state if not logged in
                setAnimeList([]); // Clear anime list if not logged in
                console.log("No user is logged in");
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    if (!user) {
        return <div>You must be logged in to view your profile.</div>;
    }

    return (
        <main>
            <ProtectedRoute>
                <LogNav />
                <div className="p-10">
                    <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

                    {/* Displaying the anime list */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-80 gap-6">
                        <AnimeList 
                        animelist={animeList}/>
                    </div>
                </div>
            </ProtectedRoute>
        </main>
    );
}
