"use client"; 
import React, { useEffect, useState } from "react";
import LogNav from "../loginnavbar";
import { AnimeList } from "../animelist"
import ProtectedRoute from "../protectedroute";

export default function SignUp() {

    const [seasonalData, setSeasonalData] = useState()
    const getData = async() => {
        const res = await fetch("https://api.jikan.moe/v4/seasons/now")
        const resData = await res.json()
        setSeasonalData(resData.data)
        console.log(resData)
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <main>
            <ProtectedRoute>
            <div className="w-full h-screen">
                <LogNav/>
                <div className="ml-60 mt-4">
                    <p className="ml-4 mb-4">Current Seasonals</p>
                    <div className="w-full m-auto flex">
                        <div className="w-80 h-full fixed left-0 top-0 z-11">
                        </div>
                        <div className="flex flex-col"> 
                            <div className="grid grid-rows-5 grid-flow-col grid-cols-subgrid gap-y-80 gap-4">
                                <AnimeList 
                                animelist={seasonalData}/>
                            </div>
                        </div>
                        <div className="ml-80 mt-4">
                        </div>
                    </div>
                </div>
            </div>
            </ProtectedRoute>
        </main>

    );
}