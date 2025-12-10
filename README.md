# Brand Licensing Thesis

An interactive web experience exploring the $357B licensing landscape and strategic investment opportunities.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Clone/download this repo and navigate to it:
```bash
cd brand-licensing-thesis
```

3. Install dependencies:
```bash
npm install
```

4. Deploy to Vercel:
```bash
vercel
```

5. Follow the prompts. Vercel will provide you with a live URL.

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
```bash
# Initialize git repo
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Brand Licensing Thesis"

# Add your GitHub repo as remote (create repo on GitHub first)
git remote add origin https://github.com/YOUR_USERNAME/brand-licensing-thesis.git

# Push
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js - just click "Deploy"
   - Your site will be live in ~60 seconds!

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## 📁 Project Structure

```
brand-licensing-thesis/
├── app/
│   ├── globals.css      # Tailwind + custom styles
│   ├── layout.js        # Root layout with metadata
│   └── page.js          # Main interactive component
├── package.json         # Dependencies
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
├── postcss.config.js    # PostCSS config
└── README.md
```

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📊 Features

- Interactive market data visualizations
- 5-step licensing value chain explorer
- 5 investment opportunity zone deep-dives
- Questions to conviction analysis
- Fully responsive design
- Smooth page transitions

## 📝 License

Private - All rights reserved.
