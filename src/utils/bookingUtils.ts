export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 8; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatPrice(price: number): string {
  return `${price.toFixed(0)} AED`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+971|00971|0)?[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function getAvailabilityColor(capacity: number): string {
  if (capacity === 0) return 'text-red-600';
  if (capacity <= 1) return 'text-yellow-600';
  return 'text-green-600';
}

export function getAvailabilityText(capacity: number): string {
  if (capacity === 0) return 'Fully Booked';
  if (capacity === 1) return 'Limited Availability';
  return 'Available';
}
