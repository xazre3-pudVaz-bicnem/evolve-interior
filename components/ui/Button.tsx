import Link from 'next/link'

type Variant = 'primary' | 'dark' | 'outline' | 'outlineLight'

type Props = {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  /** 外部リンク */
  external?: boolean
  'aria-label'?: string
}

/**
 * ボタン。角丸は使わず、ロゴの斜めモチーフに合わせた直線的な形。
 *
 * ※ 緑ボタンは brand-700（白文字とのコントラスト 6.4:1）を使う。
 *   ロゴ色の brand-500 は白文字だと 3.2:1 しかなく、本文サイズでは不足するため使わない。
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800',
  dark: 'bg-ink-900 text-white hover:bg-ink-800',
  outline: 'border border-mist-300 bg-white text-ink-900 hover:border-ink-900',
  outlineLight: 'border border-white/30 text-white hover:bg-white/10',
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  ...rest
}: Props) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[15px] font-medium transition-colors duration-200'
  const cls = `${base} ${VARIANTS[variant]} ${className}`

  const inner = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  )
}
