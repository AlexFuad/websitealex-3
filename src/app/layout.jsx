import '../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://johndoe.dev'),
  title: {
    default: 'Portfolio - John Doe',
    template: '%s | Portfolio - John Doe'
  },
  description: 'Full Stack Developer Portfolio - Creating beautiful web experiences with modern technologies',
  keywords: ['portfolio', 'web developer', 'full stack', 'react', 'next.js', 'javascript', 'frontend', 'backend'],
  authors: [{ name: 'John Doe' }],
  creator: 'John Doe',
  publisher: 'John Doe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Portfolio - John Doe',
    description: 'Full Stack Developer Portfolio',
    type: 'website',
    locale: 'en_US',
    url: 'https://johndoe.dev',
    siteName: 'Portfolio - John Doe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - John Doe',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - John Doe',
    description: 'Full Stack Developer Portfolio',
    images: ['/og-image.jpg'],
    creator: '@johndoe',
    site: '@johndoe',
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
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
