export interface Package {
  id: string;
  name: string;
  duration_minutes: number;
  price_aed: number;
  description: string;
  image_url?: string;
  max_participants: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_reference: string;
  package_id: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  num_participants: number;
  emergency_contact?: string;
  special_requirements?: string;
  total_price: number;
  promo_code?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method: 'card' | 'cash';
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  id: string;
  slot_date: string;
  slot_time: string;
  available_capacity: number;
  total_capacity: number;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  packageId: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numParticipants: number;
  emergencyContact: string;
  specialRequirements: string;
  promoCode: string;
  acceptTerms: boolean;
}
