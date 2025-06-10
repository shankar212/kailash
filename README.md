
# 👨‍⚕️ Doctor's AI Companion Portal

Live Site: [kailash-rathod.vercel.app](https://kailash-rathod.vercel.app)

A secure, doctor-only platform that combines AI-driven medical insights and patient appointment management — built with Next.js, Firebase, and Google Gemini AI.

---

## 🚀 Features

### 🔐 Secure Login (Doctor-Only)
- Uses Firebase Authentication to ensure that only verified doctors can access private tools like appointment records and AI assistance.

### 📅 Appointment Scheduling
- Doctors can view and manage appointments with a clean, responsive UI.
- Appointments are stored securely in Firebase Firestore.

### 🤖 AI Medical Companion
- Built with **Gemini 1.5 Flash** (Google Generative AI).
- Doctors can enter patient symptoms and optionally upload images (e.g., rashes, wounds).
- AI returns:
  - **Likely Diagnosis**
  - **Symptom Overview**
  - **Suggested Treatment**
  - **Red Flags**
  - **Suggested Medical Tests**
- Supports English and **Hindi (in Roman script)** for flexible input.

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | Frontend framework (React-based) |
| **Tailwind CSS** | Styling and responsive design |
| **Firebase Auth** | Secure login functionality |
| **Firebase Firestore** | Real-time database for appointments |
| **Google Generative AI (Gemini API)** | AI-powered medical assistant |
| **Vercel** | Deployment & hosting |

---

## 📷 Screenshots

> Add screenshots of:
> - Login Page
> - AI Companion Form (with image upload)
> - About
> - Home
> - AI response output
> - Appointment Dashboard

---

## 📁 Project Structure

```
/pages

  /Home              → Responsive home page
  /About             → About Doctor
  /appointments      → Doctor's appointment dashboard
  /ai-companion      → AI symptom input and response
  /login             → Doctor login page
  /api               → API routes if any

/components
  Button.tsx, Navbar.tsx, Input.tsx, etc.

utils/
  firebase.ts        → Firebase config
  gemini.ts          → Gemini API integration

public/
  favicon, logo, etc.
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/doctor-ai-portal.git
cd doctor-ai-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

### 4. Run Locally

```bash
npm run dev
```

---

## 🛡️ Security Note

- Only authenticated doctors can access AI tools and appointment data.
- Patient information is not stored or shared beyond doctor's session unless implemented explicitly.

---

## 📬 Contact

Built with ❤️ by [Rathod Shanker](mailto:shanker.rathod77@gmail.com)

- 📍 MCA @ NIT Warangal
- 🌐 [LinkedIn](https://linkedin.com/in/rathodshanker)

---

## 📜 License

This project is for educational and professional portfolio use. If you'd like to use this for your own clinic or need a customized version, feel free to contact me.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
