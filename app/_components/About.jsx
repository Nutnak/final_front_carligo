"use client";

import Image from "next/image";
import { Award, Users, Clock, FolderGit2, ArrowRight } from "lucide-react";
import CountUp from "./ui/CountUp";

const About = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Column - Image and Content */}
                <div className="space-y-6">
                    <div className="relative w-full h-[300px]">
                        <Image
                            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center lg:text-left font-lexend leading-tight">
                            Make Smart Property Investments
                        </h2>
                        <p className="text-gray-600 text-center lg:text-left text-base md:text-lg leading-relaxed">
                            With 15+ years in real estate, we provide expert
                            guidance for property investments. Our dedicated
                            team offers personalized solutions and insights for
                            informed decisions, while building lasting
                            relationships.
                        </p>
                        <div className="flex justify-center lg:justify-start pt-2">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                                Learn More
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Achievement Cards */}
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {/* Awards Card */}
                        <div className="bg-white border border-zinc-200 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
                            <div className="bg-orange-50 p-3 rounded-full mb-4">
                                <Award className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                            </div>
                            <div className="flex-between-x">
                                <CountUp
                                    from={0}
                                    to={250}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-2xl md:text-3xl font-bold text-gray-800 font-lexend mb-1"
                                />
                                <span className="text-2xl md:text-3xl font-bold text-gray-800 font-lexend">
                                    +
                                </span>
                            </div>
                            <p className="text-gray-600 font-lexend text-sm md:text-base">
                                Awards Received
                            </p>
                        </div>

                        {/* Satisfied Clients Card */}
                        <div className="bg-white border border-zinc-200 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
                            <div className="bg-orange-50 p-3 rounded-full mb-4">
                                <Users className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                            </div>
                            <div className="flex-between-x">
                                <CountUp
                                    from={0}
                                    to={1500}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-2xl md:text-3xl font-bold text-gray-800 font-lexend mb-1"
                                />
                                <span className="text-2xl md:text-3xl font-bold text-gray-800 font-lexend">
                                    +
                                </span>
                            </div>
                            <p className="text-gray-600 font-lexend text-sm md:text-base">
                                Satisfied Clients
                            </p>
                        </div>

                        {/* Experience Card */}
                        <div className="bg-white border border-zinc-200 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
                            <div className="bg-orange-50 p-3 rounded-full mb-4">
                                <Clock className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                            </div>
                            <div className="flex-between-x">
                                <CountUp
                                    from={0}
                                    to={15}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-2xl md:text-3xl font-bold text-gray-800 font-lexend mb-1"
                                />
                                <span className="text-2xl md:text-3xl font-bold text-gray-800 font-lexend">
                                    +
                                </span>
                            </div>
                            <p className="text-gray-600 font-lexend text-sm md:text-base">
                                Years Experience
                            </p>
                        </div>

                        {/* Projects Card */}
                        <div className="bg-white border border-zinc-200 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center">
                            <div className="bg-orange-50 p-3 rounded-full mb-4">
                                <FolderGit2 className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
                            </div>
                            <div className="flex-between-x">
                                <CountUp
                                    from={0}
                                    to={2000}
                                    separator=","
                                    direction="up"
                                    duration={1}
                                    className="count-up-text text-2xl md:text-3xl font-bold text-gray-800 font-lexend mb-1"
                                />
                                <span className="text-2xl md:text-3xl font-bold text-gray-800 font-lexend">
                                    +
                                </span>
                            </div>
                            <p className="text-gray-600 font-lexend text-sm md:text-base">
                                Projects Completed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
