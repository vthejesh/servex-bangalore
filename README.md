# ServeX - 100+ Services E-Commerce & AI Marketplace Platform

A production-grade, full-stack services marketplace app built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**. 

Designed for hiring service providers across **100+ service categories** (Carpenter, Electrician, Plumber, Full Stack Software Developer, Gym Trainer, Event Security Guard, Wholesale Market Supplier, Tutors, Mechanics, Accountants, etc.) and allowing service providers to register and offer services at custom rates. Includes a natural-language **AI Want Assistant**.

---

## 🌟 Key Features

1. **100+ Pre-Seeded Services Catalog**:
   - **🔧 Home & Technical Repairs**: Plumber, Electrician, Carpenter, AC Service, Home Painter, Locksmith, Appliance Repair, Masonry, Solar Installer, Roof Repair.
   - **💻 IT & Software Development**: Full Stack Developer, Frontend Specialist, Mobile App Dev (Flutter/React Native), UI/UX Designer, DevOps, Cybersecurity Auditor, Data Analyst, E-Commerce Builder, SEO Specialist, DBA.
   - **🏋️ Health & Fitness**: Personal Gym Trainer, Yoga Coach, Physiotherapist, Dietitian, Elderly Caregiver, Babysitter, Massage Specialist, Sports Coach, Life Coach, Dental Assistant.
   - **🛡️ Security & Guarding**: Event Security Guard, Residential Guard, Executive Bodyguard, CCTV Installer, Security Risk Consultant, Cyber Defense, Premises Supervisor, Transit Escort, K9 Squad, Background Inspector.
   - **📦 Logistics & Wholesale**: Market Goods Supplier, Heavy Freight Trucking, Grocery Wholesaler, Express Courier Runner, Warehouse Space, Movers & Packers, Cold Storage, Industrial Tools, Office Supplies, Cargo Labor.
   - **🧹 Cleaning & Sanitation**: Full Home Deep Clean, Office Janitorial, Pest Control, Sofa/Carpet Wash, Pool Clean, High-Rise Window Wash, Chimney Degreasing, Water Tank Clean, Disinfection Fogging, Post-Construction Clean.
   - **🎨 Creative & Media**: Wedding Photographer, Video Editor, Graphic Designer, Copywriter, Sound Engineer, Voiceover Artist, Drone Videographer, Reels Creator, 3D Animator, Podcast Studio Setup.
   - **💼 Business & Legal**: CPA Tax Advisor, Legal Attorney, HR Specialist, Business Registration, Pitch Deck Consultant, Trademark Lawyer, Bookkeeper, Grant Writer, Notary Public, ISO Auditor.
   - **🚗 Automotive & Transport**: Mobile Mechanic, Car Detailing, Emergency Towing, Private Chauffeur, EV Charger Installer, Bike Mechanic, Fleet Manager, Auto AC Fix, Battery Replacement, Dent Removal.
   - **🎓 Education & Tutoring**: Math/Physics Tutor, IELTS/English Coach, Piano Teacher, Kids Coding/Robotics, Public Speaking Coach, Driving Instructor, SAT/GRE Prep, Foreign Language Tutor, Research Mentor, University CS Tutor.

2. **"AI Want" Intelligent Request Assistant**:
   - Natural-language parser converts complex multi-service prompts (e.g. *"I need a security guard for 2 days, an electrician to fix outlets, and a personal gym trainer"*) into matched catalog items, estimated cost, and 1-click bundle checkout.

3. **Service Provider Onboarding & Hub**:
   - Vetted registration portal for individuals & companies to list their offerings, set hourly/fixed pricing, set work radius, accept client requests, and update order statuses.

4. **Customer Bookings Dashboard**:
   - Real-time order tracking, provider assignment, scheduling, address management, and cancellation controls.

5. **Platform Command Center / Admin**:
   - Category distribution metrics, total gross booking volume, commission tracking, and provider verification analytics.

---

## 🚀 Local Development Setup

```bash
# 1. Navigate into project directory
cd servex-app

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 📦 Deployment Options (From Scratch to Production)

### Option A: 1-Click Deployment on Vercel (Recommended)
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo.
3. Vercel will automatically detect Next.js. Click **Deploy**.

### Option B: Deploying with Docker / Render / Railway
Build and run the container locally or on any cloud server:

```bash
# Build Docker image
docker build -t servex-app .

# Run container on port 3000
docker run -p 3000:3000 servex-app
```

Or run with Docker Compose:
```bash
docker-compose up -d
```

### Option C: Production Node.js Server Deployment
```bash
npm run build
npm start
```
By default, the server will start on port `3000`. You can reverse proxy using Nginx or Caddy.

---

## 🛠️ Built With
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
