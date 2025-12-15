import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, Users, MessageCircle, Loader2 } from 'lucide-react';
import { Package, BookingFormData } from '@/types';
import { formatPrice } from '@/utils/bookingUtils';

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

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          packageId: pkg.id,
          bookingDate: bookingData.date,
          bookingTime: bookingData.time,
          customerName: bookingData.customerName,
          customerEmail: bookingData.customerEmail,
          customerPhone: bookingData.customerPhone,
          numParticipants: bookingData.numParticipants,
          emergencyContact: bookingData.emergencyContact,
          specialRequirements: bookingData.specialRequirements,
          totalPrice,
          promoCode
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          typeof result.error === 'string'
            ? result.error
            : result.error?.message || `Booking failed with status ${response.status}`;
        throw new Error(message);
      }

      if (!result.booking_reference) {
        throw new Error('Booking created but reference was not returned. Please contact support.');
      }

      onConfirm(result.booking_reference);
    } catch (err) {
      console.error('Booking error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error: ${errorMessage}. Please check your information and try again.`);
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
