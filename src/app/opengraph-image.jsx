import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Portfolio - John Doe'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          John Doe
        </div>
        <div
          style={{
            fontSize: '24px',
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            fontSize: '18px',
            opacity: 0.7,
            textAlign: 'center',
            maxWidth: '80%',
            marginTop: '20px',
          }}
        >
          Creating beautiful web experiences with modern technologies
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
