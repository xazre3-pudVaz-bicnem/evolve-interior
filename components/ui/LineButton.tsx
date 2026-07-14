import { LINE_URL } from '@/lib/constants'
import LineIcon from './LineIcon'

type Variant = 'filled' | 'outline' | 'outlineLight'

type Props = {
  children: React.ReactNode
  variant?: Variant
  className?: string
  'aria-label'?: string
}

/**
 * LINEの友だち追加へのリンク。
 *
 * ※ 色について
 *   LINE緑（#06C755）は白文字だと 2.26:1 しかなく、文字が読めない。
 *   濃色文字を乗せると 8.4:1 になるため、filled では必ず濃色文字を使う。
 */
const VARIANTS: Record<Variant, string> = {
  filled: 'bg-line text-ink-900 hover:bg-line-dark',
  outline: 'border border-line bg-white text-ink-900 hover:bg-line/10',
  outlineLight: 'border border-white/30 text-white hover:bg-white/10',
}

export default function LineButton({
  children,
  variant = 'filled',
  className = '',
  ...rest
}: Props) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-medium transition-colors ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      <LineIcon
        className={`h-5 w-5 shrink-0 ${variant === 'outline' ? 'text-line' : ''}`}
      />
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  )
}
