import React from "react";

import {
    Home,
    Search,
    Key,
    FileCheck,
    Building,
    HeartHandshake,
} from "lucide-react";

import SpotlightCard from './ui/SpotlightCard';

const serviceList = [
    {
        title: "Property Listings",
        description:
            "Access our comprehensive database of residential and commercial properties, carefully curated and tailored to match your specific requirements and preferences",
        icon: <Home className="text-orange-500" size={32} />,
    },
    {
        title: "Property Search",
        description:
            "Utilize our sophisticated search tools and filters to help you discover the perfect property in your desired location, complete with detailed neighborhood insights",
        icon: <Search className="text-orange-500" size={32} />,
    },
    {
        title: "Property Management",
        description:
            "Experience hassle-free property management services designed specifically for landlords and property investors, including tenant screening, maintenance coordination, and financial reporting",
        icon: <Key className="text-orange-500" size={32} />,
    },
    {
        title: "Documentation",
        description:
            "Receive comprehensive assistance with all real estate documentation and legal requirements, ensuring a smooth and compliant transaction process from start to finish",
        icon: <FileCheck className="text-orange-500" size={32} />,
    },
    {
        title: "Investment Advisory",
        description:
            "Benefit from our expert strategic guidance on real estate investments and detailed market analysis, helping you maximize returns and make informed investment decisions",
        icon: <Building className="text-orange-500" size={32} />,
    },
    {
        title: "Expert Consultation",
        description:
            "Get personalized professional guidance from our team of experienced real estate consultants who understand the local market dynamics and your unique needs",
        icon: <HeartHandshake className="text-orange-500" size={32} />,
    },
];

const Services = () => {
    return (
        <section className="px-4 py-16 lg:px-8 space-y-8" id="services">
            {/* Title */}
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-gray-800">
                    Our Premium Services
                </h2>
                <p className="text-gray-600 text-lg">
                    Discover how we can help you find your dream home
                </p>
            </div>
            {/* Service List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceList.map((service, index) => (
                    <SpotlightCard
                        key={index}
                        className="relative bg-gray-100/50 p-6 rounded-lg hover:shadow-lg transition-custom cursor-pointer border border-zinc-200"
                        spotlightColor="rgba(249, 115, 22, 0.15)"
                    >
                        <div className="flex items-center justify-center mb-4 bg-gray-200 rounded-full w-16 h-16">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            {service.title}
                        </h3>
                        <p className="text-gray-600">{service.description}</p>
                    </SpotlightCard>
                ))}
            </div>
        </section>
    );
};

export default Services;
