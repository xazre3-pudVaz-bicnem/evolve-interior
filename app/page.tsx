import Link from 'next/link'
import type { Metadata } from 'next'

import Hero from '@/components/home/Hero'
import Photo from '@/components/ui/Photo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import Marquee from '@/components/ui/Marquee'
import SectionHeading from '@/components/ui/SectionHeading'
import ProcessSteps from '@/components/ui/ProcessSteps'
import ContactCta from '@/components/ui/ContactCta'
import InstagramBlock from '@/components/ui/InstagramBlock'
import JsonLd from '@/components/ui/JsonLd'

import { KEY_POINTS, AREAS, AREA_SUMMARY, SITE_URL } from '@/lib/constants'
import { SERVICES, ESTIMATE_STEPS, ESTIMATE_NOTE, ESTIMATE_NOTE_SUB } from '@/lib/services'
import { WORKS, WORKS_PREPARING_MESSAGE } from '@/lib/works'
import { webPageSchema } from '@/lib/seo'

const TITLE = '株式会社EVOLVE｜尼崎の軽鉄・ボード・内装工事'
const DESCRIPTION =
  '株式会社EVOLVEは兵庫県尼崎市を拠点に、軽鉄工事、ボード工事、大工造作工事、クロス、塗装などの内装工事に対応しています。兵庫・大阪・京都・滋賀を中心とした関西エリアの工事相談と採用応募を受け付けています。'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    locale: 'ja_JP',
  },
}

