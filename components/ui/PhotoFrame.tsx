import Mark from './Mark'

type Props = {
  /** CSS aspect-ratio（例: '4 / 3'） */
  ratio?: string
  /** 枠に表示する短いラベル（例: '軽鉄工事の現場'） */
  label?: string
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * 写真の仮枠。
 *
 * 写真がまだ用意されていない箇所に表示される。
 * public/images/ に該当ファイルを置いて再ビルドすれば、
 * コードを変更せずに実写へ切り替わる（components/ui/Photo.tsx）。
 *
 * ※ 素材が揃うまでのあいだ「壊れて見えない」ことを優先し、
 *    ロゴの斜めモチーフを使ったブランドタイルとして設計している。
 * ※ 純粋な表示コンポーネント（fs非依存）なので、
 *    クライアントコンポーネントからも使用できる。
 */
export default function PhotoFrame({
  ratio = '4 / 3',
  label,
  tone = 'dark',
  className = '',
}: Props) {
  const isDark = tone === 'dark'

  return (
    <div
      className={`relative overflow-hidden border ${
        isDark
          ? // 濃色セクションの上でも枠として認識できるよう、薄い境界線を入れる
            'border-white/10 bg-ink-900'
          : 'border-mist-200 bg-mist-100'
      } ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label ? `${label}（写真は準備中です）` : '写真は準備中です'}
    >
      {/* 斜めストライプの地紋 */}
      <div
        className={`absolute inset-0 bg-diagonal ${isDark ? 'text-brand-500/25' : 'text-mist-300'}`}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
        <Mark
          className={`h-8 w-auto ${isDark ? 'text-white/25' : 'text-mist-400'}`}
          gradient={false}
        />
        {label && (
          <span
            className={`text-center text-[11px] tracking-[0.16em] ${
              isDark ? 'text-white/50' : 'text-ink-400'
            }`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
