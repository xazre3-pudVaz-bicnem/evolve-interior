import Link from 'next/link'
import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import FaqList from '@/components/ui/FaqList'
import ContactCta from '@/components/ui/ContactCta'
import JsonLd from '@/components/ui/JsonLd'

import { SERVICES } from '@/lib/services'
import { CUSTOMER_FAQS } from '@/lib/faqs'
import { pageMeta, faqSchema, webPageSchema } from '@/lib/seo'

const TITLE = '事業内容｜軽鉄・ボード工事から内装仕上げまで'
const DESCRIPTION =
  '株式会社EVOLVEの事業内容。軽鉄工事、ボード工事、化粧ケイカル工事、キッチンパネル工事、システム天井工事、大工造作工事、クロス、塗装、サイディングに対応しています。兵庫・大阪・京都・滋賀を中心とした関西エリアで施工します。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/services',
  keywords: [
    '軽鉄工事',
    'ボード工事',
    '内装工事',
    '内装下地工事',
    '尼崎 内装工事',
    '兵庫 軽鉄工事',
    '大阪 ボード工事',
    '関西 内装工事',
  ],
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/services' }),
          faqSchema(CUSTOMER_FAQS),
        ]}
      />

      <Breadcrumb items={[{ label: '事業内容' }]} />

      <PageHero
        eyebrow="SERVICES"
        title="対応できる工事"
        lead="軽鉄・ボード工事を中心に、内装に関わる工事を幅広く承っています。工事の名前が分からなくても構いません。「やりたいこと」をお聞かせいただければ、どの工事にあたるのかをご説明します。"
        image="banner-services.jpg"
        imageAlt="軽量鉄骨の下地と石膏ボードが並ぶ内装工事の現場"
      />

      {/* 工事一覧 */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="space-y-16 lg:space-y-20">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Photo
                    src={s.image}
                    alt={`${s.name}の施工の様子`}
                    label={s.name}
                    ratio="16 / 10"
                    tone="light"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-4xl font-bold text-mist-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-mist-200" aria-hidden="true" />
                      <span className="text-[10px] tracking-[0.2em] text-ink-400">
                        {s.nameEn.toUpperCase()}
                      </span>
                    </div>

                    <h2 className="heading-jp mt-5 text-2xl font-bold text-ink-900">
                      {s.name}
                    </h2>

                    <p className="mt-5 text-[15px] leading-[2] text-ink-600">{s.plain}</p>

                    <Link
                      href={`/services/${s.slug}`}
                      className="group mt-7 inline-flex items-center gap-2.5 border border-mist-300 px-6 py-3.5 text-[14px] font-medium text-ink-900 transition-colors hover:border-ink-900"
                    >
                      {s.name}の詳細を見る
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist-50 py-20 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="よくあるご質問"
            lead="工事のご相談について、よくいただく質問をまとめました。ここにない内容も、お気軽にお問い合わせください。"
            as="h2"
            align="center"
          />
          <FaqList faqs={CUSTOMER_FAQS} className="mt-12" />
        </div>
      </section>

      <ContactCta />
    </>
  )
}
