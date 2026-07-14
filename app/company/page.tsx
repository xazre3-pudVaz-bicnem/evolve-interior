import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactCta from '@/components/ui/ContactCta'
import GoogleMap from '@/components/ui/GoogleMap'
import JsonLd from '@/components/ui/JsonLd'

import { COMPANY, SITE_NAME, AREAS, AREA_SUMMARY } from '@/lib/constants'
import { SERVICES } from '@/lib/services'
import { pageMeta, webPageSchema } from '@/lib/seo'

// ※ 社名を入れないこと。layout.tsx の title.template が
//    「%s｜株式会社EVOLVE」を後ろに付けるため、二重になる。
const TITLE = '会社概要｜兵庫県尼崎市の内装工事会社'
const DESCRIPTION = `株式会社EVOLVEの会社概要。兵庫県尼崎市大庄中通を拠点に、軽鉄工事・ボード工事を中心とした内装工事を手がけています。代表者は${COMPANY.ceo}。兵庫・大阪・京都・滋賀を中心とした関西エリアに対応しています。`

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/company',
  keywords: ['株式会社EVOLVE', '尼崎 内装工事 会社', '兵庫 軽鉄工事 会社', '会社概要'],
})

/**
 * 会社概要。
 * ※ 資本金・設立年月日・従業員数・許可番号などは未提供のため掲載しない。
 */
const PROFILE: { label: string; value: React.ReactNode }[] = [
  { label: '会社名', value: SITE_NAME },
  { label: '代表者', value: COMPANY.ceo },
  { label: '所在地', value: COMPANY.address },
  {
    label: '電話番号',
    value: (
      <a
        href={`tel:${COMPANY.phoneHref}`}
        className="font-medium text-ink-900 underline decoration-mist-300 underline-offset-4 transition-colors hover:text-brand-700"
      >
        {COMPANY.phone}
      </a>
    ),
  },
  {
    label: 'メールアドレス',
    value: (
      <a
        href={`mailto:${COMPANY.email}`}
        className="break-all font-medium text-ink-900 underline decoration-mist-300 underline-offset-4 transition-colors hover:text-brand-700"
      >
        {COMPANY.email}
      </a>
    ),
  },
  { label: 'お問い合わせ受付時間', value: COMPANY.hours },
  {
    label: '事業内容',
    value: (
      <ul className="space-y-1.5">
        {SERVICES.map((s) => (
          <li key={s.slug}>{s.name}</li>
        ))}
      </ul>
    ),
  },
  { label: '対応エリア', value: '兵庫県、大阪府、京都府、滋賀県を中心とした関西エリア' },
]

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/company' })} />

      <Breadcrumb items={[{ label: '会社概要' }]} />

      <PageHero
        eyebrow="COMPANY"
        title="会社概要"
        lead="株式会社EVOLVEは、兵庫県尼崎市を拠点とする内装工事会社です。軽鉄・ボード工事を中心に、関西エリアの現場に対応しています。"
        image="banner-company.jpg"
        imageAlt="木目の仕上げ材が張られた大型天井の施工現場"
      />

      {/* 会社としての考え方（代表個人のメッセージではない。下のコメント参照） */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/*
              ★ ここを「代表メッセージ」にして代表者の氏名で署名してはいけない。
                この文章は代表者本人が書いたものではない。
                実在する個人の名前で、本人が言っていない言葉を公開することになる。

                そのため、会社としての考え方（一人称は「EVOLVE」「私たち」）として書き、
                個人の署名は入れていない。
                代表者本人の言葉を載せる場合は、本人に文章を確認・承認してもらってから
                署名を付けること。
            */}
            <Reveal>
              <SectionHeading
                eyebrow="OUR APPROACH"
                title={
                  <>
                    技術は、現場でしか
                    <br />
                    身につかない。
                  </>
                }
                as="h2"
              />

              <div className="prose-jp mt-8 space-y-6 text-[15px] text-ink-600">
                <p>
                  軽鉄とボードの工事は、終わってしまえば見えなくなります。壁の中、天井の裏。クロスや塗装で覆われて、誰の目にも触れません。
                </p>
                <p>
                  それでも、壁がまっすぐ立っているか、天井が水平に張られているか、継ぎ目に段差がないか。仕上がりの印象を決めているのは、この見えない部分です。だからEVOLVEは、隠れる工程にこそ手を抜かないことを基本にしています。
                </p>
                <p>
                  現場では、20代の若いスタッフが多く動いています。未経験から始めた人が技術を覚えていく環境をつくりながら、経験を積んだ方の技術は正当に評価する。その両方を大切にしています。
                </p>
                <p>
                  工事のご相談も、一緒に働きたいという方も、まずはご連絡ください。
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <Photo
                src="company.jpg"
                alt="株式会社EVOLVEの現場の様子"
                label="EVOLVEの現場"
                ratio="4 / 5"
                tone="light"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 会社情報テーブル */}
      <section className="border-y border-mist-200 bg-mist-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading eyebrow="PROFILE" title="会社情報" as="h2" />

          <dl className="mt-12 border-t border-mist-300">
            {PROFILE.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 border-b border-mist-200 py-5 sm:grid-cols-[200px_1fr] sm:gap-6 sm:py-6"
              >
                <dt className="text-[13px] font-medium text-ink-500 sm:pt-0.5">{row.label}</dt>
                <dd className="text-[15px] leading-[1.9] text-ink-800">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[12.5px] leading-relaxed text-ink-500">
            上記以外の会社情報については、お問い合わせください。
          </p>
        </div>
      </section>

      {/* アクセス */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="access-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading id="access-heading" eyebrow="ACCESS" title="所在地" as="h2" />

          {/* 地図（EVOLVE社のビジネスプロフィールと住所が一致することを確認済み） */}
          <GoogleMap className="mt-10" />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <address className="not-italic">
                <p className="text-lg font-bold text-ink-900">{SITE_NAME}</p>
                <p className="mt-3 text-[15px] leading-[1.9] text-ink-700">
                  〒{COMPANY.postalCode}　{COMPANY.address}
                </p>

                <dl className="mt-6 space-y-3 text-[14.5px]">
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-ink-500">電話</dt>
                    <dd>
                      <a
                        href={`tel:${COMPANY.phoneHref}`}
                        className="font-bold text-ink-900 hover:text-brand-700"
                      >
                        {COMPANY.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-ink-500">メール</dt>
                    <dd>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="break-all text-ink-800 underline decoration-mist-300 underline-offset-4 hover:text-brand-700"
                      >
                        {COMPANY.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-ink-500">受付時間</dt>
                    <dd className="text-ink-800">{COMPANY.hours}</dd>
                  </div>
                </dl>
              </address>

            </div>

            {/* 対応エリア */}
            <div>
              <h3 className="text-[11px] font-medium tracking-[0.22em] text-ink-500">
                対応エリア
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.95] text-ink-700">{AREA_SUMMARY}</p>

              <ul className="mt-6 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2">
                {AREAS.map((a) => (
                  <li key={a.name} className="bg-white p-5">
                    <p className="flex items-center gap-2.5 text-[15px] font-bold text-ink-900">
                      <span
                        className="h-1.5 w-3.5 skew-x-[-24deg] bg-brand-500"
                        aria-hidden="true"
                      />
                      {a.name}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-ink-600">{a.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
