# JobQuest

A  full‑stack job application tracker that helps you stay organized and prepared throughout your job search. Instead of juggling spreadsheets and emails, JobQuest centralizes everything into one platform — with a Kanban board for applications, a dashboard for analytics, and AI tools for interview prep and job description analysis.
It keeps you consistent with smart reminders, weekly digests, and recruiter contact management, so you’re not just applying — you’re strategically moving closer to landing your dream job.

**Live Demo:** [jobquests.vercel.app](https://jobquests.vercel.app)

---

## Screenshots

| Kanban Board | Dashboard | Interview Prep |
|---|---|---|
| ![Board](https://via.placeholder.com/400x250/161B22/F0A500?text=Kanban+Board) | ![Dashboard](https://via.placeholder.com/400x250/161B22/F0A500?text=Dashboard) | ![AI](https://via.placeholder.com/400x250/161B22/F0A500?text=AI+Interview+Prep) |

---

## Features

### Core
- **Kanban Board** — Drag and drop job applications across status columns (Wishlist, Applied, Interview, Offer, Rejected)
- **Dashboard** — Visual analytics with charts, response rate, and weekly application trends
- **PDF Export** — Download a professional application report with stats summary
- **Smart Reminders** — Schedule email reminders for follow-ups and interviews via Agenda.js

### AI-Powered
- **AI Interview Prep** — Generate likely interview questions and suggested answers based on the company and role using Groq (Llama 3.1)
- **Job Description Analyzer** — Paste any job description and get a match score, required skills, salary estimate, and red flags

### Tracking
- **Interview Timeline** — Log every interview round with outcome tracking
- **Contact Management** — Track recruiters and hiring managers per application
- **Follow-up Suggestions** — Automatically flags applications with no response after 7 days
- **Job Search Streak** — Daily application streak to keep you consistent
- **Weekly Email Digest** — Every Monday: weekly stats, follow-up reminders, and upcoming interviews

### Auth & Profile
- **Google OAuth** — Sign in with Google
- **Profile Management** — Update name, email, avatar, password, and skills
- **Skills Profile** — Set your skills so the AI analyzer can match you against job descriptions

---

## Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS v4 | Styling |
| TanStack Query | Server state management |
| React Router v7 | Routing |
| React DnD | Drag and drop |
| Recharts | Data visualization |
| Sonner | Toast notifications |
| Lucide React | Icons |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API |
| MongoDB + Mongoose | Database |
| Agenda.js | Job scheduling |
| Resend | Transactional emails |
| Groq (Llama 3.1) | AI features |
| PDFKit | PDF generation |
| Bcrypt | Password hashing |
| JWT | Authentication |
| Multer | File uploads |
| Helmet | Security headers |
| Express Rate Limit | API rate limiting |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Database hosting |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key (free at [console.groq.com](https://console.groq.com))
- Resend API key (free at [resend.com](https://resend.com))
- Google OAuth credentials

### Installation

Clone the repository:
```bash
git clone https://github.com/BrutRL/jobquest.git
cd jobquest
```

Setup backend:
```bash
cd backend
npm install
npm start
```

Setup frontend:
```bash
cd frontend
npm install
npm run dev
```


## Security

- JWT authentication with HTTP-only cookies
- Google OAuth 2.0
- Rate limiting on all endpoints
- Helmet.js security headers
- Password hashing with bcrypt
- Input validation middleware
- File upload size limits

---

## Email

All emails sent via Resend:

- **Password Reset** — Secure token-based reset link
- **Application Reminder** — Scheduled follow-up and interview reminders
- **Weekly Digest** — Every Monday morning with weekly stats and upcoming interviews

---

## AI

Powered by Groq (Llama 3.1 8B Instant):

- **Interview Prep** — 5 tailored questions with suggested answers, categorized as technical, behavioral, or situational
- **Job Description Analyzer** — Match score, skill gap analysis, salary estimate, and red flags
