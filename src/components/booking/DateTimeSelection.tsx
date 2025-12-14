import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Package, TimeSlot } from '../../types';
import { generateTimeSlots, formatDate, getAvailabilityColor, getAvailabilityText } from '../../utils/bookingUtils';

interface Props {
  package: Package;
  onSelect: (date: string, time: string) => void;
  onBack: () => void;
}

export default function DateTimeSelection({ package: pkg, onSelect, onBack }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const availableDates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return formatDate(date);
  });

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [selectedDate]);

  async function fetchAvailability(date: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .eq('slot_date', date);

    if (!error && data) {
      const slotsMap = new Map<string, number>();
      data.forEach((slot: TimeSlot) => {
        slotsMap.set(slot.slot_time, slot.available_capacity);
      });
      setAvailableSlots(slotsMap);
    } else {
      setAvailableSlots(new Map());
    }
    setLoading(false);
  }

  const getSlotAvailability = (time: string): number => {
    return availableSlots.get(time) ?? 4;
  };

  const isTimeInPast = (date: string, time: string): boolean => {
    const now = new Date();
    const slotDateTime = new Date(`${date}T${time}`);
    return slotDateTime < now;
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-[#E31E24] mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to packages</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-black text-[#0A1128] mb-2">
          Select Date & Time
        </h2>
        <p className="text-gray-600 mb-8">
          Booking for: <span className="font-bold text-[#E31E24]">{pkg.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-[#E31E24]" size={24} />
              <h3 className="text-xl font-bold text-[#0A1128]">Select Date</h3>
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
                      {dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    {isToday && (
                      <div className="text-xs mt-1 opacity-90">Today</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="text-[#E31E24]" size={24} />
              <h3 className="text-xl font-bold text-[#0A1128]">Select Time</h3>
            </div>

            {!selectedDate ? (
              <div className="text-center py-12 text-gray-400">
                Please select a date first
              </div>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31E24] mx-auto" />
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto border rounded-lg">
                {timeSlots.map((time) => {
                  const availability = getSlotAvailability(time);
                  const isPast = isTimeInPast(selectedDate, time);
                  const isDisabled = availability === 0 || isPast;

                  return (
                    <button
                      key={time}
                      onClick={() => !isDisabled && setSelectedTime(time)}
                      disabled={isDisabled}
                      className={`w-full text-left px-4 py-3 border-b transition-colors ${
                        isDisabled
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTime === time
                          ? 'bg-[#E31E24] text-white hover:bg-[#E31E24]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{time}</span>
                        <span className={`text-sm ${
                          selectedTime === time ? 'text-white' : getAvailabilityColor(availability)
                        }`}>
                          {isPast ? 'Past' : getAvailabilityText(availability)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t">
          <div>
            {selectedDate && selectedTime && (
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-[#0A1128]">Selected:</p>
                <p>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p>at {selectedTime}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-8 py-3 rounded-full font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
