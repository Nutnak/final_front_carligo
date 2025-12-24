"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useBookingStore } from '../../store/bookingStore';
import { differenceInCalendarDays } from 'date-fns';
import { format } from 'date-fns-tz';
import fr from 'date-fns/locale/fr';
import Loader from '../../_components/ui/Loader';
import Header from '../../_components/Header';
import Supplements from '../../_components/Supplements';

export default function RecapitulatifPage() {
  const params = useParams();
  const { id } = params;

  const { start: startIso, end: endIso, selectedSupplements } = useBookingStore();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
  });
  const [isOver21, setIsOver21] = useState(false);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevState => ({ ...prevState, [name]: value }));
  };

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
          throw new Error("Erreur lors de la récupération des données du véhicule.");
        }
        const data = await response.json();
        setVehicle(data.vehicles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const priceDetails = useMemo(() => {
    if (!startIso || !endIso || !vehicle?.price_per_day) {
      return null;
    }
    const startDate = new Date(startIso);
    const endDate = new Date(endIso);
    const numberOfDays = differenceInCalendarDays(endDate, startDate) + 1;
    if (numberOfDays <= 0) return null;

    const rentalPrice = numberOfDays * vehicle.price_per_day;
    const deposit = 200;
    const youngDriverFee = isOver21 ? 0 : 50;
    const supplementsPrice = selectedSupplements.reduce((total, sup) => total + sup.price, 0);
    const totalPrice = rentalPrice + deposit + youngDriverFee + supplementsPrice;

    return { numberOfDays, rentalPrice, deposit, youngDriverFee, supplementsPrice, totalPrice };
  }, [startIso, endIso, vehicle, isOver21, selectedSupplements]);

      const handlePayment = async () => {
    if (!priceDetails || !vehicle) return;

    try {
      // Note: Assurez-vous que cette URL correspond à votre route back-end
      const response = await fetch('http://localhost:3000/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicule_id: vehicle.id,
          amount: priceDetails.totalPrice * 100, // Stripe attend des centimes
          from: startIso,
          to: endIso,
          // L'objet customer est attendu par votre back-end
          customer: {
            email: customer.email,
            name: `${customer.firstName} ${customer.lastName}`,
            phone: customer.phone,
          },
          supplements: selectedSupplements,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || 'Failed to create Stripe checkout session');
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Stripe checkout URL not received');
      }
    } catch (error) {
      console.error(error);
      // Gérer l'erreur, par exemple afficher un message à l'utilisateur
      alert(`Erreur: ${error.message}`);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;
  if (error) return <div className="text-center mt-20 text-red-500"><p>Erreur : {error}</p></div>;
  if (!vehicle || !priceDetails) return <div className="text-center mt-20"><p>Données de réservation non disponibles.</p></div>;

  const formattedStartDate = format(new Date(startIso), "d MMMM yyyy 'à' HH:mm", { locale: fr, timeZone: 'Europe/Paris' });
  const formattedEndDate = format(new Date(endIso), "d MMMM yyyy 'à' HH:mm", { locale: fr, timeZone: 'Europe/Paris' });

  return (
    <>
      <Header />
      <section className="bg-gray-50 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Récapitulatif de votre réservation
          </h1>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image du véhicule */}
              <div className="relative h-64 md:h-auto">
                <Image
                  src={vehicle.image_url || "https://press.kia.com/content/dam/kiapress/FR/Communiques_de_presse_fr/2024/kia-france-lance-la-nouvelle-kia-picanto-serie-limitee-first-edition/Nouvelle-Kia-Picanto-serie-limitee-First-Edition.jpg"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Détails de la réservation */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
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

            <Supplements vehicleId={id} />

            </div>
            {/* Formulaire d'informations client */}
            <div className="p-6 md:p-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Vos informations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input type="text" id="lastName" name="lastName" value={customer.lastName} onChange={handleCustomerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2" />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input type="text" id="firstName" name="firstName" value={customer.firstName} onChange={handleCustomerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={customer.email} onChange={handleCustomerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" id="phone" name="phone" value={customer.phone} onChange={handleCustomerChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-2" />
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isOver21"
                      name="isOver21"
                      type="checkbox"
                      checked={isOver21}
                      onChange={(e) => setIsOver21(e.target.checked)}
                      className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="isOver21" className="font-medium text-gray-700">Je certifie avoir plus de 21 ans</label>
                    <p className="text-gray-500">Un supplément de 50€ pour jeune conducteur sera appliqué si vous avez moins de 21 ans.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé du prix */}
            <div className="p-6 md:p-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Résumé du prix</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>{vehicle.price_per_day}€ x {priceDetails.numberOfDays} jours</span>
                  <span>{priceDetails.rentalPrice.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Caution</span>
                  <span>{priceDetails.deposit.toLocaleString()}€</span>
                </div>
                {priceDetails.youngDriverFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                  <span>Supplément jeune conducteur</span>
                  <span>{priceDetails.youngDriverFee.toLocaleString()}€</span>
                  </div>
                )}

                {selectedSupplements.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <h4 className="font-semibold text-gray-700">Suppléments</h4>
                    {selectedSupplements.map(sup => (
                      <div key={sup.id} className="flex justify-between text-gray-600">
                        <span>{sup.name}</span>
                        <span>{sup.price.toLocaleString()}€</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>{priceDetails.totalPrice.toLocaleString()}€</span>
                </div>
              </div>
            </div>

            {/* Bouton de paiement */}
            <div className="p-6 md:p-8 bg-gray-50">
              <button
                onClick={handlePayment}
                className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                Payer maintenant
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
