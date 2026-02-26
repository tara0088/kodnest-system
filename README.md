# Placement Readiness Platform

A comprehensive platform to help students prepare for technical placements and interviews.

## Features

- **Landing Page**: Attractive hero section with clear value proposition
- **Dashboard**: Central hub for tracking progress and navigation
- **Practice Problems**: Coding challenges and system design exercises
- **Assessments**: Technical tests and skill evaluations
- **Resources**: Study guides, tutorials, and interview tips
- **Profile Management**: Account settings and achievement tracking

## Tech Stack

- **React** - Frontend library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Vite** - Build tool and development server

## Color Scheme

- **Primary**: Indigo/Purple (hsl(245, 58%, 51%))
- **Secondary**: Grays and complementary colors

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "c:\Users\TARABAI\OneDrive\Desktop\kodnest system\placement-readiness-platform"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically in your default browser at `http://localhost:3001`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx      # Main landing page
│   ├── DashboardLayout.jsx   # Dashboard shell with navigation
│   ├── Dashboard.jsx         # Dashboard content
│   ├── Practice.jsx          # Practice problems page
│   ├── Assessments.jsx       # Assessment page
│   ├── Resources.jsx         # Learning resources
│  └── Profile.jsx           # User profile page
├── App.jsx                   # Main application component
├── main.jsx                  # React entry point
└── index.css                 # Global styles and Tailwind
```

## Navigation

The application includes:
- **Landing Page** (`/`) - Hero section with features and CTA
- **Dashboard** (`/dashboard`) - Main dashboard view
- **Practice** (`/dashboard/practice`) - Coding practice area
- **Assessments** (`/dashboard/assessments`) - Skill evaluations
- **Resources** (`/dashboard/resources`) - Learning materials
- **Profile** (`/dashboard/profile`) - Account management

## Design Principles

- Clean, professional interface
- Consistent indigo/purple color scheme
- Responsive layout for all devices
- Intuitive navigation and user experience
- Accessible and inclusive design

## Development

This project uses:
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router** for client-side navigation
- **Lucide React** for consistent iconography

## Deployment

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.