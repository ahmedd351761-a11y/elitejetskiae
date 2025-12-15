import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

interface BookingPayload {
  packageId: string;
  bookingDate: string;
  bookingTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numParticipants: number;
  emergencyContact?: string;
  specialRequirements?: string;
  totalPrice: number;
  promoCode?: string;
}

export const handler: Handler = async (event) => {
  if (!supabaseUrl || !serviceRoleKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Supabase environment variables are not set.' })
    };
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const payload = safeParseBody(event.body);
  if (!payload) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON payload' }) };
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return { statusCode: 400, body: JSON.stringify({ error: validationError }) };
  }

  try {
    // Prevent duplicate bookings for the same package/time when not cancelled
    const { data: existing, error: existingError } = await supabase
      .from('bookings')
      .select('id,status')
      .eq('package_id', payload.packageId)
      .eq('booking_date', payload.bookingDate)
      .eq('booking_time', payload.bookingTime)
      .not('status', 'eq', 'cancelled')
      .limit(1);

    if (existingError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: existingError.message })
      };
    }

    if (existing && existing.length > 0) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'This time slot is already booked.' })
      };
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        package_id: payload.packageId,
        booking_date: payload.bookingDate,
        booking_time: payload.bookingTime,
        customer_name: payload.customerName,
        customer_email: payload.customerEmail,
        customer_phone: payload.customerPhone,
        num_participants: payload.numParticipants,
        emergency_contact: payload.emergencyContact || null,
        special_requirements: payload.specialRequirements || null,
        total_price: payload.totalPrice,
        promo_code: payload.promoCode || null,
        payment_method: 'cash',
        status: 'confirmed'
      })
      .select()
      .single();

    if (error || !data) {
      return { statusCode: 500, body: JSON.stringify({ error: error?.message || 'Failed to create booking.' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ booking_reference: data.booking_reference })
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { statusCode: 500, body: JSON.stringify({ error: message }) };
  }
};

function safeParseBody(body: string | null): BookingPayload | null {
  if (!body) return null;
  try {
    return JSON.parse(body) as BookingPayload;
  } catch {
    return null;
  }
}

function validatePayload(payload: BookingPayload): string | null {
  if (!payload.packageId) return 'packageId is required';
  if (!payload.bookingDate) return 'bookingDate is required';
  if (!payload.bookingTime) return 'bookingTime is required';
  if (!payload.customerName) return 'customerName is required';
  if (!payload.customerEmail) return 'customerEmail is required';
  if (!payload.customerPhone) return 'customerPhone is required';
  if (!payload.numParticipants || payload.numParticipants < 1) return 'numParticipants must be at least 1';
  if (typeof payload.totalPrice !== 'number') return 'totalPrice must be a number';
  return null;
}

