"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Car, Users, Gauge, GitBranch } from 'lucide-react'; // Ajout d'icônes pertinentes

// Import des composants UI et de réservation
import Loader from '../../_components/ui/Loader';
import GlareHover from '../../_components/ui/GlareHover';
import BlurText from '../../_components/ui/BlurText';
import { VehicleBookingCalendar } from '../../_components/VehicleBookingCalendar';
import Header from '../../_components/Header';
import Faq from '../../_components/Faq';
import Footer from '../../_components/Footer';

export default function VehicleDetailPage() {
  const params = useParams();
  const { id } = params;

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("ID du véhicule manquant.");
      return;
    }

    const fetchVehicleDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/vehicles/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Véhicule non trouvé.");
          }
          throw new Error("Erreur lors de la récupération des données du véhicule.");
        }

        const data = await response.json();
        setVehicle(data.vehicles); // Accéder à la propriété "vehicles"

      } catch (err) {
        setError(err.message);
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>Erreur : {error}</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center mt-20">
        <p>Aucun véhicule trouvé.</p>
      </div>
    );
  }

  // Nouveau design de la page
  return (
  <>
    <Header/>
    <section className="w-full min-h-screen bg-gray-50 px-4 py-12 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne de gauche : Image */}
          <div className="flex items-start justify-center">
            <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.2}
                className="w-full h-auto aspect-video rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image
                  src={vehicle.image_url || "https://press.kia.com/content/dam/kiapress/FR/Communiques_de_presse_fr/2024/kia-france-lance-la-nouvelle-kia-picanto-serie-limitee-first-edition/Nouvelle-Kia-Picanto-serie-limitee-First-Edition.jpg"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>
            </GlareHover>
          </div>

          {/* Colonne de droite : Informations et Réservation */}
          <div className="flex flex-col gap-6">
            {/* Titre et Prix */}
            <div>
              <BlurText
                text={`${vehicle.brand} ${vehicle.model}`}
                as="h1"
                className="text-4xl lg:text-5xl font-bold text-gray-800 font-lexend"
              />
              <p className="text-3xl font-semibold text-orange-500 mt-2">
                {vehicle.price_per_day}€ <span className="text-base font-normal text-gray-500">/ jour</span>
              </p>
            </div>

            {/* Caractéristiques */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-200 py-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Car className="w-5 h-5 text-orange-500" />
                <span className="capitalize">{vehicle.vehicle_type}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Users className="w-5 h-5 text-orange-500" />
                <span>{vehicle.seats || 'N/A'} places</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Gauge className="w-5 h-5 text-orange-500" />
                <span>{vehicle.fuel_type || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <GitBranch className="w-5 h-5 text-orange-500" />
                <span className="capitalize">{vehicle.transmission || 'N/A'}</span>
              </div>
            </div>

            {/* Module de réservation */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Réservez vos dates
              </h2>
              {/* Le composant BookingCalendar a besoin du véhicule pour la redirection */}
              <VehicleBookingCalendar vehicle={vehicle} />
            </div>
          </div>
        </div>
    <Faq />
      </div>
    </section>
    <Footer />
  </>
  );
}