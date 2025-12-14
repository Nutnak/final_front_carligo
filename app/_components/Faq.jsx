"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
    {
        id: 1,
        question: "What documents do I need to buy a house?",
        answer: "To buy a house, you'll typically need proof of income (W-2s, pay stubs), tax returns, bank statements, proof of assets, credit report, and valid ID. Additional documents may be required depending on your specific situation.",
    },
    {
        id: 2,
        question: "What's the best time to buy a house?",
        answer: "The best time to buy depends on various factors including market conditions, interest rates, and your personal circumstances. Generally, winter months may offer better deals due to less competition, while spring and summer typically have more inventory.",
    },
    {
        id: 3,
        question: "How long does the home buying process take?",
        answer: "The home buying process typically takes 30-60 days from offer acceptance to closing. However, this timeline can vary depending on factors such as loan approval, home inspection results, and other contingencies.",
    },
    {
        id: 4,
        question: "What should I look for during a property viewing?",
        answer: "During a viewing, pay attention to the property's structural condition, signs of dampness or mold, electrical systems, plumbing, natural lighting, storage space, and the overall neighborhood. It's also important to check noise levels and visit at different times of day.",
    },
    {
        id: 5,
        question: "Should I get a home inspection?",
        answer: "Yes, a home inspection is highly recommended. It helps identify potential issues with the property that may not be visible during a casual walkthrough and can save you from expensive repairs in the future.",
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
                                        <p className="text-gray-600 mt-2 p-2 bg-gray-50 rounded-lg">
                                            {item.answer}
                                        </p>
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
