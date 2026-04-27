import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '../contexts/LanguageContext'
import { ThemeProvider } from '../contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://alexfuad.dev'),
  title: {
    default: 'Portfolio - Alex Fuad',
    template: '%s | Portfolio - Alex Fuad'
  },
  description: 'Full Stack Developer Portfolio - Creating beautiful web experiences with modern technologies',
  keywords: ['portfolio', 'web developer', 'full stack', 'react', 'next.js', 'javascript', 'frontend', 'backend'],
  authors: [{ name: 'Alex Fuad' }],
  creator: 'Alex Fuad',
  publisher: 'Alex Fuad',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Portfolio - Alex Fuad',
    description: 'Full Stack Developer Portfolio',
    type: 'website',
    locale: 'en_US',
    url: 'https://alexfuad.dev',
    siteName: 'Portfolio - Alex Fuad',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Alex Fuad',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Alex Fuad',
    description: 'Full Stack Developer Portfolio',
    images: ['/og-image.jpg'],
    creator: '@alexfuad',
    site: '@alexfuad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