/** 強み（3つ）— 根拠のない優位性は書かない */
const STRENGTHS = [
  {
    title: '軽鉄・ボード工事への専門性',
    body: '軽量鉄骨下地とボード工事を中心に、建物の壁や天井を形づくる内装工事に対応しています。下地は仕上げ材で隠れて見えなくなりますが、壁のまっすぐさや天井の水平は、この工程でほぼ決まります。EVOLVEは、その見えない部分を主戦場としています。',
    image: 'strength-lgs.jpg',
    alt: 'ドーム状の天井に組まれた軽量鉄骨の下地',
  },
  {
    title: '大工造作から仕上げ工事まで対応',
    body: '軽鉄・ボードだけでなく、大工造作、クロス、塗装、サイディングまでご相談いただけます。下地から仕上げまでを一連の流れとして把握できるため、工程のつなぎ目で起きがちな手戻りを減らせます。工事の内容によっては、協力会社と連携して対応します。',
    image: 'strength-finishing.jpg',
    alt: '木で仕上げられた円形天井と、同心円状の間接照明',
  },
  {
    title: '若いスタッフと経験者が力を発揮できる体制',
    body: '20代の若いスタッフが多く活躍しています。未経験から技術を身につけていく人がいて、その隣に経験を積んだ職人がいる。教える側と学ぶ側が同じ現場にいることが、EVOLVEの日常です。経験者の方には、これまでの技術を活かしていただける環境があります。',
    image: 'strength-team.jpg',
    alt: '天井材を施工する株式会社EVOLVEのスタッフ',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/' })} />

      {/* ───────────── 1. ヒーロー ───────────── */}
      <Hero />

      {/* ヒーロー直下の要点（モバイル用） */}
      <div className="border-b border-mist-200 bg-mist-50 lg:hidden">
        <div className="mx-auto max-w-7xl px-5">
          <ul className="grid gap-px bg-mist-200 sm:grid-cols-2">
            {KEY_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 bg-mist-50 py-4 pr-4">
                <span
                  className="h-1.5 w-4 shrink-0 skew-x-[-24deg] bg-brand-500"
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium leading-snug text-ink-800">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ───────────── 2. EVOLVEについて ───────────── */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="about-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal anim="clip">
              <Photo
                src="about.jpg"
                alt="円形の天井に組まれた、同心円状の軽量鉄骨下地"
                label="現場の様子"
                ratio="3 / 4"
                tone="light"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>

            <Reveal delay={100} className="lg:pt-8">
              <SectionHeading
                eyebrow="ABOUT"
                title={
                  <>
                    見えなくなる部分を、
                    <br />
                    いちばん丁寧に。
                  </>
                }
                as="h2"
              />

              <div className="prose-jp mt-8 space-y-6 text-[15px] text-ink-600">
                <p>
                  株式会社EVOLVEは、兵庫県尼崎市を拠点とする内装工事会社です。軽量鉄骨下地（軽鉄）とボード工事を専門とし、建物の内側を形づくる工事を手がけています。
                </p>
                <p>
                  軽鉄とボードは、工事が終わればクロスや塗装の下に隠れてしまいます。お客様の目に触れることは、ほとんどありません。それでも、壁がまっすぐか、天井が水平か、継ぎ目に段差がないか——仕上がりの印象を決めているのは、この隠れた部分です。
                </p>
                <p>
                  下地に加えて、大工造作から内装仕上げまで幅広くご相談いただけます。法人・工務店からのご依頼はもちろん、一般のお客様からの小規模な工事のご相談も承っています。
                </p>
              </div>

              <div className="mt-10">
                <Button href="/company" variant="outline">
                  会社概要を見る
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 3. 対応できる工事 ───────────── */}
      <section className="bg-mist-50 py-20 sm:py-24 lg:py-30" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="SERVICES"
            title="対応できる工事"
            lead="軽鉄・ボード工事を中心に、内装に関わる工事を幅広く承っています。工事の名前が分からない場合でも、やりたいことをお聞かせいただければご案内します。"
            as="h2"
          />

          {/* 罫線で区切る一覧（角丸カードを並べない） */}
          <ul className="mt-14 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col bg-white p-7 transition-colors hover:bg-brand-50 sm:p-8"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-brand-700">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="h-1 w-3 skew-x-[-24deg] bg-brand-500 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-ink-900">{s.name}</h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-[1.9] text-ink-600">
                    {s.short}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-brand-700">
                    詳しく見る
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 工事名の流れる帯 */}
      <Marquee />

      {/* ───────────── 4. EVOLVEの強み ───────────── */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="strength-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="STRENGTH" title="EVOLVEの強み" as="h2" />

          <div className="mt-16 space-y-20 lg:space-y-24">
            {STRENGTHS.map((s, i) => (
              <div
                key={s.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Reveal anim={i % 2 === 1 ? 'right' : 'left'}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold text-mist-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-mist-200" aria-hidden="true" />
                  </div>

                  <h3 className="heading-jp mt-6 text-xl font-bold text-ink-900 sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-[2] text-ink-600">{s.body}</p>
                </Reveal>

                <Reveal anim="clip" delay={100} className="zoom-parent">
                  <Photo
                    src={s.image}
                    alt={s.alt}
                    label={s.alt}
                    ratio="4 / 3"
                    tone="light"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 5・6. 一般のお客様 / 法人のお客様 ───────────── */}
      <section aria-labelledby="audience-heading" className="border-y border-mist-200">
        <h2 id="audience-heading" className="sr-only">
          ご相談いただける方
        </h2>

        <div className="grid lg:grid-cols-2">
          {/* 一般のお客様向け（白） */}
          <div className="relative bg-white">
            <div className="zoom-parent overflow-hidden">
              <Photo
                src="customer.jpg"
                alt="軽量鉄骨の下地に石膏ボードを取り付ける様子"
                label="内装工事の様子"
                ratio="16 / 9"
                tone="light"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <div className="mx-auto max-w-lg lg:ml-auto lg:mr-0">
                <Reveal>
                  <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-700">
                    <span className="eyebrow-bar" aria-hidden="true" />
                    FOR INDIVIDUALS
                  </p>
                  <h3 className="heading-jp mt-4 text-2xl font-bold text-ink-900 sm:text-[1.75rem]">
                    一般のお客様へ
                  </h3>

                  <p className="mt-6 text-[15px] leading-[2] text-ink-600">
                    「軽鉄」「ボード」と言われても、何のことか分からない。それが普通だと思います。
                  </p>
                  <p className="mt-4 text-[15px] leading-[2] text-ink-600">
                    壁を一枚つくりたい。部屋を仕切りたい。キッチンの壁を張り替えたい。クロスが剥がれてきた。そうした「やりたいこと」をそのままお聞かせください。どの工事にあたるのかは、こちらでご説明します。
                  </p>

                  <ul className="mt-8 space-y-3">
                    {[
                      '工事の名前が分からなくても相談できます',
                      '写真を送っていただくだけでも構いません',
                      '小規模な工事や、部分的な補修も承ります',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <span
                          className="mt-2 h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                          aria-hidden="true"
                        />
                        <span className="text-[14px] leading-relaxed text-ink-700">{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Button href="/contact" variant="outline">
                      相談してみる
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* 法人・建設会社・工務店向け（濃色） */}
          <div className="relative bg-ink-900">
            <div className="zoom-parent overflow-hidden">
              <Photo
                src="corporate.jpg"
                alt="オフィスの内装で軽量鉄骨の下地とボードを施工する様子"
                label="法人向け内装工事"
                ratio="16 / 9"
                tone="dark"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <div className="mx-auto max-w-lg lg:ml-0 lg:mr-auto">
                <Reveal>
                  <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-300">
                    <span className="eyebrow-bar" aria-hidden="true" />
                    FOR BUSINESS
                  </p>
                  <h3 className="heading-jp mt-4 text-2xl font-bold text-white sm:text-[1.75rem]">
                    建設会社・工務店の皆様へ
                  </h3>

                  <p className="mt-6 text-[15px] leading-[2] text-mist-300">
                    軽鉄・ボード工事を主軸とする専門会社として、建設会社・工務店・内装工事会社からのご依頼を承っています。
                  </p>
                  <p className="mt-4 text-[15px] leading-[2] text-mist-300">
                    図面と工程をお送りいただければ、内容を確認のうえご相談に応じます。下地のみのご依頼も、仕上げまで含めたご依頼も可能です。
                  </p>

                  <ul className="mt-8 space-y-3">
                    {[
                      '軽鉄のみ・ボードのみといった工程単位の依頼にも対応',
                      '兵庫・大阪・京都・滋賀を中心とした関西エリアで施工',
                      '図面・工程表をもとにしたご相談が可能',
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <span
                          className="mt-2 h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-400"
                          aria-hidden="true"
                        />
                        <span className="text-[14px] leading-relaxed text-mist-200">{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Button href="/contact" variant="outlineLight">
                      工事の相談をする
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 7. 施工実績 ───────────── */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="works-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="WORKS"
            title="施工実績"
            lead="軽鉄・ボード工事を中心に、これまでに手がけた工事をご紹介します。"
            as="h2"
          />

          {WORKS.length === 0 ? (
            <Reveal className="mt-12">
              <div className="border border-mist-200 bg-mist-50 p-8 sm:p-12">
                <p className="text-[15px] leading-[2] text-ink-700">
                  {WORKS_PREPARING_MESSAGE}
                </p>
                <div className="mt-8">
                  <Button href="/works" variant="outline">
                    施工実績ページへ
                  </Button>
                </div>
              </div>
            </Reveal>
          ) : (
            <>
              <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {WORKS.slice(0, 3).map((w, i) => (
                  <Reveal as="li" key={w.id} delay={i * 80} className="zoom-parent">
                    <Link href="/works" className="group block">
                      <Photo
                        src={`works/${w.photos.after ?? w.photos.during ?? ''}`}
                        alt={w.title}
                        label={w.title}
                        ratio="4 / 3"
                        tone="light"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="mt-4 flex items-center gap-2">
                        <span
                          className="h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                          aria-hidden="true"
                        />
                        <span className="text-[11px] tracking-wider text-ink-500">{w.type}</span>
                      </div>
                      <h3 className="mt-2 text-[15px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                        {w.title}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-12">
                <Button href="/works" variant="outline">
                  施工実績をすべて見る
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ───────────── 8. ご相談から見積もりまでの流れ ───────────── */}
      <section className="bg-mist-50 py-20 sm:py-24 lg:py-30" aria-labelledby="flow-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="FLOW"
                title={
                  <>
                    ご相談から
                    <br />
                    見積もりまで
                  </>
                }
                as="h2"
              />

              <div className="mt-8 border-l-2 border-brand-500 pl-5">
                <p className="text-[14px] leading-[1.95] text-ink-700">{ESTIMATE_NOTE}</p>
              </div>
              <p className="mt-5 text-[13px] leading-[1.9] text-ink-500">{ESTIMATE_NOTE_SUB}</p>
            </div>

            <ProcessSteps steps={ESTIMATE_STEPS} />
          </div>
        </div>
      </section>

      {/* ───────────── 9. 対応エリア ───────────── */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="area-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="AREA" title="対応エリア" lead={AREA_SUMMARY} as="h2" />

          <ul className="mt-14 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((area, i) => (
              <Reveal as="li" key={area.name} delay={i * 70}>
                <div className="flex h-full flex-col bg-white p-8">
                  <div className="flex items-baseline gap-3">
                    <span className="h-1.5 w-4 skew-x-[-24deg] bg-brand-500" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-ink-900">{area.name}</h3>
                  </div>
                  <p className="mt-4 text-[13.5px] leading-[1.9] text-ink-600">{area.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 text-[13.5px] leading-[1.9] text-ink-500">
            上記エリア以外の工事についても、内容によってはご相談を承ります。まずはお問い合わせください。
          </p>
        </div>
      </section>

      {/* ───────────── 10. 採用情報 ───────────── */}
      <section className="relative overflow-hidden bg-ink-900" aria-labelledby="recruit-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <Reveal anim="left">
              <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-300">
                <span className="eyebrow-bar" aria-hidden="true" />
                RECRUIT
              </p>

              <h2
                id="recruit-heading"
                className="heading-jp mt-5 text-[1.9rem] font-bold leading-[1.3] text-white sm:text-4xl"
              >
                内装の仕事を、
                <br />
                一生ものの技術に。
              </h2>

              <p className="mt-7 max-w-xl text-[15px] leading-[2] text-mist-300">
                未経験から軽鉄・ボード工事の技術を身につけたい方も、これまでの経験を活かしたい方も歓迎します。10代後半から20代の若手スタッフを中心に、幅広い年代の方からの応募をお待ちしています。
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/recruit" variant="primary">
                  採用情報を見る
                </Button>
                <Button href="/recruit/requirements" variant="outlineLight">
                  募集要項
                </Button>
              </div>
            </Reveal>

            <Reveal anim="right" delay={100}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="zoom-parent mt-8 overflow-hidden">
                  <Photo
                    src="recruit-staff-1.jpg"
                    alt="天井材を施工する株式会社EVOLVEのスタッフ"
                    label="スタッフ"
                    ratio="3 / 4"
                    tone="dark"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
                <div className="zoom-parent overflow-hidden">
                  <Photo
                    src="recruit-site.jpg"
                    alt="曲面の天井下地を組む施工現場"
                    label="現場"
                    ratio="3 / 4"
                    tone="dark"
                    sizes="(max-width: 1024px) 45vw, 25vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 11. Instagram ───────────── */}
      <section className="py-20 sm:py-24 lg:py-30" aria-labelledby="instagram-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="INSTAGRAM"
            title="施工の様子を発信しています"
            lead="日々の現場や施工の様子は、Instagramでご覧いただけます。"
            as="h2"
            align="center"
          />
          <InstagramBlock className="mt-12" tone="light" />
        </div>
      </section>

      {/* ───────────── 12. お問い合わせ ───────────── */}
      <ContactCta />
    </>
  )
}
