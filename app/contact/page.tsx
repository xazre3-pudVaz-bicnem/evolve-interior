import Link from 'next/link'
import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/ui/JsonLd'
import PhoneIcon from '@/components/ui/PhoneIcon'
import ContactForm from '@/components/forms/ContactForm'

import { COMPANY } from '@/lib/constants'
import { ESTIMATE_NOTE } from '@/lib/services'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = 'お問い合わせ｜軽鉄・ボード・内装工事のご相談'
const DESCRIPTION =
  '株式会社EVOLVEへの工事のご相談はこちら。軽鉄工事、ボード工事、大工造作、内装仕上げなどのご相談を承ります。法人・工務店・一般のお客様、いずれのご相談も受け付けています。受付時間は08:30〜18:30です。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
  keywords: ['内装工事 相談', '軽鉄工事 見積もり', 'ボード工事 依頼', '尼崎 内装工事'],
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/contact' })} />

      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />

      <PageHero
        eyebrow="CONTACT"
        title="工事のご相談"
        lead="工事の内容が固まっていない段階でのご相談も承ります。「壁を一枚つくりたい」「この壁を張り替えたい」といった内容で構いません。"
        image="banner-contact.jpg"
        imageAlt="化粧ボードで仕上げられた室内の壁と天井"
      />

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            {/* フォーム */}
            <div>
              <ContactForm />
            </div>

            {/* サイド情報 */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {/* 電話 */}
              <div className="border border-mist-200 bg-mist-50 p-6 sm:p-7">
                <h2 className="text-[11px] font-medium tracking-[0.2em] text-ink-500">
                  お電話でのご相談
                </h2>
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="mt-4 flex items-center gap-3 text-2xl font-bold text-ink-900 transition-colors hover:text-brand-700"
                >
                  <PhoneIcon className="h-6 w-6 text-brand-700" />
                  {COMPANY.phone}
                </a>
                <p className="mt-2 text-[13px] text-ink-500">受付時間 {COMPANY.hours}</p>

                <div className="mt-5 border-t border-mist-200 pt-5">
                  <h3 className="text-[11px] font-medium tracking-[0.2em] text-ink-500">
                    メール
                  </h3>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-2 block break-all text-[14px] text-ink-800 underline decoration-mist-300 underline-offset-4 transition-colors hover:text-brand-700"
                  >
                    {COMPANY.email}
                  </a>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
                    図面や写真は、こちらのアドレス宛にお送りいただけます。
                  </p>
                </div>
              </div>

              {/* 見積もりについて */}
              <div className="mt-6 border-l-2 border-brand-500 bg-white p-6">
                <h2 className="text-[14px] font-bold text-ink-900">お見積もりについて</h2>
                <p className="mt-3 text-[13.5px] leading-[1.9] text-ink-600">{ESTIMATE_NOTE}</p>
              </div>

              {/* 採用への導線（目的が違うため明確に分ける） */}
              <div className="mt-6 border border-mist-200 p-6">
                <h2 className="text-[14px] font-bold text-ink-900">
                  採用へのご応募をお考えの方
                </h2>
                <p className="mt-3 text-[13.5px] leading-[1.9] text-ink-600">
                  こちらは工事のご相談用のフォームです。採用へのご応募は、専用のフォームからお願いします。
                </p>
                <Link
                  href="/recruit/apply"
                  className="group mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-brand-700"
                >
                  応募フォームへ
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>

              {/* FAQ導線 */}
              <div className="mt-6">
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-2 text-[13.5px] text-ink-600 underline decoration-mist-300 underline-offset-4 transition-colors hover:text-brand-700"
                >
                  よくあるご質問を見る
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
