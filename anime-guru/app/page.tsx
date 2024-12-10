"use client"
import { TypeAnimation } from "react-type-animation";
import Navbar from "./navbar";

export default function Home() {
  return (
    <main>
      <div className="w-full" >
        <Navbar/>
        <section className="bg-center bg-[url('/images/animelist.png')] ">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 text-4xl font-black pt-60">
            <TypeAnimation
              sequence={[
              "Catch up on your seasonals", 2000,
              "Catch up on your favorites", 2000,
              "Keep track of your watched history", 2000
              ]}
              repeat={Infinity}
              omitDeletionAnimation={true}
            />        
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Get your seasonal updates on what shows are coming, while keeping track of what you&aposre watching! Make tracking anime easier than ever.</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a href="/signup" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

