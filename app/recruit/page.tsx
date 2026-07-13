import Link from 'next/link'
import type { Metadata } from 'next'

import Breadcrumb from '@/components/ui/Breadcrumb'
import Photo from '@/components/ui/Photo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import FaqList from '@/components/ui/FaqList'
import InstagramBlock from '@/components/ui/InstagramBlock'
import JsonLd from '@/components/ui/JsonLd'
import PhoneIcon from '@/components/ui/PhoneIcon'

import {
  RECRUIT_APPEALS,
  IDEAL_CANDIDATES,
  MESSAGE_BEGINNER,
  MESSAGE_EXPERIENCED,
  JOB_TASKS,
  DAY_SCHEDULE,
} from '@/lib/recruit'
import { RECRUIT_FAQS } from '@/lib/faqs'
import { COMPANY } from '@/lib/constants'
import { pageMeta, faqSchema, webPageSchema } from '@/lib/seo'

const TITLE = '内装工事スタッフ求人｜未経験・経験者歓迎'
const DESCRIPTION =
  '株式会社EVOLVEの採用情報。軽鉄・ボード工事を中心とした内装工事スタッフを募集しています。未経験の方も、経験を活かしたい方も歓迎。主な現場は兵庫・大阪・京都・滋賀を中心とした関西エリアです。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/recruit',
  keywords: [
    '尼崎 内装工事 求人',
    '尼崎 軽鉄 求人',
    '尼崎 ボード工 求人',
    '兵庫 軽鉄 求人',
    '兵庫 ボード工 求人',
    '大阪 内装工 求人',
    '軽鉄 未経験 求人',
    'ボード工 未経験',
    '内装工事 経験者 求人',
    '内装職人 求人 関西',
  ],
})

