"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { fr } from 'react-day-picker/locale';
import { useBookingStore } from '../store/bookingStore';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { getAvailableStartTimes, getAvailableEndTimes } from '../_utils/time';
import { differenceInCalendarDays } from 'date-fns'; // Import pour le calcul des jours

// Fonction pour combiner la date et l'heure en format ISO
function combineDateAndTime(date, time) {
  if (!date || !time) return null;
  const [hours, minutes] = time.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return combined.toISOString();
}

export function VehicleBookingCalendar({ vehicle }) {
  const router = useRouter();
  const { setDates, start: startIso, end: endIso } = useBookingStore();

  const [selectedRange, setSelectedRange] = useState();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  
  const [disabledDates, setDisabledDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les dates de réservation existantes
  useEffect(() => {
    if (!vehicle?.id) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/booking/${vehicle.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: vehicle.id })
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const bookings = await response.json();
        const datesToDisable = bookings.map(b => ({ from: new Date(b.from), to: new Date(b.to) }));
        setDisabledDates(datesToDisable);
      } catch (error) {
        console.error("Error fetching disabled dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [vehicle?.id]);

  // Mettre à jour le store global quand les dates/heures changent
  useEffect(() => {
    if (selectedRange?.from && selectedRange?.to && startTime && endTime) {
      const fromIso = combineDateAndTime(selectedRange.from, startTime);
      const toIso = combineDateAndTime(selectedRange.to, endTime);
      if (fromIso && toIso) {
        setDates(fromIso, toIso);
      }
    }
  }, [selectedRange, startTime, endTime, setDates]);

  // Générer les listes d'heures disponibles
  const availableStartTimes = useMemo(() => getAvailableStartTimes(selectedRange?.from), [selectedRange?.from]);
  const availableEndTimes = useMemo(() => getAvailableEndTimes(selectedRange?.to, selectedRange?.from, startTime), [selectedRange?.to, selectedRange?.from, startTime]);

  // Réinitialiser l'heure si elle devient invalide
  useEffect(() => {
    if (availableStartTimes.length > 0 && !availableStartTimes.includes(startTime)) {
      setStartTime(''); // Réinitialise si l'heure n'est plus valide
      setEndTime('');   // Réinitialise aussi l'heure de fin
    }
  }, [availableStartTimes, startTime]);

  useEffect(() => {
    if (availableEndTimes.length > 0 && !availableEndTimes.includes(endTime)) {
      setEndTime(''); // Réinitialise si l'heure n'est plus valide
    }
  }, [availableEndTimes, endTime]);

  // --- NOUVEAU : Calcul du prix ---
  const priceDetails = useMemo(() => {
    if (!selectedRange?.from || !selectedRange?.to || !vehicle?.price_per_day) {
      return null;
    }

    // Calcule la différence en jours calendaires. +1 car la location inclut le premier jour.
    const numberOfDays = differenceInCalendarDays(selectedRange.to, selectedRange.from) + 1;
    
    if (numberOfDays <= 0) return null;

    const rentalPrice = numberOfDays * vehicle.price_per_day;
    const deposit = 200; // Caution fixe
    const totalPrice = rentalPrice + deposit;

    return {
      numberOfDays,
      rentalPrice,
      deposit,
      totalPrice,
    };
  }, [selectedRange, vehicle?.price_per_day]);
  // --- FIN NOUVEAU ---


  const handleGoToSummary = () => {
    if (!startIso || !endIso) {
        alert("Veuillez sélectionner une plage de dates et des heures valides.");
        return;
    };
    router.push(`/recapitulatif/${vehicle.id}`);
  };
  
  const allDisabledDates = [{ before: new Date() }, ...disabledDates];

  if (loading) {
    return <div className="text-center">Chargement des disponibilités...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={setSelectedRange}
        locale={fr}
        disabled={allDisabledDates}
        className="w-full"
      />
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
          <select
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={!selectedRange?.from || availableStartTimes.length === 0}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">--:--</option>
            {availableStartTimes.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
          <select
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!selectedRange?.to || !startTime || availableEndTimes.length === 0}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">--:--</option>
            {availableEndTimes.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- NOUVEAU : Affichage du résumé du prix --- */}
      {priceDetails && (
        <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Résumé du prix</h3>
          <div className="flex justify-between text-gray-600">
            <span>{vehicle.price_per_day}€ x {priceDetails.numberOfDays} jours</span>
            <span>{priceDetails.rentalPrice.toLocaleString()}€</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Caution</span>
            <span>{priceDetails.deposit.toLocaleString()}€</span>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>{priceDetails.totalPrice.toLocaleString()}€</span>
          </div>
        </div>
      )}
      {/* --- FIN NOUVEAU --- */}

      <button 
        type="button" 
        className="w-full bg-orange-500 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:bg-gray-400"
        onClick={handleGoToSummary}
        disabled={!startIso || !endIso}
      >
        <Search size={20} /> Réserver
      </button>
    </div>
  );
}
