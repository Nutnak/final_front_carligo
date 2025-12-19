"use client";
import React, { useState, useEffect } from "react";
import Header from "./_components/Header.jsx";
import HeroBanner from "./_components/HeroBanner.jsx";
import About from "./_components/About.jsx";
import Listing from "./_components/Listing.jsx";
import Services from "./_components/Services.jsx";
import Testimonials from "./_components/Testimonials.jsx";
import Faq from "./_components/Faq.jsx";
import Newsletter from "./_components/Newsletter.jsx";
import Footer from "./_components/Footer.jsx";
import Loader from "./_components/ui/Loader.jsx";
import { ToastContainer } from "react-toastify";

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // Adjust duration as needed
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            <Header />
            <HeroBanner />
            <About />
            <Listing />
            <Services />
            <Testimonials />
            <Faq />
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Page;
