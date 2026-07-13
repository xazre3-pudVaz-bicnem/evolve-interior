import Link from 'next/link'
import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/ui/JsonLd'
import PhoneIcon from '@/components/ui/PhoneIcon'
import ApplyForm from '@/components/forms/ApplyForm'

import { COMPANY } from '@/lib/constants'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = '応募フォーム｜内装工事スタッフ求人'
const DESCRIPTION =
  '株式会社EVOLVEの採用応募フォーム。軽鉄・ボード工事を中心とした内装工事スタッフを募集しています。未経験・経験者ともに歓迎。応募前のご質問だけでも承ります。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/recruit/apply',
  keywords: ['内装工事 求人 応募', '軽鉄 求人 応募', '尼崎 内装工事 求人'],
})

export default function ApplyPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/recruit/apply' })}
      />

      <Breadcrumb
        items={[{ label: '採用情報', href: '/recruit' }, { label: '応募フォーム' }]}
      />

      <PageHero
        eyebrow="APPLY"
        title="応募フォーム"
        lead="ご応募をお待ちしています。「まずは話を聞いてみたい」という段階でも構いません。質問だけのご記入でも受け付けています。"
      />

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div>
              <ApplyForm />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-mist-200 bg-mist-50 p-6 sm:p-7">
                <h2 className="text-[11px] font-medium tracking-[0.2em] text-ink-500">
                  お電話でのご応募・ご質問
                </h2>
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="mt-4 flex items-center gap-3 text-2xl font-bold text-ink-900 transition-colors hover:text-brand-700"
                >
                  <PhoneIcon className="h-6 w-6 text-brand-700" />
                  {COMPANY.phone}
                </a>
                <p className="mt-2 text-[13px] text-ink-500">受付時間 {COMPANY.hours}</p>
                <p className="mt-4 text-[12.5px] leading-relaxed text-ink-500">
                  フォームでのご応募が難しい場合は、お電話でもご連絡いただけます。
                </p>
              </div>

              <div className="mt-6 border-l-2 border-brand-500 bg-white p-6">
                <h2 className="text-[14px] font-bold text-ink-900">条件について</h2>
                <p className="mt-3 text-[13.5px] leading-[1.9] text-ink-600">
                  待遇や働き方の詳細は、面談の際にご案内します。現時点で希望が固まっていなくても構いません。
                </p>
                <Link
                  href="/recruit/requirements"
                  className="group mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-brand-700"
                >
                  募集要項を見る
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              {/* 工事相談との切り分け */}
              <div className="mt-6 border border-mist-200 p-6">
                <h2 className="text-[14px] font-bold text-ink-900">
                  工事のご相談をお考えの方
                </h2>
                <p className="mt-3 text-[13.5px] leading-[1.9] text-ink-600">
                  こちらは採用応募用のフォームです。工事のご相談は、専用のフォームからお願いします。
                </p>
                <Link
                  href="/contact"
                  className="group mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-brand-700"
                >
                  お問い合わせフォームへ
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
