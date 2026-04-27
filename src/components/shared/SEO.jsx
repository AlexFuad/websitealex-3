'use client'

import Head from 'next/head'
import { useMemo } from 'react'

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonical, 
  openGraph, 
  twitter, 
  jsonLd,
  noindex = false,
  alternates = {}
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  const defaultTitle = 'Portfolio - Alex Fuad'
  const defaultDescription = 'Full Stack Developer Portfolio - Creating beautiful web experiences with modern technologies'
  const defaultKeywords = 'portfolio, web developer, full stack, react, next.js, javascript, frontend, backend'

  const metaTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const metaDescription = description || defaultDescription
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords
  const metaCanonical = canonical || siteUrl

  // Default Open Graph configuration
  const defaultOpenGraph = {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: defaultTitle,
    title: metaTitle,
    description: metaDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: metaTitle,
        type: 'image/jpeg',
      },
    ],
    ...openGraph,
  }

  // Default Twitter Card configuration
  const defaultTwitter = {
    card: 'summary_large_image',
    site: '@alexfuad',
    creator: '@alexfuad',
    title: metaTitle,
    description: metaDescription,
    images: [`${siteUrl}/og-image.jpg`],
    ...twitter,
  }

  // Generate JSON-LD structured data
  const jsonLdData = useMemo(() => {
    if (!jsonLd) return null

    // Person schema
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alex Fuad',
      jobTitle: 'Full Stack Developer',
      description: 'Passionate developer creating beautiful web experiences',
      url: siteUrl,
      image: `${siteUrl}/profile-image.jpg`,
      sameAs: [
        'https://github.com/alexfuad',
        'https://linkedin.com/in/alexfuad',
        'https://twitter.com/alexfuad',
      ],
      knowsAbout: [
        'Web Development',
        'React',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'UI/UX Design',
      ],
      offers: {
        '@type': 'Offer',
        description: 'Full Stack Development Services',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          price: '75',
          priceType: 'https://schema.org/ListPrice',
        },
      },
    }

    // ProfessionalService schema
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Alex Fuad - Full Stack Development',
      description: 'Professional web development services specializing in React, Next.js, and modern web technologies',
      url: siteUrl,
      telephone: '+1 (555) 123-4567',
      email: 'alex.fuad@example.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '37.7749',
        longitude: '-122.4194',
      },
      openingHours: 'Mo-Fr 09:00-18:00',
      priceRange: '$$$',
      paymentAccepted: ['Cash', 'Credit Card', 'PayPal'],
      languages: 'English',
      serviceType: 'Web Development',
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Frontend Development',
              description: 'React, Next.js, Vue.js development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Backend Development',
              description: 'Node.js, Python, API development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full Stack Development',
              description: 'End-to-end web application development',
            },
          },
        ],
      },
    }

    // Combine with custom JSON-LD if provided
    if (Array.isArray(jsonLd)) {
      return [...jsonLd, personSchema, serviceSchema]
    } else if (typeof jsonLd === 'object') {
      return [jsonLd, personSchema, serviceSchema]
    } else {
      return [personSchema, serviceSchema]
    }
  }, [jsonLd, siteUrl])

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="John Doe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={metaCanonical} />
        
        {/* Language and Region */}
        <html lang="en" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Francisco" />
        <meta name="ICBM" content="37.7749,-122.4194" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content={defaultOpenGraph.type} />
        <meta property="og:locale" content={defaultOpenGraph.locale} />
        <meta property="og:url" content={defaultOpenGraph.url} />
        <meta property="og:site_name" content={defaultOpenGraph.siteName} />
        <meta property="og:title" content={defaultOpenGraph.title} />
        <meta property="og:description" content={defaultOpenGraph.description} />
        
        {defaultOpenGraph.images?.map((image, index) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={defaultTwitter.card} />
        <meta name="twitter:site" content={defaultTwitter.site} />
        <meta name="twitter:creator" content={defaultTwitter.creator} />
        <meta name="twitter:title" content={defaultTwitter.title} />
        <meta name="twitter:description" content={defaultTwitter.description} />
        
        {defaultTwitter.images?.map((image, index) => (
          <meta key={index} name="twitter:image" content={image} />
        ))}
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Hreflang Tags */}
        {Object.entries(alternates).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        
        {/* JSON-LD Structured Data */}
        {jsonLdData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdData, null, 2),
            }}
          />
        )}
      </Head>
    </>
  )
}
