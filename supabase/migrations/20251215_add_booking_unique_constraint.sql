-- Add unique constraint to prevent double bookings for the same package/date/time
-- This is a database-level guarantee that works alongside the Netlify Function check

-- First, create a partial unique index that only applies to non-cancelled bookings
-- This allows the same slot to be booked again if a previous booking was cancelled
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_slot 
ON bookings (package_id, booking_date, booking_time) 
WHERE status != 'cancelled';

-- Add an index to speed up availability queries
CREATE INDEX IF NOT EXISTS idx_bookings_availability 
ON bookings (package_id, booking_date, status);

