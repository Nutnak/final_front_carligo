"use client";
import React, { useState } from "react";
import {
    MoveUpRight,
    MapPin,
    Home,
    Bed,
    Bath,
    Maximize,
    DollarSign,
    Search,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import BlurText from "./ui/BlurText";
import { BookingCalendar } from "./BookingCalendar";

const HeroBanner = () => {
    const [formData, setFormData] = useState({
        location: "",
        propertyType: "",
        beds: "2",
        baths: "2",
        size: "1000",
        maxPrice: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("👍 Submitted successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setFormData({
            location: "",
            propertyType: "",
            beds: "2",
            baths: "2",
            size: "1000",
            maxPrice: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section className="w-screen min-h-screen px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
            <div
                style={{
                    backgroundImage:
                        "url('/herobanner.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    objectFit: "cover",
                }}
                className="relative w-full min-h-[90vh] rounded-2xl p-5 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center"
            >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black/30 rounded-2xl z-10" />
                {/* Heading and CTA */}
                <div className="relative z-10 flex justify-center items-center lg:items-start xl:pb-10 flex-col gap-4 lg:gap-6 xl:gap-10 mt-5 xl:px-10 xl:mt-50">
                    <BlurText
                        text="Votre liberté sur 4 roues."
                        delay={200}
                        animateBy="words"
                        direction="top"
                        className="text-3xl lg:text-5xl font-bold text-white font-lexend text-center lg:text-left"
                    />
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.1,
                            duration: 0.5,
                            ease: "easeInOut",
                        }}
                        viewport={{ once: true }}
                        className="bg-white text-black px-6 py-3 rounded-full flex-between-x gap-2 hover:bg-black hover:text-white transition-custom"
                    >
                        <p className="font-medium">Explore Properties</p>
                        <MoveUpRight size={16} />
                    </motion.button>
                </div>
                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="relative z-20 w-full xl:max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg"
                >
                    <h2 className="text-xl font-semibold mb-4 text-black">
                        Réservez dès maintenant votre véhicule.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 text-sm font-medium pl-2 hidden md:block">
                                Localisation
                            </label>
                            <div className="flex items-center gap-2 border border-zinc-300 rounded-full px-4 py-2">
                                <MapPin size={20} />
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent outline-none"
                                >
                                    <option value="">Select Location</option>
                                    <option value="massy">Massy</option>
                                    <option value="viry-chatillon">Viry Chatillon</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 text-sm font-medium pl-2 hidden md:block">
                                Type de véhicule
                            </label>
                            <div className="flex items-center gap-2 border border-zinc-300 rounded-full px-4 py-2">
                                <Home size={20} />
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent outline-none"
                                >
                                    <option value="">Property Type</option>
                                    <option value="house">Tourisme</option>
                                    <option value="apartment">Utilitaire</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-gray-500 text-sm font-medium pl-2 hidden md:block">
                            Date de début de la location
                        </label>
                    </div>
                    <BookingCalendar/>
                </motion.form>
            </div>
        </section>
    );
};

export default HeroBanner;
