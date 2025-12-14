# Elite Jetskis AE - Website

Premium Jet Ski Rentals in Dubai with tours of Burj Al Arab, Atlantis, and Dubai skyline.

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Supabase** for backend/database
- **Lucide React** for icons

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings.

## Netlify Deployment

This project is configured for Netlify deployment.

### Prerequisites

1. A Netlify account
2. Your Supabase project URL and anon key

### Deployment Steps

1. **Push your code to GitHub** (already done)

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to your GitHub repository: `ahmedd351761-a11y/elitejetskiae`

3. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (These are already configured in `netlify.toml`)

4. **Set Environment Variables:**
   - Go to Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

5. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Automatic Deployments

Once connected, Netlify will automatically deploy:
- Every push to the `main` branch triggers a production deployment
- Pull requests get preview deployments

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── lib/         # Utilities (Supabase client)
│   ├── types/       # TypeScript types
│   └── utils/       # Helper functions
├── supabase/        # Database migrations
└── netlify.toml     # Netlify configuration
```

## Features

- 🏄 Jet Ski tour packages
- 📅 Booking system with Supabase
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure booking management

