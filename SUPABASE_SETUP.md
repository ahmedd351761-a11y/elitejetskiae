# Supabase Setup Guide for Elite Jetskis AE

This guide will help you set up your Supabase database so bookings can be saved.

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name**: Elite Jetskis AE (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., Middle East or Europe)
5. Click "Create new project" (takes 1-2 minutes)

## Step 2: Run Database Migration

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the ENTIRE contents of `supabase/migrations/20251211193811_create_booking_system_schema_fixed.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

This will create:
- `packages` table (with 4 initial packages)
- `bookings` table  
- `time_slots` table
- All necessary functions, triggers, and RLS policies

## Step 3: Verify Tables Were Created

1. Go to **Table Editor** (left sidebar)
2. You should see 3 tables:
   - `packages` (should have 4 rows)
   - `bookings` (empty initially)
   - `time_slots` (empty initially)

## Step 4: Get API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. You'll need THREE values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (⚠️ Keep this secret! Used only server-side)

## Step 5: Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site → **Site settings** → **Environment variables**
3. Add the following 4 variables:

| Key | Value | Description |
|-----|-------|-------------|
| `VITE_SUPABASE_URL` | Your Project URL | Used by frontend to load packages |
| `VITE_SUPABASE_ANON_KEY` | Your anon public key | Used by frontend (safe to expose) |
| `SUPABASE_URL` | Your Project URL (same as above) | Used by Netlify Function |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service_role key | ⚠️ **SECRET** - Only for server-side |

4. Click "Save"

> ⚠️ **Important**: The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. Never expose it in client-side code. It's only used by the Netlify Function to create bookings securely.

## Step 6: Redeploy Your Site

1. In Netlify, go to **Deploys**
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete

## Step 7: Verify It's Working

1. Visit your live site
2. Click "Book Now"
3. Select a package, date, time, and fill in customer details
4. Complete the booking
5. Go to Supabase → **Table Editor** → `bookings` table
6. You should see your test booking!

---

## Troubleshooting

### Packages not loading?

1. **Check browser console** (F12 → Console tab)
2. Look for errors like:
   - `Failed to load packages: ...` - Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   - `relation "packages" does not exist` - Run the SQL migration (Step 2)

3. **Verify packages exist in Supabase**:
   - Go to Table Editor → `packages`
   - Should have 4 rows with `is_active = true`

### Bookings not saving?

1. **Check the error message on screen** - We now show real errors instead of silent failures

2. **Check Netlify Function logs**:
   - Go to Netlify → Functions → `createBooking`
   - Look for error messages

3. **Verify all 4 environment variables are set**:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   SUPABASE_URL
   SUPABASE_SERVICE_ROLE_KEY
   ```

4. **Check Supabase logs**:
   - Go to Supabase → **Logs** → **Postgres Logs**
   - Look for constraint violations or policy errors

### Common Error Messages

| Error | Solution |
|-------|----------|
| `Supabase environment variables are not set` | Add all 4 env vars to Netlify |
| `foreign key violation` | The package_id doesn't exist. Make sure packages are in the database |
| `This time slot is already booked` | Duplicate booking prevention working correctly |
| `Failed to load packages` | Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY |

---

## Architecture Overview

### Frontend (Client-Side)
- Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Only reads data (packages, time slots)
- Cannot insert bookings directly (for security)

### Backend (Netlify Function)
- Uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Handles booking creation securely
- Validates data and prevents duplicates
- Located at: `netlify/functions/createBooking.ts`

### Database Tables

**packages**
- Stores tour packages (30min, 60min, 90min, 120min)
- Read by frontend to display options

**bookings**
- Stores all customer bookings
- Auto-generates booking reference (EJAE-YYYYMMDD-XXXX)
- Created via Netlify Function only

**time_slots**
- Tracks availability for each date/time
- Auto-updated when bookings are created/cancelled

---

## Next Steps

Once bookings are saving:
1. Set up email notifications (Supabase Edge Functions or external service)
2. Create admin dashboard to view/manage bookings
3. Set up automated reports
4. Configure custom domain with HTTPS
