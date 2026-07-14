import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/ui/JsonLd'
import PhoneIcon from '@/components/ui/PhoneIcon'
import LineButton from '@/components/ui/LineButton'

import { REQUIREMENTS, UNDETERMINED_TEXT, buildJobPostingSchema } from '@/lib/recruit'
import { COMPANY } from '@/lib/constants'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = '募集要項｜内装工事スタッフ'
const DESCRIPTION =
  '株式会社EVOLVEの募集要項。内装工事スタッフを募集しています。軽鉄工事・ボード工事を中心とした仕事内容、主な現場エリア、勤務時間の目安を掲載しています。未経験・経験者ともに歓迎します。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/recruit/requirements',
  keywords: [
    '内装工事 求人 募集要項',
    '軽鉄 求人',
    'ボード工 求人',
    '尼崎 内装工事 求人',
    '関西 内装職人 求人',
  ],
})

export default function RequirementsPage() {
  // 給与などの確定値が入ったため、JobPosting を出力する（未確定なら null が返り出力されない）。
  // この募集要項ページは給与・雇用形態・待遇が実際に表示されており、
  // 構造化データと画面表示が一致する（Googleしごと検索の要件）。
  const jobPosting = buildJobPostingSchema()

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: TITLE,
            description: DESCRIPTION,
            path: '/recruit/requirements',
          }),
          ...(jobPosting ? [jobPosting] : []),
        ]}
      />

      <Breadcrumb
        items={[{ label: '採用情報', href: '/recruit' }, { label: '募集要項' }]}
      />

      <PageHero
        eyebrow="REQUIREMENTS"
        title="募集要項"
        lead="内装工事スタッフを募集しています。未経験の方も、経験を活かしたい方も歓迎します。"
        image="banner-requirements.jpg"
        imageAlt="吹き抜けの曲面天井に組まれた軽量鉄骨の下地"
      />

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <dl className="border-t border-mist-300">
            {REQUIREMENTS.map((r) => {
              const undetermined = r.value === null

              return (
                <div
                  key={r.label}
                  className="grid gap-2 border-b border-mist-200 py-5 sm:grid-cols-[190px_1fr] sm:gap-6 sm:py-7"
                >
                  <dt className="text-[13px] font-medium text-ink-500 sm:pt-1">{r.label}</dt>

                  <dd>
                    {undetermined ? (
                      <p className="text-[14.5px] text-ink-500">{UNDETERMINED_TEXT}</p>
                    ) : Array.isArray(r.value) ? (
                      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {r.value.map((v) => (
                          <li key={v} className="flex items-center gap-2.5">
                            <span
                              className="h-1.5 w-3 shrink-0 skew-x-[-24deg] bg-brand-500"
                              aria-hidden="true"
                            />
                            <span className="text-[14.5px] text-ink-800">{v}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[15px] leading-[1.9] text-ink-800">{r.value}</p>
                    )}

                    {r.note && (
                      <p className="mt-3 text-[13px] leading-[1.9] text-ink-500">{r.note}</p>
                    )}
                  </dd>
                </div>
              )
            })}
          </dl>

          {/*
            条件は上の表に掲載済み。ここは「掲載内容についてさらに聞きたい」
            「自分の経験だと給与はどうなるか」を、応募前に気軽に相談できる導線にする。
          */}
          <div className="mt-10 border-l-2 border-brand-500 bg-mist-50 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-ink-900">
              応募前のご質問・ご相談
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.95] text-ink-700">
              給与は経験や技術を考慮して決定します。「自分の経験だとどのくらいになるか」「未経験からどう覚えていくか」など、掲載している内容についてもっと詳しく知りたいことがあれば、応募前にお気軽にお尋ねください。
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.95] text-ink-700">
              経験者の方は、これまでの経験や技術を考慮します。未経験の方も、できることから任せていきます。
            </p>

            <div className="mt-6 border-t border-mist-300 pt-6">
              <p className="text-[14px] font-bold text-ink-900">
                まずは質問だけでも
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.9] text-ink-600">
                応募する前に質問だけ、でも構いません。LINEでもお電話でも受け付けています。名前を名乗らずに聞いていただいても大丈夫です。
              </p>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <LineButton variant="filled" className="w-full sm:w-auto">
                  LINEで質問する
                </LineButton>

                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="inline-flex items-center gap-3 text-xl font-bold text-ink-900 transition-colors hover:text-brand-700"
                >
                  <PhoneIcon className="h-5 w-5 text-brand-700" />
                  {COMPANY.phone}
                  <span className="text-[12px] font-normal text-ink-500">
                    受付 {COMPANY.hours}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button href="/recruit/apply" variant="primary">
              応募フォームへ
            </Button>
            <Button href="/recruit/day" variant="outline">
              一日の流れを見る
            </Button>
          </div>
        </div>
      </section>

      {/* 応募CTA */}
      <section className="bg-ink-900 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <SectionHeading
            eyebrow="APPLY"
            title="ご応募をお待ちしています"
            lead="まずは話を聞いてみたい、という段階でも構いません。"
            as="h2"
            align="center"
            tone="dark"
          />
          <div className="mt-10 flex justify-center">
            <Button href="/recruit/apply" variant="primary">
              応募する
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
