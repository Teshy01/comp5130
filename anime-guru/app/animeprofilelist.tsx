/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'


export const AnimeList = ({ animelist }: any) => {

    return (
    <>
    {
        animelist ? (
            animelist.map((anime: any, index: any) => {
                return (
                    <div className="w-60 h-20 pl-0 pr-0 pt-0 pb-4 text-center relative hover:scale-110" key={index}>
                        <Link href={{
                            pathname: `/${anime.mal_id}`,
                            query: {
                                mal: `${anime.mal_id}`,
                            },
                            }}>
                            <img src={anime.image_url} width={230} height={300} alt="animeCardImg"/>
                        </Link>
                        <div className="">
                            <p>{anime.anime_name}</p>
                        </div>
                    </div>
                )
            })
        ):"Not Found"
    }
    </>
    );
}   