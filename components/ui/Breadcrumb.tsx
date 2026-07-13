import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import JsonLd from './JsonLd'

export type Crumb = { label: string; href?: string }

/** パンくずリスト（表示 + BreadcrumbList 構造化データ） */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: 'ホーム', href: '/' }, ...items]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="パンくずリスト" className="border-b border-mist-200 bg-white">
      <JsonLd data={schema} />
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-1 px-5 py-3 text-xs text-ink-500 lg:px-8">
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className="transition-colors hover:text-brand-700">
                  {c.label}
                </Link>
              ) : (
                <span className={last ? 'text-ink-700' : ''} aria-current={last ? 'page' : undefined}>
                  {c.label}
                </span>
              )}
              {!last && (
                <span className="text-mist-400" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
