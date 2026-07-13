import Image from 'next/image'
import { resolveImage } from '@/lib/media'
import { KEY_POINTS } from '@/lib/constants'
import PhotoFrame from '@/components/ui/PhotoFrame'

/**
 * トップページのヒーロー。
 *
 * ・施工写真とキャッチコピーが主役。CTAボタンは置かない。
 * ・写真はゆっくり寄る（Ken Burns）。文字は順に立ち上がる。
 * ・写真の明るさに関わらず文字が読めるよう、黒のグラデーションを重ねている。
 * ・ヘッダー（fixed）の下まで写真を敷くため、負のマージンで余白を打ち消す。
 */
export default function Hero() {
  const hero = resolveImage('hero.jpg')

  return (
    <section
      data-hero
      className="relative -mt-16 flex min-h-[88svh] items-end overflow-hidden bg-ink-900 lg:-mt-20 lg:min-h-[100svh]"
      aria-labelledby="hero-heading"
    >
      {/* 背景写真 */}
      <div className="absolute inset-0">
        {hero ? (
          <Image
            src={hero}
            alt="軽量鉄骨の下地が組まれ、石膏ボードが積まれた内装工事の現場"
            fill
            priority
            sizes="100vw"
            className="hero-zoom object-cover"
          />
        ) : (
          <PhotoFrame ratio="16 / 9" label="施工現場の写真" tone="dark" className="h-full" />
        )}
      </div>

      {/* 文字を読ませるための重ね（下と左を濃くする） */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/20 to-transparent"
        aria-hidden="true"
      />

      {/* コピー */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-40">
        <p
          className="hero-in flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-white"
          style={{ animationDelay: '120ms' }}
        >
          <span className="eyebrow-bar" aria-hidden="true" />
          尼崎・関西エリアの内装工事
        </p>

        <h1
          id="hero-heading"
          className="hero-in heading-jp mt-6 text-[2.35rem] font-bold leading-[1.22] text-white sm:text-6xl lg:text-[4.2rem]"
          style={{ animationDelay: '260ms' }}
        >
          内装の骨格から、
          <br />
          <span className="relative inline-block">
            仕上げまで。
            <span
              className="absolute -bottom-1 left-0 h-[6px] w-full bg-brand-500"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p
          className="hero-in mt-8 max-w-xl text-[15px] leading-[2] text-mist-200 sm:text-base"
          style={{ animationDelay: '420ms' }}
        >
          軽鉄・ボード工事を中心に、大工造作や内装仕上げまで。株式会社EVOLVEは尼崎を拠点に、関西エリアの内装工事に対応しています。
        </p>

        {/* スクロール誘導（CTAボタンは置かない） */}
        <div
          className="hero-in mt-14 hidden items-center gap-4 lg:flex"
          style={{ animationDelay: '620ms' }}
        >
          <span className="scroll-line" aria-hidden="true" />
          <span className="text-[10px] tracking-[0.28em] text-white/60">SCROLL</span>
        </div>
      </div>

      {/* ヒーロー直下の要点 */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-ink-900/60 backdrop-blur-sm lg:block">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ul className="grid grid-cols-4 gap-px">
            {KEY_POINTS.map((point, i) => (
              <li
                key={point}
                className="hero-in flex items-center gap-3 py-5"
                style={{ animationDelay: `${760 + i * 90}ms` }}
              >
                <span
                  className="h-1.5 w-4 shrink-0 skew-x-[-24deg] bg-brand-500"
                  aria-hidden="true"
                />
                <span className="text-[12.5px] font-medium leading-snug text-white/90">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
