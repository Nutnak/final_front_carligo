"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, LockKeyhole, MoveUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
    const navItems = [
        {
            name: "Accueil",
            path: "/",
        },
        {
            name: "Nos véhicules",
            path: "#nos-vehicules",
        },
        {
            name: "Services",
            path: "#services",
        },
        {
            name: "Testimonials",
            path: "#testimonials",
        },
        {
            name: "Contact",
            path: "#contact",
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isWindowScrolled = window.scrollY > 250;
            setIsScrolled(isWindowScrolled);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const menuVariants = {
        closed: {
            x: "100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
        },
    };

    const itemVariants = {
        closed: { x: 20, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        }),
    };

    return (
        <header
            className={`w-screen px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 lg:flex lg:justify-between lg:items-center ${
                isScrolled && "scrolled shadow-xl"
            }`}
        >
            {/* Logo Part */}
            <div className="flex-between-x relative">
                <a href="#" className="flex-between-x gap-2">
                    <div className="w-30 h-30 relative">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            fill
                            priority={true}
                            sizes="(max-width: 80px) 80px, 80px"
                        />
                    </div>
                </a>
                <button
                    className="lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X className="absolute top-2 right-2 z-[9999]" />
                    ) : (
                        <Menu />
                    )}
                </button>
            </div>
            {/* Navbar Part */}
            <nav className="hidden lg:block">
                <ul className="flex-between-x gap-10">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className="text-black hover:text-orange-500 hover:font-medium transition-custom"
                        >
                            <a href={item.path}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* CTA Buttons */}
            <div className="hidden lg:flex lg:justify-between lg:items-center gap-8">
            </div>
            {/* Animated Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed top-0 right-0 h-screen w-[80%] bg-white shadow-2xl lg:hidden z-[3000] p-8"
                    >
                        <div className="flex flex-col h-full">
                            <nav className="mt-16">
                                <ul className="space-y-6">
                                    {navItems.map((item, i) => (
                                        <motion.li
                                            custom={i}
                                            variants={itemVariants}
                                            key={item.name}
                                            className="text-xl font-medium"
                                        >
                                            <a
                                                href={item.path}
                                                className="hover:text-orange-500 transition-custom"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="mt-auto space-y-6">
                                <motion.button
                                    variants={itemVariants}
                                    custom={6}
                                    className="flex items-center gap-3 group w-full"
                                >
                                    <LockKeyhole className="group-hover:text-orange-500 transition-custom" />
                                    <p className="group-hover:text-orange-500 transition-custom font-medium">
                                        Login / Sign up
                                    </p>
                                </motion.button>
                                <motion.button
                                    variants={itemVariants}
                                    custom={7}
                                    className="flex items-center justify-center gap-2 group bg-black text-white px-8 py-4 rounded-full w-full hover:scale-105 hover:shadow-xl transition-custom"
                                >
                                    <p className="font-medium">Add Listing</p>
                                    <MoveUpRight size={20} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
