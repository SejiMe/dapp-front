'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const Landing = () => {
    const router = useRouter();
    function HandleGetStarted() {
        router.push('/auth/signin');
    }

    return (
        <section id='landing' className='relative min-h-screen overflow-hidden'>
            <div
                    className="absolute bg-no-repeat bg-fixed inset-0 hero min-h-screen "
                    style={{
                        backgroundImage:
                        "url('/images/mosquitoOnLeaf.webp')",
                    }}
            >
                <div className="hero-overlay"></div>
                <div className="absolute flex flex-col p-2 text-neutral-content top-1/5 left-0 lg:left-1/8">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Predict and prevent 
                    engue outbreaks</h1>
                    <p className="mb-5">
                        D-APP is a web app that uses real-time data and time series analysis to predict future dengue outbreaks. By analyzing weather patterns, historical case data, and geographic trends, the app provides early warnings, risk level maps, and health tips empowering users and health officials to take preventive action before outbreaks occur.
                    </p>
                    <button onClick={HandleGetStarted} className="w-full md:w-auto btn btn-accent">Get Started</button>
                    </div>
                </div>

            </div>
      </section>
  )
}

export default Landing