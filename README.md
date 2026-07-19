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
When deploying to Vercel, ensure you configure the following Environment Variables in your Vercel Project Settings. You can copy and paste the values below directly into the Vercel dashboard:

`NEXTAUTH_SECRET`
Generate a secure random string in your terminal and paste it as the value:
```bash
openssl rand -base64 32
```

`NEXTAUTH_URL`
```text
https://mana-koo.vercel.app
```
*(Note: Replace "mana-koo" with your actual Vercel project name if it is different)*

`DATABASE_URL`
```text
file:./dev.db
```
*(Note: Using SQLite on Vercel Serverless Functions is not recommended for production since the database file is reset on every deployment. Consider upgrading to a hosted PostgreSQL database (like Vercel Postgres, Supabase, Neon) and replacing this URL with the connection string they provide).*
