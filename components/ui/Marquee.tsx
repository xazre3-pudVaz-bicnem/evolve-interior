import { SERVICES } from '@/lib/services'

const ITEMS = SERVICES.map((s) => s.name)

/** 1列分。2列目は読み上げの重複を避けるため aria-hidden にする。 */
function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {ITEMS.map((name) => (
        <li key={name} className="flex items-center gap-8 px-8">
          <span
            className="h-1.5 w-4 shrink-0 skew-x-[-24deg] bg-brand-500"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap text-lg font-medium text-white/80 sm:text-xl">
            {name}
          </span>
        </li>
      ))}
    </ul>
  )
}

/**
 * 工事名が流れる帯。
 * CSSアニメーションのみ（JS不要）。prefers-reduced-motion では止まる。
 */
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink-900 py-6">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
