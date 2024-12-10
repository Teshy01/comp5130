"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../loginnavbar";
import { AnimeData, AnimeApiResponse } from "../types";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../lib/firestore"; // assuming you have this file to export Firestore db instance
import { getAuth } from "firebase/auth";
import app from "../lib/firebase"; // Import the initialized Firebase app

export default function AnimeDeets({ searchParams }: { searchParams: { mal: string } }) {
    const [animeData, setAnimeData] = useState<AnimeData | null>(null); // Set initial state as null
    const [isInCollection, setIsInCollection] = useState(false); // Track if anime is in the user's collection
    
    const getAnimeData = async () => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${searchParams.mal}`);
        const data: AnimeApiResponse = await response.json();
        setAnimeData(data.data); // Set the data
    };

    useEffect(() => {
        getAnimeData();

        // Check if the anime is already in the collection for the current user
        const checkIfInCollection = async () => {
            const auth = getAuth(app); // Initialize Firebase Auth
            const user = auth.currentUser;

            if (user) {
                const animeCollectionRef = collection(db, "addedAnime");
                const q = query(animeCollectionRef, where("mal_id", "==", searchParams.mal), where("user_id", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setIsInCollection(true); // Anime is already in the collection
                } else {
                    setIsInCollection(false); // Anime is not in the collection
                }
            }
        };

        checkIfInCollection();
    }, [searchParams.mal]);

    const addToProfile = async () => {
        if (!animeData) return;

        const auth = getAuth(app); // Initialize Firebase Auth
        const user = auth.currentUser;

        if (!user) {
            alert("You must be logged in to add to your profile.");
            return;
        }

        try {
            // Check if anime already exists for the current user
            const animeCollectionRef = collection(db, "addedAnime");
            const q = query(animeCollectionRef, where("mal_id", "==", searchParams.mal), where("user_id", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // If the anime already exists, remove it from the collection
                const animeDocRef = querySnapshot.docs[0].ref;
                await deleteDoc(animeDocRef); // Delete the anime from the collection
                setIsInCollection(false); // Update the state
                //alert("Anime removed from your profile!");
            } else {
                // If the anime doesn't exist, add it to the collection
                const animeDataToAdd = {
                    anime_name: animeData.title_english,
                    image_url: animeData.images?.jpg?.large_image_url || "", // Fallback to empty string if no image
                    mal_id: searchParams.mal,
                    user_id: user.uid, // Store the user ID to associate the anime with the logged-in user
                    addedAt: new Date(),
                };

                // Add the anime data to Firestore
                await addDoc(animeCollectionRef, animeDataToAdd);
                setIsInCollection(true); // Update the state
                //alert("Anime added to your profile successfully!");
            }
        } catch (error) {
            console.error("Error updating anime profile:", error);
            alert("Failed to update anime profile.");
        }
    };

    if (!animeData) {
        return <div>Loading...</div>; // Handle the loading state
    }

    return (
        <div>
            <Navbar />
            <div className="w-full h-full p-10 flex items-start space-x-10">
                {/* Image Section */}
                <div className="flex-shrink-0">
                    {animeData.images?.jpg?.large_image_url ? (
                        <img
                            src={animeData.images.jpg.large_image_url}
                            alt={animeData.title_english}
                            className="w-56 h-auto rounded-lg"
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                {/* Anime Info Section */}
                <div className="flex-grow bg-white p-6 rounded-xl shadow-lg bg-opacity-20">
                    <h2 className="text-2xl font-semibold mb-4">{animeData.title_english}</h2>
                    <p><strong>Name:</strong> {animeData.title_english}</p>
                    <p><strong>Rating:</strong> {animeData.rating}</p>
                    <p><strong>Score:</strong> {animeData.score}</p>
                    <p><strong>Popularity:</strong> {animeData.popularity}</p>
                    <p><strong>Status:</strong> {animeData.status}</p>
                    <p><strong>Season:</strong> {animeData.season}</p>
                    <p><strong>Episodes:</strong> {animeData.episodes}</p>
                    <p><strong>Synopsis:</strong> {animeData.synopsis}</p>

                    {/* Add/Remove from Profile Button */}
                    <button
                        className={`mt-6 px-6 py-2 font-semibold rounded-lg transition-colors border-2 
                            ${isInCollection ? "bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600" 
                            : "bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-blue-600"}`}
                        onClick={addToProfile}
                    >
                        {isInCollection ? "Remove from Profile" : "Add to Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
}
