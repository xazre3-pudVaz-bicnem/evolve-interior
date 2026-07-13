import type { Faq } from '@/lib/faqs'

type Props = {
  faqs: readonly Faq[]
  className?: string
}

/**
 * FAQ 一覧。
 * <details>/<summary> を使い、JavaScript なしで開閉できるようにしている。
 * （構造化データは各ページ側で faqSchema() を出力すること）
 */
export default function FaqList({ faqs, className = '' }: Props) {
  return (
    <div className={`divide-y divide-mist-200 border-y border-mist-200 ${className}`}>
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-[15px] font-medium text-ink-900 transition-colors hover:text-brand-700 sm:py-6 sm:text-base">
            <span
              className="mt-0.5 shrink-0 font-display text-sm font-bold text-brand-700"
              aria-hidden="true"
            >
              Q
            </span>
            <span className="flex-1">{faq.q}</span>
            <span
              className="mt-1 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              ＋
            </span>
          </summary>
          <div className="flex gap-4 pb-6 pr-8">
            <span
              className="shrink-0 font-display text-sm font-bold text-ink-400"
              aria-hidden="true"
            >
              A
            </span>
            <p className="flex-1 text-[14.5px] leading-[1.95] text-ink-600">{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
