// src/app/components/BookingCalendar.tsx
'use client';
import {
    Search,
} from "lucide-react";
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DayPicker, DateRange } from 'react-day-picker';
import { fr } from 'react-day-picker/locale';
import 'react-day-picker/dist/style.css';
import generateTimeSlots from '../utils/timeDate';
import { useBookingStore } from '../store/bookingStore';
import { Vehicle } from '../types/vehicles';
import React from 'react';

type BookingCalendarProps = {
  vehicle: Vehicle;
};

function combineDateAndTime(date: Date, time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return combined.toISOString();
}


export function BookingCalendar({ vehicle }: BookingCalendarProps) {
  const startIso = useBookingStore((state) => state.start);
  const endIso = useBookingStore((state) => state.end);
  const setDates = useBookingStore((state) => state.setDates);

  const disabledDate = [{before: new Date()}]

  const router = useRouter();

  // on reconstruit une plage de dates pour DayPicker à partir du store
  const initialRange: DateRange | undefined = useMemo(() => {
    if (!startIso || !endIso) return undefined;
    return {
      from: new Date(startIso),
      to: new Date(endIso),
    };
  }, [startIso, endIso]);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    initialRange
  );
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  // slots horaires dispo
  const startTimeSlots = useMemo(
    () => generateTimeSlots(selectedRange?.from),
    [selectedRange?.from]
  );
  const endTimeSlots = useMemo(
    () => generateTimeSlots(selectedRange?.to),
    [selectedRange?.to]
  );

  // mettre à jour le store dès que la sélection change
  const updateStoreDates = (
    range: DateRange | undefined,
    startTimeValue: string,
    endTimeValue: string
  ) => {
    if (!range?.from || !range.to || !startTimeValue || !endTimeValue) return;
    const fromIso = combineDateAndTime(range.from, startTimeValue);
    const toIso = combineDateAndTime(range.to, endTimeValue);
    setDates(fromIso, toIso);
  };

  const handleSelectRange = (range: DateRange | undefined) => {
    setSelectedRange(range);
    updateStoreDates(range, startTime, endTime);
  };

  const handleChangeStartTime = (value: string) => {
    setStartTime(value);
    updateStoreDates(selectedRange, value, endTime);
  };

  const handleChangeEndTime = (value: string) => {
    setEndTime(value);
    updateStoreDates(selectedRange, startTime, value);
  };

  const handleGoToSummary = () => {
    if (!startIso || !endIso) return;
    router.push(`/recapitulatif/${vehicle.id}`);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelectRange}
        locale={fr}
        disabled={disabledDate}
      />

      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <div>
          <label>
            Heure début :
            <select
              value={startTime}
              onChange={(e) => handleChangeStartTime(e.target.value)}
              disabled={!selectedRange?.from || startTimeSlots.length === 0}
            >
              <option value="">--</option>
              {startTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Heure fin :
            <select
              value={endTime}
              onChange={(e) => handleChangeEndTime(e.target.value)}
              disabled={!selectedRange?.to || endTimeSlots.length === 0}
            >
              <option value="">--</option>
              {endTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      
      <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors" onClick={handleGoToSummary}>
      <Search size={20} /> Rechercher
      </button>        
    </div>
  );
}
