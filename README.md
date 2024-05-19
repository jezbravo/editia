# Editia

## Description

This SaaS application is an image editor that uses AI to perform different transformations. The application has user authentication and management, file management, credit system, integration with Mercado Pago (payment gateway similar to Stripe but for several South American countries) and internationalization modules.

### Stack

- HTML
- TailwindCSS
- TypeScript
- Next.js
- Next-Intl
- Shadcn/ui
- Clerk
- MongoDB
- Cloudinary
- Mercado Pago
- Vercel

## Setup

First of all you must clone the repository:

```sh
git clone https://github.com/jezbravo/editia.git
cd editia
```

Then install the dependencies:

```sh
npm install
```

### Environment Variables

In order for the program to work correctly, it is necessary to configure the following environment variables in an **.env** file at the root of the project:

```sh
#MONGODB
MONGODB_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/en/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/en/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#CLOUDINARY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

#MERCADOPAGO
MP_ACCESS_TOKEN=
MP_WEBHOOK_SECRET=
BACK_URL_SUCCESS=
BACK_URL_FAILURE=
BACK_URL_PENDING=
NOTIFICATION_URL=<domain_name>/en/api/webhooks/mp_validation
```

All unspecified keys are provided by the respective services in their configuration pages. The BACK_URLs can be optional and their configuration is subject to the discretion of the developer.

Once everything is ready:

```sh
npm run dev
```

## Demo

The application has five types of possible transformations for images: restoration; generative fill; object removal; object recoloring and background removal. Each of these transformations consumes a credit that is subtracted from the user's account when carried out. Credits can be increased on the purchase page, where pricing packages are offered.
The user can also check their current credits and edits made on the profile page.

You can test a deployed version at the following link: https://editia.vercel.app