export default function RecruitPage() {
  return (
    <>
      {/*
        JobPosting は給与・雇用形態・休日などが未確定のため、意図的に出力していない。
        条件が確定したら lib/recruit.ts の JOB_POSTING_DATA を埋めることで有効化できる。
      */}
      <JsonLd
        data={[
          webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/recruit' }),
          faqSchema(RECRUIT_FAQS),
        ]}
      />

      <Breadcrumb items={[{ label: '採用情報' }]} />

      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-ink-900">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-300">
                <span className="eyebrow-bar" aria-hidden="true" />
                RECRUIT
              </p>

              <h1 className="heading-jp mt-6 text-[2rem] font-bold leading-[1.3] text-white sm:text-5xl">
                内装の仕事を、
                <br />
                一生ものの技術に。
              </h1>

              <p className="mt-8 max-w-xl text-[15px] leading-[2] text-mist-300">
                未経験から軽鉄・ボード工事の技術を身につけたい方も、これまでの経験を活かしたい方も歓迎します。
              </p>

              <p className="mt-4 max-w-xl text-[14px] leading-[1.95] text-mist-400">
                10代後半から20代の若手スタッフを中心に、幅広い年代の方からの応募を歓迎しています。男女は問いません。
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/recruit/apply" variant="primary">
                  応募する
                </Button>
                <Button href="/recruit/requirements" variant="outlineLight">
                  募集要項を見る
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="zoom-parent mt-10 overflow-hidden">
                <Photo
                  src="recruit-hero-1.jpg"
                  alt="天井材を施工する株式会社EVOLVEのスタッフ"
                  label="スタッフ"
                  ratio="3 / 4"
                  tone="dark"
                  priority
                  sizes="(max-width: 1024px) 45vw, 25vw"
                />
              </div>
              <div className="zoom-parent overflow-hidden">
                <Photo
                  src="recruit-hero-2.jpg"
                  alt="大空間の天井に軽量鉄骨の下地を組んだ施工現場"
                  label="現場"
                  ratio="3 / 4"
                  tone="dark"
                  priority
                  sizes="(max-width: 1024px) 45vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 働く魅力 */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="appeal-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading id="appeal-heading" eyebrow="WHY EVOLVE" title="EVOLVEで働く魅力" as="h2" />

          <ul className="mt-14 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2">
            {RECRUIT_APPEALS.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 2) * 60}>
                <div className="flex h-full flex-col bg-white p-8 sm:p-10">
                  <span className="font-display text-3xl font-bold text-ink-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="heading-jp mt-5 text-lg font-bold text-ink-900">{a.title}</h3>
                  <p className="mt-4 text-[14.5px] leading-[1.95] text-ink-600">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 仕事内容 */}
      <section
        className="border-y border-mist-200 bg-mist-50 py-20 sm:py-24"
        aria-labelledby="tasks-heading"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                id="tasks-heading"
                eyebrow="WORK"
                title="仕事内容"
                lead="建物の内側をつくる仕事です。壁や天井の骨組みを組み、ボードを張り、仕上げていきます。現場や工事の内容によって、担当する作業は変わります。"
                as="h2"
              />

              <p className="mt-8 text-[14px] leading-[1.95] text-ink-600">
                未経験の方は、運搬や片付けといった作業から始めて、道具の使い方、材料の扱い方を順に覚えていきます。いきなりすべてを任せることはありません。
              </p>

              <div className="mt-10">
                <Button href="/recruit/day" variant="outline">
                  一日の流れを見る
                </Button>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ul className="grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2">
                {JOB_TASKS.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-3 bg-white p-5 text-[14px] text-ink-800"
                  >
                    <span
                      className="h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                      aria-hidden="true"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 未経験の方へ / 経験者の方へ */}
      <section aria-labelledby="messages-heading">
        <h2 id="messages-heading" className="sr-only">
          未経験の方・経験者の方へ
        </h2>

        <div className="grid lg:grid-cols-2">
          {/* 未経験 */}
          <div className="bg-white px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <div className="mx-auto max-w-lg lg:ml-auto lg:mr-0">
              <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-700">
                <span className="eyebrow-bar" aria-hidden="true" />
                FOR BEGINNERS
              </p>
              <h3 className="heading-jp mt-4 text-2xl font-bold text-ink-900">
                {MESSAGE_BEGINNER.title}
              </h3>
              <p className="mt-6 text-lg font-medium leading-[1.7] text-ink-800">
                {MESSAGE_BEGINNER.lead}
              </p>

              <div className="prose-jp mt-6 space-y-5 text-[14.5px] text-ink-600">
                {MESSAGE_BEGINNER.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 経験者 */}
          <div className="bg-ink-900 px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <div className="mx-auto max-w-lg lg:mr-auto lg:ml-0">
              <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-300">
                <span className="eyebrow-bar" aria-hidden="true" />
                FOR EXPERIENCED
              </p>
              <h3 className="heading-jp mt-4 text-2xl font-bold text-white">
                {MESSAGE_EXPERIENCED.title}
              </h3>
              <p className="mt-6 text-lg font-medium leading-[1.7] text-mist-100">
                {MESSAGE_EXPERIENCED.lead}
              </p>

              <div className="prose-jp mt-6 space-y-5 text-[14.5px] text-mist-300">
                {MESSAGE_EXPERIENCED.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 求める人物像 */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="ideal-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            id="ideal-heading"
            eyebrow="WE WANT"
            title="求める人物像"
            lead="特別な資格や経験がなくても構いません。次のような方を歓迎します。"
            as="h2"
          />

          <ul className="mt-12 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-3">
            {IDEAL_CANDIDATES.map((c, i) => (
              <Reveal as="li" key={c} delay={(i % 3) * 60}>
                <div className="flex h-full items-start gap-4 bg-white p-7">
                  <span className="font-display text-sm font-bold text-brand-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14.5px] leading-[1.7] text-ink-800">{c}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 一日の流れ（要約） */}
      <section
        className="border-y border-mist-200 bg-mist-50 py-20 sm:py-24"
        aria-labelledby="day-heading"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            id="day-heading"
            eyebrow="A DAY"
            title="一日の流れ"
            lead="基本的に現場へ直行し、作業終了後は現地で解散します。"
            as="h2"
          />

          <ol className="mt-12 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-5">
            {DAY_SCHEDULE.map((d) => (
              <li key={d.time} className="flex h-full flex-col bg-white p-6">
                <span className="font-display text-xl font-bold text-brand-700">{d.time}</span>
                <span
                  className="mt-3 h-1 w-6 skew-x-[-24deg] bg-brand-500"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-[14px] font-bold leading-snug text-ink-900">
                  {d.title}
                </h3>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Button href="/recruit/day" variant="outline">
              一日の流れを詳しく見る
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-20 sm:py-24" aria-labelledby="ig-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            id="ig-heading"
            eyebrow="INSTAGRAM"
            title="現場の雰囲気を見てみる"
            lead="日々の仕事の様子は、Instagramで発信しています。応募前に、どんな現場なのかを見ていただけます。"
            as="h2"
            align="center"
          />
          <InstagramBlock className="mt-12" tone="light" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist-50 py-20 sm:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="採用に関するよくあるご質問"
            as="h2"
            align="center"
          />
          <FaqList faqs={RECRUIT_FAQS} className="mt-12" />
        </div>
      </section>

      {/* 応募CTA */}
      <section className="bg-ink-900 py-20 sm:py-24" aria-labelledby="apply-cta-heading">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <h2
            id="apply-cta-heading"
            className="heading-jp text-2xl font-bold text-white sm:text-3xl"
          >
            まずは、話を聞くところから。
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.95] text-mist-300">
            応募前のご質問だけでも構いません。仕事の内容や働き方について、気になることをお聞かせください。
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/recruit/apply" variant="primary">
              応募フォームへ
            </Button>
            <Button href="/recruit/requirements" variant="outlineLight">
              募集要項を見る
            </Button>
          </div>

          <div className="mt-12 border-t border-white/10 pt-10">
            <p className="text-[11px] tracking-[0.2em] text-mist-400">お電話でのお問い合わせ</p>
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="mt-3 inline-flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-brand-300 sm:text-3xl"
            >
              <PhoneIcon className="h-6 w-6 text-brand-400" />
              {COMPANY.phone}
            </a>
            <p className="mt-2 text-xs text-mist-400">受付時間 {COMPANY.hours}</p>
          </div>

          <p className="mt-10 text-[13px] text-mist-400">
            工事のご相談は
            <Link
              href="/contact"
              className="mx-1 text-white underline underline-offset-4 hover:text-brand-300"
            >
              お問い合わせフォーム
            </Link>
            からお願いします。
          </p>
        </div>
      </section>
    </>
  )
}
