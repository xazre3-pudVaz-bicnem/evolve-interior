import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JsonLd from '@/components/ui/JsonLd'
import { COMPANY, SITE_NAME } from '@/lib/constants'
import { pageMeta, webPageSchema } from '@/lib/seo'

const TITLE = '個人情報保護方針'
const DESCRIPTION =
  '株式会社EVOLVEの個人情報保護方針です。お問い合わせフォームおよび採用応募フォームでお預かりする個人情報の取り扱いについて説明しています。'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: '/privacy',
})

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: '1. 個人情報の取得について',
    body: (
      <p>
        {SITE_NAME}（以下「当社」）は、お問い合わせフォーム、採用応募フォーム、お電話、メールなどを通じて、お名前、会社名、電話番号、メールアドレス、住所、工事場所、年齢、経験、保有資格など、必要な範囲で個人情報を取得します。
      </p>
    ),
  },
  {
    title: '2. 利用目的',
    body: (
      <>
        <p>当社は、取得した個人情報を次の目的で利用します。</p>
        <ul className="mt-4 space-y-2">
          {[
            'お問い合わせへの回答、ご相談内容の確認、お見積もりのご案内',
            '工事の実施および工事に関するご連絡',
            '採用選考および採用に関するご連絡',
            '上記に関連する当社からのご連絡',
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span
                className="mt-2 h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                aria-hidden="true"
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '3. 第三者への提供',
    body: (
      <p>
        当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。ただし、工事の実施にあたり必要な範囲で、協力会社に情報を共有する場合があります。この場合も、目的の範囲を超えて利用することはありません。
      </p>
    ),
  },
  {
    title: '4. 安全管理',
    body: (
      <p>
        当社は、お預かりした個人情報の漏えい、滅失、毀損を防止するため、必要かつ適切な管理を行います。
      </p>
    ),
  },
  {
    title: '5. 開示・訂正・削除について',
    body: (
      <p>
        ご本人から、個人情報の開示、訂正、利用停止、削除のお申し出があった場合、ご本人であることを確認のうえ、法令に従い速やかに対応します。下記の連絡先までお問い合わせください。
      </p>
    ),
  },
  {
    title: '6. 採用応募情報の取り扱い',
    body: (
      <p>
        採用応募フォームからご記入いただいた情報は、採用選考の目的にのみ利用し、選考以外の目的で使用することはありません。
      </p>
    ),
  },
  {
    title: '7. 本方針の変更',
    body: (
      <p>
        当社は、必要に応じて本方針を変更することがあります。変更した場合は、本ページに掲載します。
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ title: TITLE, description: DESCRIPTION, path: '/privacy' })} />

      <Breadcrumb items={[{ label: '個人情報保護方針' }]} />

      <PageHero
        eyebrow="PRIVACY POLICY"
        title="個人情報保護方針"
        lead="お問い合わせフォームおよび採用応募フォームでお預かりする個人情報の取り扱いについて、以下のとおり定めます。"
      />

      <section className="py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="space-y-12">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-bold text-ink-900">{s.title}</h2>
                <div className="prose-jp mt-4 text-[14.5px] leading-[1.95] text-ink-600">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          {/* 連絡先 */}
          <div className="mt-16 border border-mist-200 bg-mist-50 p-7">
            <h2 className="text-lg font-bold text-ink-900">お問い合わせ窓口</h2>
            <dl className="mt-5 space-y-3 text-[14.5px]">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-24 shrink-0 text-ink-500">会社名</dt>
                <dd className="text-ink-800">{SITE_NAME}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-24 shrink-0 text-ink-500">所在地</dt>
                <dd className="text-ink-800">{COMPANY.address}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-24 shrink-0 text-ink-500">電話番号</dt>
                <dd>
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="font-medium text-ink-900 underline decoration-mist-300 underline-offset-4 hover:text-brand-700"
                  >
                    {COMPANY.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-24 shrink-0 text-ink-500">メール</dt>
                <dd>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="break-all font-medium text-ink-900 underline decoration-mist-300 underline-offset-4 hover:text-brand-700"
                  >
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <dt className="w-24 shrink-0 text-ink-500">受付時間</dt>
                <dd className="text-ink-800">{COMPANY.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
