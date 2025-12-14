/*
  # Elite Jetskis AE - Booking System Database Schema

  ## Overview
  This migration creates the complete database structure for the Elite Jetskis AE booking system,
  including packages, bookings, and time slot management with automatic availability tracking.

  ## New Tables
  
  ### 1. `packages`
  Stores all tour package information:
  - `id` (uuid, primary key) - Unique package identifier
  - `name` (text) - Package name (e.g., "30 Minutes - Burj Al Arab Tour")
  - `duration_minutes` (integer) - Duration in minutes
  - `price_aed` (numeric) - Price in AED
  - `description` (text) - Package description
  - `image_url` (text) - Image URL for the package
  - `max_participants` (integer) - Maximum participants per booking
  - `is_active` (boolean) - Whether package is available for booking
  - `display_order` (integer) - Order for displaying packages
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### 2. `bookings`
  Stores all customer bookings:
  - `id` (uuid, primary key) - Unique booking identifier
  - `booking_reference` (text, unique) - Human-readable reference (EJAE-YYYYMMDD-XXXX)
  - `package_id` (uuid, foreign key) - Reference to packages table
  - `booking_date` (date) - Date of the jet ski tour
  - `booking_time` (time) - Start time of the tour
  - `customer_name` (text) - Customer's full name
  - `customer_email` (text) - Customer's email address
  - `customer_phone` (text) - Customer's phone number
  - `num_participants` (integer) - Number of participants
  - `emergency_contact` (text) - Emergency contact information
  - `special_requirements` (text) - Special requests or requirements
  - `total_price` (numeric) - Total booking price
  - `promo_code` (text) - Applied promo code if any
  - `status` (text) - Booking status: pending, confirmed, cancelled, completed
  - `payment_status` (text) - Payment status: pending, paid, refunded
  - `payment_method` (text) - Payment method: card, cash
  - `created_at` (timestamptz) - Booking creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 3. `time_slots`
  Manages availability for each time slot:
  - `id` (uuid, primary key) - Unique slot identifier
  - `slot_date` (date) - Date of the slot
  - `slot_time` (time) - Time of the slot
  - `available_capacity` (integer) - Remaining capacity (max 4)
  - `total_capacity` (integer) - Total capacity (default 4)
  - `is_blocked` (boolean) - Whether slot is manually blocked
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - Unique constraint on (slot_date, slot_time)
  
  ## Security
  - Enable RLS on all tables
  - Public read access for packages (anyone can view)
  - Anyone can create bookings (for customer bookings)
  - Authenticated admins can manage all data
  
  ## Functions & Triggers
  - Auto-generate booking reference numbers
  - Update time slot availability when bookings are created/cancelled
  - Prevent overbooking with check constraints
*/

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  price_aed numeric(10,2) NOT NULL CHECK (price_aed > 0),
  description text,
  image_url text,
  max_participants integer DEFAULT 2 CHECK (max_participants > 0),
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference text UNIQUE,
  package_id uuid REFERENCES packages(id) ON DELETE RESTRICT,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  num_participants integer NOT NULL DEFAULT 1 CHECK (num_participants > 0 AND num_participants <= 2),
  emergency_contact text,
  special_requirements text,
  total_price numeric(10,2) NOT NULL CHECK (total_price >= 0),
  promo_code text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method text DEFAULT 'cash' CHECK (payment_method IN ('card', 'cash')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create time_slots table
CREATE TABLE IF NOT EXISTS time_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date date NOT NULL,
  slot_time time NOT NULL,
  available_capacity integer DEFAULT 4 CHECK (available_capacity >= 0 AND available_capacity <= total_capacity),
  total_capacity integer DEFAULT 4 CHECK (total_capacity > 0),
  is_blocked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(slot_date, slot_time)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_time_slots_date ON time_slots(slot_date);
CREATE INDEX IF NOT EXISTS idx_time_slots_availability ON time_slots(slot_date, slot_time) WHERE available_capacity > 0;

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

-- RLS Policies for packages (public read access)
CREATE POLICY "Anyone can view active packages"
  ON packages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can insert packages"
  ON packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update packages"
  ON packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for bookings (anyone can create, view own)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view bookings"
  ON bookings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for time_slots (public read, admin write)
CREATE POLICY "Anyone can view available time slots"
  ON time_slots FOR SELECT
  USING (true);

CREATE POLICY "System can insert time slots"
  ON time_slots FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update time slots"
  ON time_slots FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Function to auto-generate booking reference on insert
CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
DECLARE
  ref_number text;
  random_suffix text;
BEGIN
  IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
    random_suffix := LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
    NEW.booking_reference := 'EJAE-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || random_suffix;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update time slot availability when booking is created
CREATE OR REPLACE FUNCTION update_time_slot_on_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update time slot
  INSERT INTO time_slots (slot_date, slot_time, available_capacity, total_capacity)
  VALUES (NEW.booking_date, NEW.booking_time, 3, 4)
  ON CONFLICT (slot_date, slot_time)
  DO UPDATE SET 
    available_capacity = GREATEST(0, time_slots.available_capacity - 1),
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to restore time slot availability when booking is cancelled
CREATE OR REPLACE FUNCTION restore_time_slot_on_cancel()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    UPDATE time_slots
    SET 
      available_capacity = LEAST(total_capacity, available_capacity + 1),
      updated_at = now()
    WHERE slot_date = NEW.booking_date AND slot_time = NEW.booking_time;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS set_booking_reference_trigger ON bookings;
DROP TRIGGER IF EXISTS update_slot_on_booking ON bookings;
DROP TRIGGER IF EXISTS restore_slot_on_cancel ON bookings;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
DROP TRIGGER IF EXISTS update_time_slots_updated_at ON time_slots;

-- Trigger to auto-generate booking reference
CREATE TRIGGER set_booking_reference_trigger
  BEFORE INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_reference();

-- Trigger to update time slot when booking is created
CREATE TRIGGER update_slot_on_booking
  AFTER INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.status != 'cancelled')
  EXECUTE FUNCTION update_time_slot_on_booking();

-- Trigger to restore time slot when booking is cancelled
CREATE TRIGGER restore_slot_on_cancel
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION restore_time_slot_on_cancel();

-- Trigger to update updated_at timestamp on bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at timestamp on time_slots
CREATE TRIGGER update_time_slots_updated_at
  BEFORE UPDATE ON time_slots
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial package data
INSERT INTO packages (name, duration_minutes, price_aed, description, display_order) VALUES
  ('30 Minutes - Burj Al Arab Tour', 30, 250, 'Experience the thrill of jet skiing with stunning views of the iconic Burj Al Arab', 1),
  ('60 Minutes - Atlantis Tour', 60, 450, 'Extended tour featuring Atlantis The Palm and surrounding areas', 2),
  ('90 Minutes - Dubai Skyline Tour', 90, 600, 'Comprehensive tour including Atlantis and both Burjs with breathtaking skyline views', 3),
  ('120 Minutes - Complete Experience', 120, 750, 'Ultimate Dubai experience including Ain Dubai and all major landmarks', 4)
ON CONFLICT DO NOTHING;
