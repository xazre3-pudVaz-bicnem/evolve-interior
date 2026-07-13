import { ImageResponse } from 'next/og'

export const alt = '株式会社EVOLVE｜尼崎の軽鉄・ボード・内装工事'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * OGP画像をビルド時に生成する（写真素材が不要）。
 *
 * ※ next/og の既定フォントは日本語グリフを含まないため、
 *    画像内の文字は英字のみで構成している（日本語を入れると豆腐になる）。
 *    実写ベースのOGPに差し替えたい場合は、このファイルを削除し、
 *    public/og-image.jpg を用意して layout.tsx の metadata に指定すること。
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#101214',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* 右側の斜めアクセント */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -80,
            width: 320,
            height: '100%',
            display: 'flex',
            backgroundColor: '#00A651',
            opacity: 0.08,
            transform: 'skewX(-24deg)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <svg width="104" height="110" viewBox="0 0 160 170">
            <path d="M96 0h58l-46 46H50z" fill="#54C07D" />
            <path d="M74 62h58l-46 46H28z" fill="#00A651" />
            <path d="M52 124h58l-46 46H6z" fill="#00833F" />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
            >
              EVOLVE
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 22,
                color: '#949aa0',
                letterSpacing: '0.36em',
              }}
            >
              INTERIOR WORK
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            width: 120,
            height: 6,
            backgroundColor: '#00A651',
            marginTop: 56,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: '#ffffff',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          Light-gauge Steel / Board / Interior Works
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 20,
            fontSize: 24,
            color: '#949aa0',
            letterSpacing: '0.08em',
          }}
        >
          Amagasaki, Hyogo — Kansai, Japan
        </div>
      </div>
    ),
    { ...size },
  )
}
