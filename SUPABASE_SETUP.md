# Supabase Setup Guide for Elite Jetskis AE

This guide will help you set up your Supabase database so bookings can be saved.

## Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name**: Elite Jetskis AE (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project" (takes 1-2 minutes)

## Step 2: Run Database Migration

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the ENTIRE contents of `supabase/migrations/20251211193811_create_booking_system_schema_fixed.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

This will create:
- `packages` table
- `bookings` table  
- `time_slots` table
- All necessary functions, triggers, and RLS policies
- Initial package data (4 packages)

## Step 3: Verify Tables Were Created

1. Go to **Table Editor** (left sidebar)
2. You should see 3 tables:
   - `packages` (should have 4 rows)
   - `bookings` (empty initially)
   - `time_slots` (empty initially)

## Step 4: Get API Credentials

1. Go to **Settings** → **API** (left sidebar)
2. You'll need two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 5: Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site → **Site settings** → **Environment variables**
3. Click "Add variable" and add:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Your Project URL from Step 4
   - Scope: All scopes

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your anon public key from Step 4
   - Scope: All scopes

   **Variable 3 (server-side bookings):**
    - Key: `SUPABASE_URL` (can reuse the same Project URL)
    - Value: Your Project URL from Step 4
    - Scope: All scopes

   **Variable 4 (server-side bookings):**
    - Key: `SUPABASE_SERVICE_ROLE_KEY`
    - Value: Your Supabase service role key (from Settings → API)
    - Scope: All scopes
    - **Never expose this key in client code.** It is only used by the Netlify Function.

4. Click "Save"

## Step 6: Redeploy Your Site

1. In Netlify, go to **Deploys**
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete

## Step 7: Verify It's Working

1. Visit your live site
2. Click "Book Now"
3. Complete a test booking
4. Go back to Supabase → **Table Editor** → `bookings` table
5. You should see your test booking!

## Troubleshooting

### Bookings still not saving?

1. **Check browser console** (F12 → Console tab):
   - Look for any error messages
   - Check if Supabase connection errors appear

2. **Verify environment variables in Netlify**:
   - Go to Site settings → Environment variables
   - Make sure both variables are set correctly
   - No typos or extra spaces

3. **Check Supabase logs**:
   - Go to Supabase → **Logs** → **Postgres Logs**
   - Look for any errors when trying to insert

4. **Verify RLS policies**:
   - Go to Supabase → **Authentication** → **Policies**
   - Check that `bookings` table has "Anyone can create bookings" policy

5. **Check package IDs**:
   - Go to Supabase → **Table Editor** → `packages`
   - Make sure packages exist and have valid UUIDs
   - The `package_id` in bookings must match a package `id`

### Common Issues

**Error: "new row violates row-level security policy"**
- Solution: Make sure the RLS policy "Anyone can create bookings" exists

**Error: "foreign key violation"**
- Solution: The `package_id` doesn't exist. Make sure packages are inserted.

**Error: "Failed to fetch"**
- Solution: Check your Supabase URL and anon key are correct in Netlify

## Database Schema Overview

### Packages Table
- Stores tour packages (30min, 60min, 90min, 120min)
- Auto-populated by migration

### Bookings Table
- Stores all customer bookings
- Auto-generates booking reference (EJAE-YYYYMMDD-XXXX)
- Links to packages via `package_id`

### Time Slots Table
- Tracks availability for each date/time
- Auto-updated when bookings are created/cancelled

## Next Steps

Once bookings are saving:
1. Set up email notifications (optional)
2. Create admin dashboard to view bookings
3. Set up automated reports

