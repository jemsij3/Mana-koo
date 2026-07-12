# Mana-koo

A real estate marketplace application built with Next.js, React, Prisma, Tailwind CSS, and NextAuth.

## Features

*   **User Authentication:** Secure login and registration using NextAuth.
*   **Property Listings:** View and browse available real estate properties.
*   **Agent Tools:** Authorized agents can create and manage property listings.
*   **Responsive Design:** Fully responsive UI built with Tailwind CSS.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Library:** [React](https://reactjs.org/)
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd mana-koo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    DATABASE_URL="file:./dev.db" # Or your preferred database URL
    NEXTAUTH_SECRET="your-secret-key" # Generate a strong secret
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Database Setup:**
    Initialize the Prisma database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

## Running Locally

Start the development server:

```bash
npm run dev \&
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub/GitLab/Bitbucket repository.
2.  Import the project into Vercel.
3.  Configure the Environment Variables in the Vercel dashboard:
    *   `DATABASE_URL`: Ensure you use a production database (like PostgreSQL).
    *   `NEXTAUTH_SECRET`: Add your secure secret.
    *   `NEXTAUTH_URL`: Set to your production URL.
4.  Deploy. Vercel will automatically run the build process and deploy your app.

## Troubleshooting

*   **Prisma Build Errors:** If you encounter Prisma errors during build, ensure your `DATABASE_URL` is correctly set in your environment variables, even during the build step.
*   **Next.js Config Errors:** Ensure you are using `next.config.mjs` or `next.config.js` and not `.ts` for configuration, as required by this Next.js version.
