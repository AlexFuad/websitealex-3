export const metadataConfig = {
  site: {
    name: 'Portfolio - Alex Fuad',
    description: 'Full Stack Developer Portfolio - Creating beautiful web experiences with modern technologies',
    url: 'https://alexfuad.dev',
    author: 'Alex Fuad',
    keywords: 'portfolio, web developer, full stack, react, next.js, javascript, frontend, backend',
  },
  
  pages: {
    home: {
      title: 'Home',
      description: 'Welcome to my portfolio. I\'m a passionate Full Stack Developer creating beautiful and functional web experiences with modern technologies.',
      keywords: 'home, portfolio, welcome, full stack developer, web development',
      openGraph: {
        type: 'website',
        title: 'Alex Fuad - Full Stack Developer',
        description: 'Passionate developer creating beautiful web experiences with React, Next.js, and modern web technologies.',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Alex Fuad Portfolio',
        url: 'https://alexfuad.dev',
        description: 'Full Stack Developer Portfolio',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://alexfuad.dev/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    },
    
    about: {
      title: 'About Me',
      description: 'Learn more about Alex Fuad - Full Stack Developer. My skills, experience, and passion for creating amazing web applications.',
      keywords: 'about, skills, experience, full stack developer, background, qualifications',
      openGraph: {
        type: 'profile',
        title: 'About Alex Fuad - Full Stack Developer',
        description: 'Discover my journey as a Full Stack Developer, my technical skills, and professional experience.',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Alex Fuad',
        description: 'Information about Alex Fuad, Full Stack Developer',
        mainEntity: {
          '@type': 'Person',
          name: 'Alex Fuad',
          jobTitle: 'Full Stack Developer',
          description: 'Passionate developer creating beautiful web experiences',
          url: 'https://alexfuad.dev',
        },
      },
    },
    
    projects: {
      title: 'Projects',
      description: 'Explore my portfolio of web development projects. Full stack applications, frontend designs, and innovative solutions.',
      keywords: 'projects, portfolio, web development, full stack, applications, case studies',
      openGraph: {
        type: 'website',
        title: 'Projects - Alex Fuad Portfolio',
        description: 'Browse my collection of web development projects and case studies.',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projects Portfolio',
        description: 'Collection of web development projects by Alex Fuad',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: 6,
          itemListElement: [
            {
              '@type': 'SoftwareApplication',
              name: 'E-Commerce Platform',
              description: 'Full-stack e-commerce solution with real-time inventory management',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
            },
            {
              '@type': 'SoftwareApplication',
              name: 'Task Management App',
              description: 'Collaborative task management application with real-time updates',
              applicationCategory: 'ProductivityApplication',
              operatingSystem: 'Web',
            },
          ],
        },
      },
    },
    
    blog: {
      title: 'Blog',
      description: 'Read my latest articles about web development, React, Next.js, and modern programming practices.',
      keywords: 'blog, articles, tutorials, web development, react, next.js, programming',
      openGraph: {
        type: 'blog',
        title: 'Blog - Alex Fuad',
        description: 'Technical articles and tutorials about web development and programming.',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Alex Fuad Blog',
        description: 'Technical blog about web development and programming',
        url: 'https://alexfuad.dev/blog',
        blogPost: [
          {
            '@type': 'BlogPosting',
            headline: 'Getting Started with Next.js 14',
            description: 'Learn how to build modern web applications with Next.js 14 and App Router.',
            datePublished: '2024-01-15',
            author: {
              '@type': 'Person',
              name: 'Alex Fuad',
            },
          },
        ],
      },
    },
    
    contact: {
      title: 'Contact',
      description: 'Get in touch with Alex Fuad. Contact information for project inquiries, collaborations, and opportunities.',
      keywords: 'contact, email, phone, address, hire, collaborate, project inquiry',
      openGraph: {
        type: 'website',
        title: 'Contact Alex Fuad',
        description: 'Contact information for project inquiries and collaborations.',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Alex Fuad',
        description: 'Contact information and form for getting in touch with Alex Fuad',
        mainEntity: {
          '@type': 'Person',
          name: 'Alex Fuad',
          email: 'alex.fuad@example.com',
          telephone: '+1 (555) 123-4567',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            addressCountry: 'US',
          },
        },
      },
    },
    
    portfolio: {
      title: 'Portfolio',
      description: 'Complete portfolio showcase of Alex Fuad - Full Stack Developer. Projects, skills, and professional experience.',
      keywords: 'portfolio, showcase, full stack developer, web development, projects gallery',
      openGraph: {
        type: 'website',
        title: 'Portfolio - Alex Fuad',
        description: 'Complete portfolio showcase of web development projects and professional experience.',
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Portfolio Showcase',
        description: 'Complete portfolio of web development projects',
        mainEntity: {
          '@type': 'Person',
          name: 'Alex Fuad',
          jobTitle: 'Full Stack Developer',
          knowsAbout: [
            'Web Development',
            'React',
            'Next.js',
            'JavaScript',
            'TypeScript',
            'Node.js',
            'UI/UX Design',
          ],
        },
      },
    },
  },
  
  articles: {
    // Example blog post metadata
    'getting-started-nextjs': {
      title: 'Getting Started with Next.js 14 - Complete Guide',
      description: 'Learn how to build modern web applications with Next.js 14, App Router, and the latest features.',
      keywords: 'nextjs, react, web development, tutorial, guide, app router',
      openGraph: {
        type: 'article',
        title: 'Getting Started with Next.js 14 - Complete Guide',
        description: 'Complete guide to building modern web applications with Next.js 14.',
        article: {
          publishedTime: '2024-01-15T00:00:00Z',
          modifiedTime: '2024-01-20T00:00:00Z',
          author: 'Alex Fuad',
          section: 'Tutorial',
          tag: ['Next.js', 'React', 'Web Development'],
        },
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Getting Started with Next.js 14 - Complete Guide',
        description: 'Learn how to build modern web applications with Next.js 14 and App Router.',
        datePublished: '2024-01-15T00:00:00Z',
        dateModified: '2024-01-20T00:00:00Z',
        author: {
          '@type': 'Person',
          name: 'Alex Fuad',
          url: 'https://alexfuad.dev',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alex Fuad Portfolio',
          logo: {
            '@type': 'ImageObject',
            url: 'https://alexfuad.dev/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://alexfuad.dev/blog/getting-started-nextjs',
        },
        image: [
          'https://alexfuad.dev/blog/nextjs-14-cover.jpg',
        ],
      },
    },
  },
}

export function getPageMetadata(pageKey, customMetadata = {}) {
  const pageConfig = metadataConfig.pages[pageKey]
  if (!pageConfig) {
    console.warn(`No metadata configuration found for page: ${pageKey}`)
    return {}
  }

  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    canonical: `${metadataConfig.site.url}/${pageKey === 'home' ? '' : pageKey}`,
    openGraph: {
      ...pageConfig.openGraph,
      url: `${metadataConfig.site.url}/${pageKey === 'home' ? '' : pageKey}`,
      siteName: metadataConfig.site.name,
      images: [
        {
          url: `${metadataConfig.site.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: pageConfig.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alexfuad',
      creator: '@alexfuad',
      title: pageConfig.title,
      description: pageConfig.description,
      images: [`${metadataConfig.site.url}/og-image.jpg`],
    },
    jsonLd: pageConfig.jsonLd,
    ...customMetadata,
  }
}

export function getArticleMetadata(articleKey, customMetadata = {}) {
  const articleConfig = metadataConfig.articles[articleKey]
  if (!articleConfig) {
    console.warn(`No metadata configuration found for article: ${articleKey}`)
    return {}
  }

  return {
    title: articleConfig.title,
    description: articleConfig.description,
    keywords: articleConfig.keywords,
    canonical: `${metadataConfig.site.url}/blog/${articleKey}`,
    openGraph: {
      ...articleConfig.openGraph,
      url: `${metadataConfig.site.url}/blog/${articleKey}`,
      siteName: metadataConfig.site.name,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alexfuad',
      creator: '@alexfuad',
      title: articleConfig.title,
      description: articleConfig.description,
    },
    jsonLd: articleConfig.jsonLd,
    ...customMetadata,
  }
}
