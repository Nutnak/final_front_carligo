"use client";
import React from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper Modules
import { Autoplay } from "swiper/modules";

// Import Quote Icon
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "James Wilson",
        profession: "Business Executive",
        message:
            "Found my dream home through this agency. Their attention to detail and understanding of my needs was exceptional. The entire process was smooth and professional.",
        image: "https://images.unsplash.com/photo-1612683347796-c883224efbe2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEJ1c2luZXNzJTIwbWFuJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "Robert Thompson",
        profession: "Software Engineer",
        message:
            "As a tech professional with a busy schedule, I appreciated their efficient and tech-savvy approach. They made house hunting a breeze!",
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=48&h=48&facepad=2&q=80",
    },
    {
        name: "Michael Chen",
        profession: "Restaurant Owner",
        message:
            "Their market knowledge is unparalleled. They helped me find the perfect commercial property in a prime location for my business.",
        image: "https://images.unsplash.com/photo-1675194141373-0496526eb916?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEJ1c2luZXNzJTIwbWFuJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "David Martinez",
        profession: "Architect",
        message:
            "As someone who understands building design, I was impressed by their portfolio selection. They found me a property that perfectly matched my architectural preferences.",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48&facepad=2&q=80",
    },
    {
        name: "Thomas Anderson",
        profession: "Investment Banker",
        message:
            "Their expertise in luxury properties is outstanding. They helped me secure a high-end property that has already appreciated in value.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=48&h=48&facepad=2&q=80",
    },
    {
        name: "Christopher Lee",
        profession: "Doctor",
        message:
            "Despite my hectic schedule, they were always available and found me a beautiful home close to my practice. Excellent service!",
        image: "https://images.unsplash.com/photo-1631613491751-3db1a8fad04f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    },
    {
        name: "Daniel Brown",
        profession: "University Professor",
        message:
            "Their knowledge of the local school districts helped me find the perfect family home in an excellent educational area.",
        image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&w=48&h=48&facepad=2&q=80",
    },
    {
        name: "Steven Clark",
        profession: "Legal Consultant",
        message:
            "The attention to legal details during the purchase process was impressive. They made what could have been a complex transaction very straightforward.",
        image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=facearea&w=48&h=48&facepad=2&q=80",
    },
];

const Testimonials = () => {
    return (
        <section className="px-4 py-16 lg:px-8 space-y-8" id="testimonials">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-gray-800">
                    What Our Clients Say
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover why countless satisfied customers trust us with
                    their real estate needs
                </p>
            </div>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="py-8"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col gap-6 border border-zinc-200">
                            <p className="text-gray-600 flex-grow text-xl">
                                {testimonial.message}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-12 h-12">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="rounded-full object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {testimonial.profession}
                                        </p>
                                    </div>
                                </div>
                                <Quote className="text-orange-500 w-10 h-10" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
