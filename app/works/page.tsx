import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import ContactCta from '@/components/ui/ContactCta'
import InstagramBlock from '@/components/ui/InstagramBlock'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/ui/JsonLd'
import WorksGallery, { type ResolvedWork } from '@/components/works/WorksGallery'

import { WORKS, WORKS_PREPARING_MESSAGE, WORKS_DETAIL_NOTE } from '@/lib/works'
import { resolveImage } from '@/lib/media'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = '施工実績｜軽鉄・ボード・内装工事の事例'
const DESCRIPTION =
  '株式会社EVOLVEの施工実績。軽鉄工事、ボード工事、大工造作、内装仕上げの施工事例を掲載しています。兵庫・大阪・京都・滋賀を中心とした関西エリアで施工しています。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/works',
  keywords: ['施工実績', '軽鉄工事 事例', 'ボード工事 事例', '内装工事 実績', '尼崎 内装工事'],
})

export default function WorksPage() {
  // 写真の有無はビルド時に解決し、クライアント側には確定したパスだけを渡す
  const resolved: ResolvedWork[] = WORKS.map((w) => ({
    ...w,
    photos: {
      before: resolveImage(w.photos.before ? `works/${w.photos.before}` : null),
      during: resolveImage(w.photos.during ? `works/${w.photos.during}` : null),
      after: resolveImage(w.photos.after ? `works/${w.photos.after}` : null),
    },
  }))

  const isEmpty = resolved.length === 0

  return (
    <>
      <JsonLd data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/works' })} />

      <Breadcrumb items={[{ label: '施工実績' }]} />

      <PageHero
        eyebrow="WORKS"
        title="施工実績"
        lead="軽鉄・ボード工事を中心に、これまでに手がけた工事をご紹介します。"
        image="banner-works.jpg"
        imageAlt="大型施設の曲面造作と天井下地の施工現場"
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {isEmpty ? (
            /* 実績データが未登録のあいだは、架空の事例を作らず準備中を表示する */
            <div className="border border-mist-200 bg-mist-50 p-8 sm:p-14">
              <div className="mx-auto max-w-2xl text-center">
                <p
                  className="mx-auto h-2 w-10 skew-x-[-24deg] bg-brand-500"
                  aria-hidden="true"
                />
                <h2 className="heading-jp mt-8 text-xl font-bold text-ink-900 sm:text-2xl">
                  施工事例は準備中です
                </h2>
                <p className="mt-5 text-[15px] leading-[2] text-ink-600">
                  {WORKS_PREPARING_MESSAGE}
                </p>

                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href="/contact" variant="primary">
                    工事について問い合わせる
                  </Button>
                  <Button href="/services" variant="outline">
                    対応できる工事を見る
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* 施工場所・時期が未確認であることを明示する（推測で埋めない） */}
              <p className="mb-10 border-l-2 border-brand-500 bg-mist-50 p-5 text-[13.5px] leading-[1.9] text-ink-600">
                {WORKS_DETAIL_NOTE}
                <br />
                掲載していない工事も多数あります。詳しい施工内容や対応可否については、お問い合わせください。
              </p>

              <WorksGallery works={resolved} />
            </>
          )}
        </div>
      </section>

      {/* Instagram */}
      <section className="border-t border-mist-200 bg-mist-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="INSTAGRAM"
            title="現場の様子はInstagramで"
            lead="施工中の現場や、日々の仕事の様子を発信しています。"
            as="h2"
            align="center"
          />
          <InstagramBlock className="mt-12" tone="light" />
        </div>
      </section>

      <ContactCta />
    </>
  )
}
