# Mana Koo

Mana Koo is a modern, responsive property marketplace where users can buy, sell, and rent houses, apartments, land, and commercial property.

## Features
- User registration and login (NextAuth)
- Property listings with photos
- Advanced search and filters
- Admin/Agent dashboard
- SQLite Database via Prisma ORM
- Secure Authentication
- Responsive UI using TailwindCSS & Lucide Icons

## Setup Instructions
1. Install dependencies: `npm install`
2. Initialize Database: `npx prisma db push`
3. Seed test data (optional): `npm run seed`
4. Run locally: `npm run dev`

## Tech Stack
- Next.js (App Router)
- React
- Prisma ORM
- SQLite
- TailwindCSS
- NextAuth.js

### Vercel Deployment
When deploying to Vercel, ensure you configure the following Environment Variables in your Vercel Project Settings:
- `NEXTAUTH_SECRET`: Generate a secure random string (e.g. using `openssl rand -base64 32`)
- `NEXTAUTH_URL`: The production URL of your app (e.g. `https://mana-koo.vercel.app`)
- `DATABASE_URL`: The URL to your production database
