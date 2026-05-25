import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const alt = 'jessebubble — Developer Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const heroImage = readFileSync(
  join(process.cwd(), 'public/jesse-speaking.jpg')
);
const heroImageDataUrl = `data:image/jpeg;base64,${heroImage.toString('base64')}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#171717',
          position: 'relative',
          fontFamily: 'monospace',
        }}
      >
        {/* Background photo */}
        <img
          src={heroImageDataUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '62% 50%',
          }}
        />

        {/* Dark gradient for text legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.45) 100%)',
            display: 'flex',
          }}
        />

        {/* Top wordmark */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 56,
            display: 'flex',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 22,
            letterSpacing: -0.5,
            fontWeight: 700,
          }}
        >
          jesse
          <span style={{ display: 'flex', color: '#e11d48' }}>bubble</span>
        </div>

        {/* Top-right caption */}
        <div
          style={{
            position: 'absolute',
            top: 46,
            right: 56,
            display: 'flex',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 14,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          jessebubble.dev
        </div>

        {/* Bottom lockup */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 56,
            right: 56,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#ffffff',
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 0.95,
            }}
          >
            jesse
            <span style={{ display: 'flex', color: '#e11d48' }}>bubble</span>
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 24,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginTop: 18,
              fontWeight: 600,
            }}
          >
            Find your people. Build your future.
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.55)',
              fontSize: 18,
              marginTop: 14,
              maxWidth: 720,
            }}
          >
            Software developer & ecosystem architect · San Antonio, TX
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
