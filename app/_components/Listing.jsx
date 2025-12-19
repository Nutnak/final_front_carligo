"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, ArrowRight } from "lucide-react"; // Changed icons
import GlareHover from "./ui/GlareHover";
import { useBookingStore } from "../store/bookingStore";
import Loader from "./ui/Loader";

const Listing = () => {
    const { start: startDate, end: endDate } = useBookingStore();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false); // Set initial loading to false
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            if (!startDate || !endDate) {
                setListings([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/api/vehicles/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        start_date: startDate,
                        end_date: endDate,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch listings");
                }

                const apiResponse = await response.json();
                setListings(apiResponse.data || []); // Access the .data property
            } catch (err) {
                setError(err.message);
                setListings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [startDate, endDate]);

    return (
        <section
            className="px-4 py-16 lg:px-8 space-y-4 md:space-y-8"
            id="nos-vehicules"
        >
            {/* Heading */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">
                        Nos véhicules
                    </h2>
                </div>
            </div>
            {/* Listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
                {loading ? (
                    <div className="col-span-full flex justify-center">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="col-span-full text-center text-red-500">
                        <p>Erreur: {error}</p>
                        <p>Veuillez vérifier que votre API est bien lancée sur http://localhost:3000.</p>
                    </div>
                ) : listings.length > 0 ? (
                    listings.map((listing) => (
                        <Link href={`/vehicules/${listing.id}`} key={listing.id}>
                        <div className="w-full cursor-pointer">
                            <div className="relative w-full h-52 group">
                                <GlareHover
                                    glareColor="#ffffff"
                                    glareOpacity={0.3}
                                    glareAngle={-30}
                                    glareSize={300}
                                    transitionDuration={1500}
                                    playOnce={false}
                                    className="w-full h-52 z-100"
                                >
                                    <div className="absolute inset-0 bg-black/20 rounded-lg z-5" />
                                    <Image
                                        src={listing.image_url || "https://press.kia.com/content/dam/kiapress/FR/Communiques_de_presse_fr/2024/kia-france-lance-la-nouvelle-kia-picanto-serie-limitee-first-edition/Nouvelle-Kia-Picanto-serie-limitee-First-Edition.jpg"}
                                        alt={`${listing.brand} ${listing.model}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover rounded-lg"
                                    />
                                </GlareHover>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-black">
                                        {`${listing.price_per_day.toLocaleString()}€/jour`}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-black line-clamp-2">
                                    {`${listing.brand} ${listing.model}`}
                                </h3>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Car className="w-4 h-4" />
                                        <span className="capitalize">{listing.vehicle_type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : (
                     <div className="col-span-full text-center text-gray-500">
                        {startDate && endDate ? "Aucun véhicule disponible pour les dates sélectionnées." : "Veuillez sélectionner une période pour voir les véhicules disponibles."}
                    </div>
                )}
            </div>
            {/* Listing Button */}
            <div className="flex justify-center">
                <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-600">
                    <span className="relative z-10">Voir tous les véhicules</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
            </div>
        </section>
    );
};

export default Listing;
