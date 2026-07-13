import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/ui/JsonLd'
import PhoneIcon from '@/components/ui/PhoneIcon'

import { REQUIREMENTS, UNDETERMINED_TEXT } from '@/lib/recruit'
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
  return (
    <>
      {/* JobPosting は条件が未確定のため出力しない（lib/recruit.ts 参照） */}
      <JsonLd
        data={webPageSchema({
          title: TITLE,
          description: DESCRIPTION,
          path: '/recruit/requirements',
        })}
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

          {/* 未確定条件についての説明 */}
          <div className="mt-10 border-l-2 border-brand-500 bg-mist-50 p-6 sm:p-7">
            <h2 className="text-[15px] font-bold text-ink-900">
              条件について
            </h2>
            <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
              待遇や条件の詳細については、面談の際に直接ご案内します。ご希望やご事情もその場でお聞かせください。すり合わせたうえで、お互いに納得できる形を探したいと考えています。
            </p>
            <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
              経験者の方は、これまでの経験や技術を考慮します。詳しい条件は面談時にご案内します。
            </p>
          </div>

          {/* 応募前の質問 */}
          <div className="mt-8 border border-mist-200 p-6 sm:p-7">
            <h2 className="text-[15px] font-bold text-ink-900">
              応募前に質問だけしたい方へ
            </h2>
            <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
              応募フォームの「応募理由・ご質問」欄に、聞いてみたいことをご記入ください。お電話でのご質問も承っています。
            </p>

            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="mt-5 inline-flex items-center gap-3 text-xl font-bold text-ink-900 transition-colors hover:text-brand-700"
            >
              <PhoneIcon className="h-5 w-5 text-brand-700" />
              {COMPANY.phone}
            </a>
            <p className="mt-1.5 text-[12.5px] text-ink-500">
              お問い合わせ受付時間 {COMPANY.hours}
            </p>
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
