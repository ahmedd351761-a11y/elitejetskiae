import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, Users, MessageCircle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Package, BookingFormData } from '../../types';
import { formatPrice } from '../../utils/bookingUtils';

interface Props {
  package: Package;
  bookingData: BookingFormData;
  onConfirm: (reference: string) => void;
  onBack: () => void;
}

export default function BookingSummary({ package: pkg, bookingData, onConfirm, onBack }: Props) {
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = pkg.price_aed;

  // Generate a booking reference locally if Supabase is not available
  const generateBookingReference = (): string => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `EJAE-${dateStr}-${randomNum}`;
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        console.warn('Supabase not configured - generating local booking reference');
        // Generate a local booking reference and proceed
        const localReference = generateBookingReference();
        onConfirm(localReference);
        setLoading(false);
        return;
      }

      const { data, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          package_id: pkg.id,
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          customer_name: bookingData.customerName,
          customer_email: bookingData.customerEmail,
          customer_phone: bookingData.customerPhone,
          num_participants: bookingData.numParticipants,
          emergency_contact: bookingData.emergencyContact || null,
          special_requirements: bookingData.specialRequirements || null,
          total_price: totalPrice,
          promo_code: promoCode || null,
          payment_method: 'cash', // Changed from 'whatsapp' to 'cash' to match database constraint
          status: 'confirmed'
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Supabase booking error:', bookingError);
        // Show the actual error to help debug
        setError(`Failed to save booking: ${bookingError.message}. Please try again.`);
        setLoading(false);
        return;
      }

      if (data && data.booking_reference) {
        console.log('Booking saved successfully:', data);
        onConfirm(data.booking_reference);
      } else {
        // This shouldn't happen, but handle it gracefully
        console.error('Booking created but no reference returned:', data);
        setError('Booking created but reference not generated. Please contact support.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Booking error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      // Only use fallback for network errors, not database constraint errors
      if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed to fetch')) {
        const fallbackReference = generateBookingReference();
        console.warn('Network error - using fallback booking reference:', fallbackReference);
        setError('Database connection unavailable. Booking reference generated locally. You can still proceed with WhatsApp booking.');
        // Still proceed with the booking using local reference
        setTimeout(() => {
          onConfirm(fallbackReference);
        }, 2000);
      } else {
        // For other errors (like constraint violations), show error and don't proceed
        setError(`Error: ${errorMessage}. Please check your information and try again.`);
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-[#E31E24] mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to form</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-black text-[#0A1128] mb-2">
          Booking Summary
        </h2>
        <p className="text-gray-600 mb-8">
          Please review your booking details before confirming
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-4">Tour Details</h3>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-semibold text-[#0A1128]">{pkg.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-[#0A1128]">{pkg.duration_minutes} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar size={18} />
                  <span>{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock size={18} />
                  <span>{bookingData.time}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-4">Customer Details</h3>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={18} />
                  <span>{bookingData.customerName}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Mail size={18} />
                  <span>{bookingData.customerEmail}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Phone size={18} />
                  <span>{bookingData.customerPhone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users size={18} />
                  <span>{bookingData.numParticipants} {bookingData.numParticipants === 1 ? 'participant' : 'participants'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#0A1128] mb-4">Payment Details</h3>

              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-green-800">Pay via WhatsApp</span>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">
                    After confirming your booking, you'll be directed to send your details via WhatsApp. 
                    Our team will then share payment options including <strong>bank transfer</strong> or <strong>cash on arrival</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0A1128] mb-2">
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24]"
                    placeholder="Enter promo code"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Package Price:</span>
                    <span>{formatPrice(pkg.price_aed)}</span>
                  </div>
                  {promoCode && (
                    <div className="flex items-center justify-between text-green-600">
                      <span>Discount:</span>
                      <span>- 0 AED</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex items-center justify-between">
                    <span className="text-xl font-black text-[#0A1128]">Total:</span>
                    <span className="text-3xl font-black text-[#E31E24]">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 pt-6 border-t flex justify-end">
          <button
            onClick={handleConfirmBooking}
            disabled={loading}
            className="bg-[#E31E24] hover:bg-[#c41a20] text-white px-8 py-4 rounded-full font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:scale-105 disabled:hover:scale-100 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm Booking</span>
            )}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-4 text-gray-400 text-sm">
          <span>Secure Booking</span>
          <span>•</span>
          <span>Payment via WhatsApp</span>
          <span>•</span>
          <span>Instant Confirmation</span>
        </div>
      </div>
    </div>
  );
}
