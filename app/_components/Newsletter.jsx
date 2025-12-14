"use client";
import { toast } from "react-toastify";

import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("👍 Subscribed successfully", {
            position: "bottom-right",
             autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setEmail("");
    };

    return (
        <section className="relative flex justify-center items-center flex-col min-h-[400] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1606654810659-8d4282752758?w=1920&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fFJlYWwlMjBFc3RhdGUlMjByb29tfGVufDB8fDB8fHww')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10" />

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-white">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-200 mb-8">
                        Stay updated with our latest property listings and real
                        estate insights.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-2 justify-center max-w-xl mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 text-gray-700 placeholder:text-gray-400 shadow-sm hover:shadow-md bg-white"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 active:bg-orange-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
