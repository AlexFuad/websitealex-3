import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Portfolio - Alex Fuad'
export const size = {
  width: 1200,
  height: 600,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Alex Fuad
        </div>
        <div
          style={{
            fontSize: '20px',
            opacity: 0.9,
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            fontSize: '16px',
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: '1.5',
          }}
        >
          React | Next.js | Node.js | TypeScript
          <br />
          Building modern web applications
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
