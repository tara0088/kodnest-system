# KodNest Premium Build System - React App

A premium SaaS design system built with React and Vite, following the calm, intentional, and coherent design philosophy.

## 🚀 Quick Start

### Prerequisites
Make sure you have Node.js (version 16 or higher) installed:
```bash
node --version
npm --version
```

### Installation
```bash
# Navigate to the app directory
cd "c:\Users\TARABAI\OneDrive\Desktop\kodnest system\kodnest-app"

# Install dependencies
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

##🎯 Available Scripts

- `npm run dev` - Starts the development server on http://localhost:3000
- `npm run build` - Creates a production build in the `dist` folder
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## 📁 Project Structure

```
kodnest-app/
├── public/           # Static assets
├── src/
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # React entry point
│  └── index.css    # Design system styles
├── index.html       # HTML template
├── package.json     # Project dependencies
├── vite.config.js   # Vite configuration
└── README.md        # This file
```

##🔧 Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   This will start the app on http://localhost:3000 with hot reloading

2. **Make Changes**
   - Edit `src/App.jsx` for component logic
   - Edit `src/index.css` for styling
   - Changes will automatically reload in the browser

3. **Build for Production**
   ```bash
   npm run build
   ```
   Creates optimized production files in the `dist` folder

## 🎨 Design System Features

- **Calm Design Philosophy**: No flashy animations or distracting elements
- **Consistent Spacing**: 8px, 16px, 24px, 40px, 64px scale
- **Limited Color Palette**: Maximum 4 colors per interface
- **Serif Headings**: Confident typography hierarchy
- **Proof-Driven Workflow**: Built-in checklist system
- **Responsive Layout**: Works on all device sizes

##📱 Structure

The app follows the exact layout you specified:
- **Top Bar**: Project name, progress indicator, status badge
- **Context Header**: Serif headline with subtext
- **Primary Workspace**: Main interaction area (70%)
- **Secondary Panel**: Supporting content (30%)
- **Proof Footer**: Persistent checklist with user input

##🔧ization

### Colors
Modify the CSS variables in `src/index.css`:
```css
:root {
  --color-accent: #8B0000; /* Change accent color */
  --color-background: #F7F6F3; /* Change background */
}
```

### Typography
Adjust font sizes and spacing using the predefined scale:
```css
--text-4xl: 48px;  /* H1 size */
--text-3xl: 36px;  /* H2 size */
--space-5: 64px;   /* Large spacing */
```

##🚀 Deployment

After building with `npm run build`, you can deploy the contents of the `dist` folder to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting provider

##📞

Support

For issues or questions about the design system:
1. Check the browser console for errors
2. Verify Node.js version requirements
3. Ensure all dependencies are installed
4. Clear node_modules and reinstall if needed

```bash
# Clean install if having issues
rm -rf node_modules package-lock.json
npm install
```