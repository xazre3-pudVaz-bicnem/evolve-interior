import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Photo from '@/components/ui/Photo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/ui/JsonLd'

import { DAY_SCHEDULE, DAY_NOTES } from '@/lib/recruit'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = '一日の流れ｜内装工事スタッフの仕事'
const DESCRIPTION =
  '株式会社EVOLVEで働くスタッフの一日の流れ。08:30に現場集合、作業内容の確認から始まり、17:30に作業終了・現地解散まで。基本的に現場へ直行し、工事対応後は現地で解散します。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/recruit/day',
  keywords: ['内装工事 一日の流れ', '軽鉄 仕事内容', 'ボード工 仕事内容', '内装工事 求人'],
})

export default function DayPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/recruit/day' })}
      />

      <Breadcrumb
        items={[{ label: '採用情報', href: '/recruit' }, { label: '一日の流れ' }]}
      />

      <PageHero
        eyebrow="A DAY AT EVOLVE"
        title="一日の流れ"
        lead="基本的に現場へ直行し、作業が終われば現地で解散します。現場や工事の内容によって、流れが異なる場合があります。"
        image="banner-day.jpg"
        imageAlt="曲面の天井下地とボードが施工された現場"
      />

      {/* タイムライン */}
      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <ol className="space-y-14 lg:space-y-20">
            {DAY_SCHEDULE.map((d, i) => (
              <Reveal as="li" key={d.time}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="zoom-parent overflow-hidden">
                    <Photo
                      src={d.image}
                      alt={`${d.title}の様子`}
                      label={d.title}
                      ratio="4 / 3"
                      tone="light"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-4">
                      <span className="bg-ink-900 px-4 py-2">
                        <span className="font-display text-lg font-bold text-white">
                          {d.time}
                        </span>
                      </span>
                      <span className="h-px flex-1 bg-mist-200" aria-hidden="true" />
                    </div>

                    <h2 className="heading-jp mt-6 text-xl font-bold text-ink-900 sm:text-2xl">
                      {d.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-[2] text-ink-600">{d.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 補足 */}
      <section className="border-y border-mist-200 bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading eyebrow="NOTES" title="働き方について" as="h2" />

          <ul className="mt-8 space-y-4 border-l-2 border-brand-500 pl-6">
            {DAY_NOTES.map((n) => (
              <li key={n} className="text-[15px] leading-[1.95] text-ink-700">
                {n}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[13.5px] leading-[1.9] text-ink-500">
            休憩や勤務時間の詳細については、面談の際にご案内します。
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button href="/recruit/apply" variant="primary">
              応募フォームへ
            </Button>
            <Button href="/recruit/requirements" variant="outline">
              募集要項を見る
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
