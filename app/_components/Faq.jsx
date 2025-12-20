"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
    {
        id: 1,
        question: "Quels documents sont nécessaires pour louer un véhicule ?",
        answer: {
            text: "Pour toute location, vous devez présenter :",
            bullets: [
                "Un permis de conduire valide (depuis au moins 2 ans, selon le véhicule)",
                "Une pièce d’identité en cours de validité",
                "Une carte bancaire au nom du conducteur principal",
            ],
        },
    },
    {
        id: 2,
        question: "L’âge minimum est généralement de 21 ans.",
        answer: "Certains véhicules (utilitaires volumineux, véhicules premium) peuvent nécessiter 25 ans minimum.",
    },
    {
        id: 3,
        question: "Puis-je réserver pour une autre personne ?",
        answer: "Oui, à condition que le conducteur principal soit présent lors du retrait du véhicule avec ses documents.",
    },
    {
        id: 4,
        question: "Puis-je modifier ou annuler ma réservation ?",
        answer: "Oui. Les modifications et annulations sont possibles jusqu’à 24 ou 48 heures avant le départ, selon les conditions tarifaires choisies.",
    },
];

const Faq = () => {
    const [openId, setOpenId] = useState(1);

    const toggleOpen = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section
            className="px-4 py-16 lg:px-8 flex justify-between items-center flex-col lg:flex-row gap-4 lg:gap-12"
            id="faq"
        >
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800 text-center lg:text-left">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl text-center lg:text-left">
                    Find answers to common questions about buying and selling
                    properties. We're here to help make your real estate journey
                    smoother.
                </p>
                <div className="relative w-4/5 h-64 md:h-96 my-8 rounded-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1599409637219-d04e9a2db432?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="FAQ illustration"
                        fill
                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-2xl"
                        priority
                    />
                </div>
            </div>
            {/* FAQ Area */}
            <div className="w-full lg:w-1/2">
                <div className="bg-white p-8 rounded-lg shadow-md border border-zinc-200">
                    {faqData.map((item) => (
                        <motion.div
                            key={item.id}
                            className="mb-6 border-b border-zinc-300"
                            initial={false}
                        >
                            <motion.div
                                className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-custom"
                                onClick={() => toggleOpen(item.id)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.question}
                                </h3>
                                <motion.div
                                    animate={{
                                        rotate: openId === item.id ? 180 : 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <ChevronDown className="w-6 h-6 text-gray-600" />
                                </motion.div>
                            </motion.div>
                            <AnimatePresence>
                                {openId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: {
                                                height: {
                                                    duration: 0.4,
                                                    ease: "easeOut",
                                                },
                                                opacity: {
                                                    duration: 0.25,
                                                    delay: 0.15,
                                                },
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: {
                                                    duration: 0.4,
                                                    ease: "easeInOut",
                                                },
                                                opacity: {
                                                    duration: 0.25,
                                                },
                                            },
                                        }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="text-gray-600 mt-2 p-2 bg-gray-50 rounded-lg">
                                            {typeof item.answer === "string" ? (
                                                <p>{item.answer}</p>
                                            ) : (
                                                <>
                                                    <p>{item.answer.text}</p>
                                                    <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                                                        {item.answer.bullets.map(
                                                            (
                                                                bullet,
                                                                index
                                                            ) => (
                                                                <li key={index}>
                                                                    {bullet}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
