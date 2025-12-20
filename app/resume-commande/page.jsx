"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Loader from '../_components/ui/Loader';
import Header from '../_components/Header';
import Image from 'next/image';
import { format } from 'date-fns-tz';
import fr from 'date-fns/locale/fr';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("ID de session manquant.");
      setLoading(false);
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/payments/verify-session?session_id=${sessionId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de la récupération des détails de la réservation.");
        }
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [sessionId]);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;
  if (error) return <div className="text-center mt-20 text-red-500"><p>Erreur : {error}</p></div>;
  if (!booking) return <div className="text-center mt-20"><p>Détails de la réservation non trouvés.</p></div>;

  const { vehicle, from, to, amount } = booking;
  const formattedStartDate = format(new Date(from), "d MMMM yyyy 'à' HH:mm", { locale: fr, timeZone: 'Europe/Paris' });
  const formattedEndDate = format(new Date(to), "d MMMM yyyy 'à' HH:mm", { locale: fr, timeZone: 'Europe/Paris' });

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
                Merci pour votre réservation !
            </h1>
            <p className="text-gray-600 mt-2">Votre paiement a été traité avec succès. Voici un résumé de votre commande.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <Image
                src={vehicle.image_url || "https://press.kia.com/content/dam/kiapress/FR/Communiques_de_presse_fr/2024/kia-france-lance-la-nouvelle-kia-picanto-serie-limitee-first-edition/Nouvelle-Kia-Picanto-serie-limitee-First-Edition.jpg"}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900">{vehicle.brand} {vehicle.model}</h2>
              <p className="text-md text-gray-600 capitalize">{vehicle.vehicle_type}</p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Début de la location</h3>
                  <p className="text-gray-600">{formattedStartDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Fin de la location</h3>
                  <p className="text-gray-600">{formattedEndDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Détails du paiement</h3>
            <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total payé</span>
                <span>{(amount / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ResumeCommandePage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><Loader /></div>}>
                <ConfirmationContent />
            </Suspense>
        </>
    )
}
