import { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Package } from '@/types';
import { generateTimeSlots, formatDate } from '@/utils/bookingUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  package: Package;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

export default function DateTimeSelection({ package: pkg, onSelect, onBack }: Props) {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const today = new Date();
  const availableDates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return formatDate(date);
  });

  const timeSlots = generateTimeSlots();

  // Fetch booked slots whenever date or package changes
  const fetchBookedSlots = useCallback(async (date: string, packageId: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Query bookings table directly for accurate availability
      // Only consider non-cancelled bookings
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('package_id', packageId)
        .eq('booking_date', date)
        .neq('status', 'cancelled');

      if (fetchError) {
        console.error('Error fetching availability:', fetchError);
        setError(t('booking.failedToLoad'));
        setBookedSlots(new Set());
        return;
      }

      // Create a set of booked times for O(1) lookup
      const booked = new Set<string>();
      if (data) {
        data.forEach((booking) => {
          // Normalize time format (remove seconds if present)
          const time = booking.booking_time.substring(0, 5);
          booked.add(time);
        });
      }
      
      setBookedSlots(booked);
      console.log(`Loaded availability for ${date}: ${booked.size} slots booked`);
    } catch (err) {
      console.error('Error fetching booked slots:', err);
      setError(t('booking.unableToCheck'));
      setBookedSlots(new Set());
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch availability when date changes
  useEffect(() => {
    if (selectedDate && pkg.id) {
      // Reset selected time when date changes
      setSelectedTime('');
      fetchBookedSlots(selectedDate, pkg.id);
    }
  }, [selectedDate, pkg.id, fetchBookedSlots]);

  const isTimeBooked = (time: string): boolean => {
    return bookedSlots.has(time);
  };

  const isTimeInPast = (date: string, time: string): boolean => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hours, minutes, 0, 0);
    return slotDateTime <= now;
  };

  const getSlotStatus = (time: string): 'available' | 'booked' | 'past' => {
    if (isTimeInPast(selectedDate, time)) return 'past';
    if (isTimeBooked(time)) return 'booked';
    return 'available';
  };

  const getSlotLabel = (status: 'available' | 'booked' | 'past'): string => {
    switch (status) {
      case 'past': return t('booking.past');
      case 'booked': return t('booking.booked');
      case 'available': return t('booking.available');
    }
  };

  const getSlotColor = (status: 'available' | 'booked' | 'past', isSelected: boolean): string => {
    if (isSelected) return 'text-white';
    switch (status) {
      case 'past': return 'text-gray-400';
      case 'booked': return 'text-red-500';
      case 'available': return 'text-green-600';
    }
  };

  const handleTimeSelect = (time: string) => {
    const status = getSlotStatus(time);
    if (status === 'available') {
      setSelectedTime(time);
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // Final check before proceeding
      const status = getSlotStatus(selectedTime);
      if (status !== 'available') {
        setError(t('booking.slotNoLongerAvailable'));
        setSelectedTime('');
        return;
      }
      onSelect(selectedDate, selectedTime);
    }
  };

  const handleRetry = () => {
    if (selectedDate && pkg.id) {
      fetchBookedSlots(selectedDate, pkg.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-[#E31E24] mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>{t('booking.backToPackages')}</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-black text-[#0A1128] mb-2">
          {t('booking.selectDateAndTime')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('booking.bookingFor')} <span className="font-bold text-[#E31E24]">{pkg.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-[#E31E24]" size={24} />
              <h3 className="text-xl font-bold text-[#0A1128]">{t('booking.selectDate')}</h3>
            </div>

            <div className="max-h-96 overflow-y-auto border rounded-lg">
              {availableDates.map((date) => {
                const dateObj = new Date(date);
                const isToday = formatDate(new Date()) === date;
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 transition-colors ${
                      selectedDate === date ? 'bg-[#E31E24] text-white hover:bg-[#E31E24]' : ''
                    }`}
                  >
                    <div className="font-semibold">
                      {dateObj.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    {isToday && (
                      <div className="text-xs mt-1 opacity-90">{t('booking.today')}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="text-[#E31E24]" size={24} />
              <h3 className="text-xl font-bold text-[#0A1128]">{t('booking.selectTime')}</h3>
            </div>

            {!selectedDate ? (
              <div className="text-center py-12 text-gray-400">
                {t('booking.pleaseSelectDate')}
              </div>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31E24] mx-auto" />
                <p className="text-gray-500 mt-4">{t('booking.checkingAvailability')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center space-x-2 bg-[#E31E24] hover:bg-[#c41a20] text-white px-4 py-2 rounded-full font-semibold transition-all"
                >
                  <RefreshCw size={16} />
                  <span>{t('booking.retry')}</span>
                </button>
              </div>
            ) : (
              <>
                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-600">{t('booking.available')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-600">{t('booking.booked')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <span className="text-gray-600">{t('booking.past')}</span>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto border rounded-lg">
                  {timeSlots.map((time) => {
                    const status = getSlotStatus(time);
                    const isDisabled = status !== 'available';
                    const isSelected = selectedTime === time;

                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isDisabled}
                        className={`w-full text-left px-4 py-3 border-b transition-colors ${
                          isDisabled
                            ? 'bg-gray-50 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#E31E24] text-white'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${isDisabled && !isSelected ? 'text-gray-400' : ''}`}>
                            {time}
                          </span>
                          <span className={`text-sm font-medium ${getSlotColor(status, isSelected)}`}>
                            {getSlotLabel(status)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t">
          <div>
            {selectedDate && selectedTime && (
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-[#0A1128]">{t('booking.selected')}</p>
                <p>{new Date(selectedDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p>{t('booking.at')} {selectedTime}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-8 py-3 rounded-full font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
          >
            {t('booking.continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
