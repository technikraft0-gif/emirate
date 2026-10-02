# Emirate — Ideas Made Visual | Brand Identity Studio

> Production portfolio and landing page for freelance brand identity designer and creative director Emirate. Specializing in memorable brand identities, tactile packaging, and digital design systems.

---

## ✨ Features

- **Editorial Aesthetic:** Swiss modernist typography pairing (Instrument Serif, Inter Tight, JetBrains Mono) with high-contrast obsidian and neon chartreuse accents.
- **Responsive WebP & AVIF:** All media assets optimized with width-based `srcset` reducing payload by ~93%.
- **Interactive Before / After Transformation Slider:** Real-time visual comparison of early startup identity vs. modern brand system.
- **Dynamic Scope & Investment Estimator:** Instant calculation of project investment, turnaround timelines, and automatic inquiry prefill.
- **Case Study Deep-Dive Modal:** In-depth breakdown with project challenges, solutions, typography specs, and one-click HEX color swatch copy.
- **Performance First:** Pre-compiled Tailwind CSS v4 bundle, tree-shaken Lucide icons, and zero runtime framework bloat.
- **Hardware-Accelerated Motion:** Declarative transitions and scroll reveals driven by Motion.
- **Accessible & Screen-Reader Friendly:** Full ARIA dialog roles, semantic landmarks, skip link, and keyboard navigation.

---

## 🛠️ Tech Stack

- **Tooling & Bundler:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Animations:** [Motion](https://motion.dev/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Image Pipeline:** [Sharp](https://sharp.pixelplumbing.com/) (WebP/AVIF generation)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/technikraft0-gif/emirate.git

# Navigate into the project directory
cd emirate

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The production-ready assets will be compiled into the `dist/` directory.

### Preview Build

```bash
npm run preview
```

---

## 📦 Deployment

The project is pre-configured for instant zero-configuration deployment to **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`).

- **Vercel:** Import repository, framework preset auto-detected as Vite.
- **Netlify:** Import repository, build command `npm run build`, publish directory `dist`.

---

## 📄 License

MIT License © 2026 Emirate Studio. All rights reserved.
