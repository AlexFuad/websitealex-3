# Modern Portfolio Website

A stunning portfolio website built with Next.js 14+ (App Router), Tailwind CSS, and Framer Motion. Features a modern glassmorphism design with dark mode by default, smooth animations, and fully responsive layout.

## Features

- **Modern Tech Stack**: Next.js 14+ with App Router, Tailwind CSS, Framer Motion
- **Glassmorphism Design**: Clean, modern UI with glass effects and backdrop blur
- **Dark Mode**: Beautiful dark theme by default with light mode toggle
- **Responsive Design**: Fully optimized for all screen sizes
- **Smooth Animations**: Engaging micro-interactions and page transitions
- **Sticky Navigation**: Navbar with blur effect and scroll detection
- **Project Showcase**: Beautiful portfolio grid with hover effects
- **Contact Form**: Functional contact form with validation
- **🚀 Advanced SEO**: Comprehensive search engine optimization
  - Dynamic metadata for all pages
  - JSON-LD structured data for rich snippets
  - Open Graph and Twitter Card optimization
  - Automatic sitemap and robots.txt generation
  - Dynamic OG image generation
  - Person and ProfessionalService schema markup

## Project Structure

```
src/
  app/                    # Next.js App Router
    layout.jsx           # Root layout component
    page.jsx             # Home page component
  components/            # Reusable React components
    Navbar.jsx           # Navigation bar with glassmorphism
    Hero.jsx             # Hero section with animations
    About.jsx            # About section with stats and timeline
    Projects.jsx         # Projects showcase grid
    Contact.jsx          # Contact form and information
    Footer.jsx           # Footer with links and social
  lib/                  # Utility functions
    utils.js             # Tailwind utility helpers
  styles/               # Global styles
    globals.css          # Tailwind and custom styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modern-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Personal Information

Update the following files with your information:

- `src/components/Hero.jsx` - Update name, title, and description
- `src/components/About.jsx` - Update skills, experience, and stats
- `src/components/Projects.jsx` - Add your projects
- `src/components/Contact.jsx` - Update contact information
- `src/app/layout.jsx` - Update metadata and SEO

### Styling

The glassmorphism effects are defined in `src/styles/globals.css`. You can customize:

- Glass effects (`.glass`, `.glass-dark`, `.glass-card`)
- Color schemes (CSS variables)
- Animations and transitions
- Responsive breakpoints

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.jsx`
3. Add navigation link in `src/components/Navbar.jsx`

## Technologies Used

- **Next.js 14+** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful icon library
- **JavaScript** - No TypeScript for simplicity

## Deployment

This project is optimized for deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Performance

- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals optimized
- Lazy loading for images
- Minimal JavaScript bundle size
- Optimized animations with GPU acceleration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help with customization, feel free to open an issue or reach out through the contact form on the website.

---

Built with passion and modern web technologies. Enjoy using it as much as I enjoyed building it!
