# ⚖️ CocoLaw  AI-Powered Legal Consultation Platform

CocoLaw is a full-stack legal services platform that connects clients with law firms through online case management, appointment scheduling, and an AI-powered legal assistant chatbot. It streamlines how clients submit inquiries, book consultation slots, track their cases, and get instant preliminary guidance  while giving law firm staff a dashboard to manage appointments, cases, and client communication.

**Live demo:** [cocolaw.ai](https://cocolaw.ai/)

> **Note:** This repository is named `lawlelulia-platform` for historical reasons; the product itself is branded **CocoLaw**.

---

## ✨ Features

- **AI Legal Assistant Chatbot**  Powered by Google Gemini (`@google/genai`), gives clients instant, context-aware answers about the firm's services and general legal queries.
- **Client & Admin Dashboards**  Role-based views for clients (case status, bookings, profile) and staff (appointments, cases, slots).
- **Appointment & Slot Booking**  Clients pick from available time slots; staff manage slot availability and appointment scheduling.
- **Case Management**  Create, track, and update client cases from submission to resolution.
- **Google Integration**  Google OAuth 2.0 login, Google Calendar sync for appointments, and Google Drive for case document storage.
- **Video Consultations** — Jitsi-based video meeting links for remote consultations.
- **Secure Authentication**  JWT-based auth, bcrypt password hashing, OTP email verification, and password reset flow.
- **Automated Notifications**  Email confirmations and reminders via Nodemailer, with scheduled jobs (`node-cron`) for reminders/cleanup.
- **Client Inquiries & Feedback**  Public inquiry form and feedback collection for prospective clients.

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS 4
- React Router DOM
- Zustand (state management)
- Axios
- react-chatbot-kit (chatbot UI)
- Lucide React / React Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Passport.js (Google OAuth 2.0)
- JWT (`jsonwebtoken`) + bcrypt
- Google Generative AI SDK (`@google/genai`)
- Google APIs (Calendar, Drive)
- Nodemailer (email/OTP)
- node-cron (scheduled tasks)
- Multer (file uploads)

---

## 📁 Project Structure

```
lawlelulia-platform/
├── backend/
│   ├── config/          # DB, Google Drive, mailer, Passport config
│   ├── controllers/     # Route handlers (auth, cases, appointments, chatbot, etc.)
│   ├── exception/       # Centralized error handling
│   ├── middleware/      # Auth, role-based access, file upload middleware
│   ├── models/          # Mongoose schemas (User, Case, Appointment, Slot, Inquiry, Otp)
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic layer
│   ├── utils/           # Helpers (API responses, tokens, email, async handler)
│   └── index.js         # App entry point
│
└── frontend/
    ├── src/
    │   ├── api/          # Axios API service modules
    │   ├── components/   # Reusable UI components
    │   ├── context/       # React context (Auth)
    │   ├── guards/        # Route guards (protected/public routes)
    │   ├── hooks/         # Custom hooks
    │   ├── pages/         # Application pages/screens
    │   ├── store/         # Zustand stores
    │   └── utils/         # Chatbot logic & helpers
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Google Cloud project with OAuth 2.0 credentials and a Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/DevHanzala/-lawlelulia-platform.git
cd -lawlelulia-platform
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_oauth_callback_url

GEMINI_API_KEY=your_google_genai_api_key

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on Vite's default port (`http://localhost:5173`) and the backend on the port set in `.env` (default `5000`).

---

## 📌 Core Modules

| Module | Description |
|---|---|
| `auth` | Signup/login, Google OAuth, OTP verification, password reset |
| `profile` | User profile management |
| `case` | Legal case creation and tracking |
| `appointment` / `slot` | Booking and managing consultation time slots |
| `inquiry` | Public client inquiry submissions |
| `chatbot` | AI-powered legal assistant |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**DevHanzala**
GitHub: [@DevHanzala](https://github.com/DevHanzala)
