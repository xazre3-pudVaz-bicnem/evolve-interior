import Link from 'next/link'
import type { Metadata } from 'next'

import Button from '@/components/ui/Button'
import Mark from '@/components/ui/Mark'
import { SERVICES } from '@/lib/services'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <div className="mx-auto w-full max-w-3xl px-5 text-center lg:px-8">
        <Mark className="mx-auto h-12 w-auto" gradientId="evolve-mark-404" />

        <p className="mt-10 font-display text-6xl font-bold text-mist-300 sm:text-7xl">404</p>

        <h1 className="heading-jp mt-6 text-2xl font-bold text-ink-900 sm:text-3xl">
          ページが見つかりませんでした
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.95] text-ink-600">
          お探しのページは、移動または削除された可能性があります。お手数ですが、下記からお進みください。
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href="/" variant="primary">
            トップページへ戻る
          </Button>
          <Button href="/contact" variant="outline">
            お問い合わせ
          </Button>
        </div>

        {/* 主要ページへの導線 */}
        <div className="mt-16 border-t border-mist-200 pt-10 text-left">
          <h2 className="text-center text-[11px] font-medium tracking-[0.2em] text-ink-500">
            対応できる工事
          </h2>
          <ul className="mt-6 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex h-full items-center bg-white p-4 text-[13.5px] text-ink-800 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-[13px] text-ink-500">
          お急ぎの方は
          <a
            href={`tel:${COMPANY.phoneHref}`}
            className="mx-1 font-bold text-ink-900 hover:text-brand-700"
          >
            {COMPANY.phone}
          </a>
          （受付 {COMPANY.hours}）までご連絡ください。
        </p>
      </div>
    </section>
  )
}
