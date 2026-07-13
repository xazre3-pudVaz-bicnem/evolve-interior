import Link from 'next/link'
import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/ui/JsonLd'
import { SERVICES } from '@/lib/services'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = 'サイトマップ'
const DESCRIPTION =
  '株式会社EVOLVEのウェブサイトのページ一覧です。事業内容、施工実績、会社概要、採用情報、お問い合わせページをご覧いただけます。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/sitemap',
})

const GROUPS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'メインページ',
    links: [
      { label: 'トップページ', href: '/' },
      { label: '事業内容', href: '/services' },
      { label: '施工実績', href: '/works' },
      { label: '会社概要', href: '/company' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
  },
  {
    heading: '対応できる工事',
    links: SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    heading: '採用情報',
    links: [
      { label: '採用情報', href: '/recruit' },
      { label: '募集要項', href: '/recruit/requirements' },
      { label: '一日の流れ', href: '/recruit/day' },
      { label: '応募フォーム', href: '/recruit/apply' },
    ],
  },
  {
    heading: 'その他',
    links: [
      { label: '個人情報保護方針', href: '/privacy' },
      { label: 'サイトマップ', href: '/sitemap' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/sitemap' })} />

      <Breadcrumb items={[{ label: 'サイトマップ' }]} />

      <PageHero eyebrow="SITEMAP" title="サイトマップ" />

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-14 sm:grid-cols-2">
            {GROUPS.map((g) => (
              <nav key={g.heading} aria-labelledby={`sitemap-${g.heading}`}>
                <h2
                  id={`sitemap-${g.heading}`}
                  className="flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-brand-700"
                >
                  <span className="eyebrow-bar" aria-hidden="true" />
                  {g.heading}
                </h2>

                <ul className="mt-5 divide-y divide-mist-200 border-y border-mist-200">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between py-3.5 text-[14.5px] text-ink-800 transition-colors hover:text-brand-700"
                      >
                        {l.label}
                        <span
                          aria-hidden="true"
                          className="text-mist-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-700"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
