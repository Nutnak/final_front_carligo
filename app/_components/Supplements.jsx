"use client";

import React, { useEffect, useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import Loader from './ui/Loader';

const SupplementItem = ({ supplement, onToggle, isSelected }) => (
  <div className={`flex items-center justify-between p-4 border rounded-lg ${isSelected ? 'bg-orange-100 border-orange-500' : 'bg-white'}`}>
    <div>
      <h4 className="font-semibold">{supplement.name}</h4>
      <p className="text-sm text-gray-600">{supplement.description}</p>
    </div>
    <div className="flex items-center">
      <span className="font-semibold mr-4">{supplement.price}€</span>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(supplement, !isSelected)}
        className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
      />
    </div>
  </div>
);

export default function Supplements({ vehicleId }) {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedSupplements, setSupplements: setStoreSupplements } = useBookingStore();

  useEffect(() => {
    if (!vehicleId) return;

    const fetchSupplements = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/supplements/${vehicleId}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });

        if (response.status === 304) {
          setSupplements([]);
          return;
        }

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des suppléments.');
        }

        const data = await response.json();

        let items = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.supplements)) items = data.supplements;
        else if (Array.isArray(data.data)) items = data.data;
        else if (Array.isArray(data.results)) items = data.results;

        const normalized = items.map((it) => ({
          id: it.supplement_id ?? it.id ?? it.supplementId ?? String(it.name),
          name: it.name ?? it.title ?? '',
          price: Number(it.price ?? it.prix ?? 0),
          description: it.description ?? it.desc ?? '',
          active: it.active ?? true,
        }));

        setSupplements(normalized);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, [vehicleId]);

  const handleToggleSupplement = (supplement, isSelected) => {
    const currentSupplements = selectedSupplements || [];
    let newSupplements;
    if (isSelected) {
      // avoid duplicates
      if (!currentSupplements.some(s => s.id == supplement.id)) {
        newSupplements = [...currentSupplements, supplement];
      } else {
        newSupplements = currentSupplements;
      }
    } else {
      newSupplements = currentSupplements.filter(s => s.id != supplement.id);
    }
    setStoreSupplements(newSupplements);
  };

  if (loading) return <div className="my-4"><Loader /></div>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!supplements || supplements.length === 0) return null;

  return (
    <div className="p-6 md:p-8 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Ajouter des suppléments</h3>
      <div className="space-y-4">
        {supplements.map(supplement => (
          <SupplementItem
            key={supplement.id}
            supplement={supplement}
            isSelected={(selectedSupplements || []).some(s => s.id == supplement.id)}
            onToggle={handleToggleSupplement}
          />
        ))}
      </div>
    </div>
  );
}
