# Cardiolife Adaptation Strips - Clinical Dashboard Playground

A Next.js application designed to explore and prototype various user interface interaction models for analyzing Holter ECG data. This project demonstrates 14 distinct dashboard variants, ranging from traditional clinical tables to progressive disclosure interfaces, heatmaps, and master-detail layouts.

## 🚀 Features & Variants

This project implements **14 Unique Visual Variants** accessible via the top navigation bar:

### Core Clinical Variants (V1-V8)
- **V1: Standard Clinical** - Focused on readability with wider intervals and split date/time columns.
- **V2: Overview Timeline** - High-density view with day/night transitions and sticky dividers.
- **V3: Progressive Disclosure** - Clean summary view with expandable rows revealing detailed metrics (Beats, Pauses, etc.) on demand.
- **V4: Expert Mode** - Information-dense layout with consolidated "HR Details" (Min/Mean/Max stacked) and structured Event Summaries.
- **V5: Triage Mode** - Optimized for quick scanning with explicit columns for Per Hour rates and Max Pauses.
- **V6: Stack Mode (Vertical)** - Transposed layout where Time is on the X-axis (columns) and Metrics are on the Y-axis (rows).
- **V7: Focus Review** - Simplified layout pairing the narrative "Heart Rate Summary" directly with clinical findings.
- **V8: Realistic Clinical** - A polished, high-contrast Light Mode dashboard featuring key metric cards and a "Critical Events Review" list.

### Creative Interaction Models (V9-V14)
- **V9: Sidebar Nav** - The HR Table acts as a navigation sidebar, allowing the ECG viewer to dominate the screen.
- **V10: Right Panel** - Comparison layout with the data table fixed as a reference panel on the right.
- **V11: Inline Strips (Accordion)** - Interactive table where clicking a row expands it to reveal the ECG strip *inline* within the data context.
- **V12: Hourly Grid** - Grid/Card visualization of hourly data, highlighting active hours and critical events visually.
- **V13: Heatmap View** - Visual timeline replacing numbers with color-coded heatmaps (Green -> Red) to indicate heart rate intensity.
- **V14: Master-Detail Top/Bottom** - Vertical split layout with the HR Table at the top (Master) and the ECG Viewer at the bottom (Detail).

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Standard CSS (Modules & Inline for rapid prototyping) / Vanilla CSS variables
- **State Management**: React Context API (`VariantContext`)
- **Fonts**: Inter (Google Fonts)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gabrielvaz/cardiolife-cardioline-strips-ideas.git
   cd cardiolife-cardioline-strips-ideas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port specified in your console).

## ☁️ Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push this code to your GitHub repository.
2. Log in to Vercel and "Add New Project".
3. Import the `cardiolife-cardioline-strips-ideas` repository.
4. Vercel will automatically detect Next.js. Click **Deploy**.

No special configuration is required. The `build` script is standard (`next build`).
