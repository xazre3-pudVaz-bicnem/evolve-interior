import Image from 'next/image'
import Mark from './Mark'
import { findBrandLogo, findBrandLogoWhite } from '@/lib/media'
import { SITE_NAME, SITE_NAME_EN, SITE_TAGLINE_EN } from '@/lib/constants'

type Props = {
  /** dark: 濃色背景の上（白抜きロゴ） */
  tone?: 'light' | 'dark'
  className?: string
  gradientId?: string
  priority?: boolean
}

/**
 * ロゴのロックアップ。
 *
 * public/logo.png（支給の logo.pdf から生成）を使用する。
 * 濃色背景では public/logo-white.png（文字だけ白抜きにした版）を使う。
 * どちらも無い場合は、マーク＋テキストで組んだロックアップにフォールバックする。
 */
export default function Logo({
  tone = 'light',
  className = '',
  gradientId,
  priority = false,
}: Props) {
  const official = tone === 'dark' ? (findBrandLogoWhite() ?? findBrandLogo()) : findBrandLogo()

  if (official) {
    return (
      <Image
        src={official}
        alt={SITE_NAME}
        // 実際の表示は最大でも高さ44px（≒幅94px）。
        // 元画像は1200px幅だが、width にそのまま渡すと1200px版を読み込んでしまうため、
        // 表示サイズ（+Retina分）に見合った値を指定する。比率は元画像と同じ 1200:565。
        width={240}
        height={113}
        priority={priority}
        unoptimized={official.endsWith('.svg')}
        className={`h-9 w-auto sm:h-10 lg:h-11 ${className}`}
      />
    )
  }

  // フォールバック（公式ロゴが無い場合）
  const wordColor = tone === 'dark' ? 'text-white' : 'text-ink-900'
  const tagColor = tone === 'dark' ? 'text-mist-400' : 'text-ink-500'

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-auto sm:h-9" gradientId={gradientId} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-bold tracking-[0.06em] sm:text-2xl ${wordColor}`}
        >
          {SITE_NAME_EN}
        </span>
        <span className={`mt-1 text-[8px] tracking-[0.34em] sm:text-[9px] ${tagColor}`}>
          {SITE_TAGLINE_EN}
        </span>
      </span>
      <span className="sr-only">{SITE_NAME}</span>
    </span>
  )
}
