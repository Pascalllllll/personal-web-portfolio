# 🚀 Hosea's Personal Portfolio

> **A modern, interactive, and 3D-enhanced personal portfolio website built with React, Tailwind CSS, and Three.js.**

<img width="1919" height="992" alt="image" src="https://github.com/user-attachments/assets/88b95975-1f8f-49bb-b3bf-1a8e70c93a0f" />

## ✨ Overview

This is my **personal portfolio website**, built to showcase my profile, skills, and projects through an elegant and immersive interface.  
The site features a **3D animated background**, **sparkle effects**, and **smooth theme transitions**, combining aesthetics with technical depth.

Developed with **React**, powered by **React Three Fiber** for 3D rendering, and styled using **Tailwind CSS** for clean, responsive design.

---

## 🧠 Features

### 3D Particle Background  
A real-time, shader-based fluid animation built with **Three.js GLSL shaders**.  
Colors dynamically adapt to the active theme (light/dark), and the movement subtly reacts to mouse position.

### Sparkle Click Effect  
Each mouse click triggers a burst of glowing particles radiating in random directions — a modern, delightful touch that adds energy to the interface.

### Theme Switching  
Supports light and dark modes with a **smooth circular reveal animation**.  
All theme colors are defined using **HSL variables** for easier fine-tuning and global palette control.

### Smooth Scrolling & Glow Effects  
Sections and typography are styled with soft shadows and gentle transitions, creating a polished and cohesive experience.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | React (TypeScript) |
| **3D Engine** | Three.js + React Three Fiber |
| **Styling** | Tailwind CSS + CSS Variables |
| **Shaders** | GLSL (Custom Vertex & Fragment) |
| **UI Components** | Shadcn/UI |
| **Animations** | Framer Motion |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-portfolio-repo>.git
cd <your-portfolio-repo>
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Development Server
```bash
npm run dev
```
Then open http://localhost:8080 in your browser.

---

### 🧱 Project Structure
```python
src/
├── components/
│   ├── Hero.tsx             # Introduction section
│   ├── About.tsx            # About me
│   ├── Projects.tsx         # Portfolio showcase
│   ├── Contact.tsx          # Contact section
│   ├── ParticleBackground.tsx  # 3D animated background
│   └── ThemeToggle.tsx      # Dark/light mode toggle
├── assets/
│   ├── portrait.jpg
│   └── icons/
├── styles/
│   └── globals.css          # Tailwind + custom variables
├── App.tsx
└── main.tsx
```

---

### 🎨 Theming System
Light and dark themes are toggled by the html.dark class.
All colors are defined in HSL format within globals.css for flexible adjustments:

```css
--background: 45 20% 96%;
--primary: 45 80% 50%;
--accent: 270 70% 60%;
```
You can easily customize these values to match your personal brand.

---

### 🌐 Deployment
You can deploy this portfolio effortlessly using one of the following:

Vercel – seamless deployment for React + Tailwind projects

Netlify or Cloudflare Pages – easy static hosting

GitHub Pages – manual deployment:

```bash
npm run build
npm run deploy
```

---

Author : Hosea Felix Sanjaya

You’re free to use, modify, and share with proper attribution.
