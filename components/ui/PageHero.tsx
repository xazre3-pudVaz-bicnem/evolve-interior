import Image from 'next/image'
import { resolveImage } from '@/lib/media'

type Props = {
  eyebrow: string
  title: string
  lead?: string
  /** public/images/ 配下のファイル名。指定すると写真を背景に敷く */
  image?: string
  imageAlt?: string
}

/**
 * 下層ページ共通のヘッダー。
 * h1 はここで出力するため、各ページ本文で h1 を重複させないこと。
 *
 * image を渡すと、写真の上に黒のグラデーションを重ねた濃色ヘッダーになる。
 * 写真がない場合は白背景のヘッダーにフォールバックする。
 */
export default function PageHero({ eyebrow, title, lead, image, imageAlt }: Props) {
  const photo = resolveImage(image)

  if (!photo) {
    return (
      <header className="relative overflow-hidden border-b border-mist-200 bg-white">
        <div
          className="pointer-events-none absolute -right-16 top-0 hidden h-full w-72 bg-diagonal text-mist-200 lg:block"
          aria-hidden="true"
          style={{ transform: 'skewX(-24deg)' }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-18 lg:px-8 lg:py-22">
          <p className="hero-in flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-700">
            <span className="eyebrow-bar" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1
            className="hero-in heading-jp mt-5 text-[1.75rem] font-bold text-ink-900 sm:text-4xl lg:text-[2.6rem]"
            style={{ animationDelay: '120ms' }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className="hero-in mt-6 max-w-3xl text-[15px] leading-[1.95] text-ink-600 sm:text-base"
              style={{ animationDelay: '240ms' }}
            >
              {lead}
            </p>
          )}
        </div>
      </header>
    )
  }

  return (
    <header className="relative overflow-hidden bg-ink-900">
      <Image
        src={photo}
        alt={imageAlt ?? ''}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <p className="hero-in flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-300">
          <span className="eyebrow-bar" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1
          className="hero-in heading-jp mt-5 text-[1.75rem] font-bold text-white sm:text-4xl lg:text-[2.6rem]"
          style={{ animationDelay: '120ms' }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="hero-in mt-6 max-w-3xl text-[15px] leading-[1.95] text-mist-200 sm:text-base"
            style={{ animationDelay: '240ms' }}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  )
}
