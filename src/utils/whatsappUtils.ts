import { BookingFormData } from '@/types';
import { formatPrice } from '@/utils/bookingUtils';

const WHATSAPP_NUMBER = '971526977676';

export function buildWhatsAppBookingUrl(options: {
  packageName: string;
  packageDuration: number;
  totalPrice: number;
  bookingData: BookingFormData;
}): string {
  const { packageName, packageDuration, totalPrice, bookingData } = options;
  const dateLabel = new Date(bookingData.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const lines = [
    'Hi Elite Jetskis AE! I would like to book a jet ski tour.',
    '',
    `Package: ${packageName} (${packageDuration} min)`,
    `Date: ${dateLabel}`,
    `Time: ${bookingData.time}`,
    `Participants: ${bookingData.numParticipants}`,
    `Total: ${formatPrice(totalPrice)}`,
    `Name: ${bookingData.customerName}`,
    `Email: ${bookingData.customerEmail}`,
    `Phone: ${bookingData.customerPhone}`,
  ];

  if (bookingData.emergencyContact) {
    lines.push(`Emergency contact: ${bookingData.emergencyContact}`);
  }

  if (bookingData.specialRequirements) {
    lines.push(`Special requirements: ${bookingData.specialRequirements}`);
  }

  if (bookingData.promoCode) {
    lines.push(`Promo code: ${bookingData.promoCode}`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}
