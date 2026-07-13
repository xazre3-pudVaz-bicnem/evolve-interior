import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Photo from '@/components/ui/Photo'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ProcessSteps from '@/components/ui/ProcessSteps'
import FaqList from '@/components/ui/FaqList'
import ContactCta from '@/components/ui/ContactCta'
import JsonLd from '@/components/ui/JsonLd'

import { SERVICES, getService, type ServiceExtra } from '@/lib/services'
import { pageMeta, faqSchema, serviceSchema, webPageSchema } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  })
}

/** 工事ごとに構造の異なる固有ブロック */
function ExtraBlock({ extra }: { extra: ServiceExtra }) {
  if (extra.kind === 'terms') {
    return (
      <div>
        <h2 className="heading-jp text-xl font-bold text-ink-900 sm:text-2xl">
          {extra.title}
        </h2>
        {extra.lead && (
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.95] text-ink-600">
            {extra.lead}
          </p>
        )}

        <dl className="mt-8 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2">
          {extra.items.map((item) => (
            <div key={item.term} className="bg-white p-6">
              <dt className="flex items-center gap-3 text-[15px] font-bold text-ink-900">
                <span
                  className="h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                  aria-hidden="true"
                />
                {item.term}
              </dt>
              <dd className="mt-3 text-[13.5px] leading-[1.9] text-ink-600">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }

  if (extra.kind === 'compare') {
    return (
      <div>
        <h2 className="heading-jp text-xl font-bold text-ink-900 sm:text-2xl">
          {extra.title}
        </h2>
        {extra.lead && (
          <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.95] text-ink-600">
            {extra.lead}
          </p>
        )}

        {/* 横スクロールはこのブロックの中だけで完結させる（ページ全体を横に広げない） */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="w-32 border-b-2 border-mist-300 pb-4 pr-4" />
                <th
                  scope="col"
                  className="border-b-2 border-mist-300 px-4 pb-4 text-[14px] font-bold text-ink-700"
                >
                  {extra.head[0]}
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-brand-500 px-4 pb-4 text-[14px] font-bold text-brand-800"
                >
                  {extra.head[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {extra.rows.map((row) => (
                <tr key={row.label} className="border-b border-mist-200">
                  <th
                    scope="row"
                    className="py-5 pr-4 align-top text-[13px] font-medium text-ink-500"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-5 align-top text-[13.5px] leading-[1.9] text-ink-600">
                    {row.a}
                  </td>
                  <td className="bg-brand-50/60 px-4 py-5 align-top text-[13.5px] leading-[1.9] text-ink-800">
                    {row.b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // flowNote
  return (
    <div>
      <h2 className="heading-jp text-xl font-bold text-ink-900 sm:text-2xl">{extra.title}</h2>
      {extra.lead && (
        <p className="mt-4 max-w-2xl text-[14.5px] leading-[1.95] text-ink-600">{extra.lead}</p>
      )}

      <ul className="mt-8 space-y-4 border-l-2 border-brand-500 pl-6">
        {extra.body.map((line) => (
          <li key={line} className="text-[14.5px] leading-[1.95] text-ink-700">
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const index = SERVICES.findIndex((s) => s.slug === slug)
  const others = SERVICES.filter((s) => s.slug !== slug)

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: service.metaTitle,
            description: service.metaDescription,
            path: `/services/${service.slug}`,
          }),
          serviceSchema({
            name: service.name,
            description: service.plain,
            slug: service.slug,
          }),
          faqSchema(service.faqs),
        ]}
      />

      <Breadcrumb
        items={[{ label: '事業内容', href: '/services' }, { label: service.name }]}
      />

      <PageHero
        eyebrow={`${String(index + 1).padStart(2, '0')} / ${service.nameEn.toUpperCase()}`}
        title={service.name}
        lead={service.lead}
        image={service.image}
        imageAlt={service.imageAlt}
      />

      {/* 工事内容 */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="ABOUT" title="どのような工事ですか" as="h2" />

              {/* 一般の方向けの説明を最初に、目立たせて置く */}
              <div className="mt-8 border-l-2 border-brand-500 bg-mist-50 p-6 sm:p-7">
                <p className="text-[15px] font-medium leading-[1.95] text-ink-800">
                  {service.plain}
                </p>
              </div>

              <div className="prose-jp mt-8 space-y-6 text-[15px] text-ink-600">
                {service.detail.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:pt-4">
              <Photo
                src={service.image}
                alt={service.imageAlt}
                label={`${service.name}の現場`}
                ratio="4 / 5"
                tone="light"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 施工場所 / 依頼対象 */}
      <section className="border-y border-mist-200 bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="heading-jp text-xl font-bold text-ink-900">主な施工場所</h2>
              <ul className="mt-6 space-y-px bg-mist-200">
                {service.places.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 bg-mist-50 py-3.5 text-[14.5px] text-ink-700"
                  >
                    <span
                      className="mt-2 h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="heading-jp text-xl font-bold text-ink-900">
                ご依頼いただける方
              </h2>
              <ul className="mt-6 space-y-px bg-mist-200">
                {service.clients.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 bg-mist-50 py-3.5 text-[14.5px] text-ink-700"
                  >
                    <span
                      className="mt-2 h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-ink-400"
                      aria-hidden="true"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 工事ごとの固有ブロック */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <ExtraBlock extra={service.extra} />
          </Reveal>
        </div>
      </section>

      {/* 施工の流れ */}
      <section className="bg-mist-50 py-16 sm:py-20 lg:py-24" aria-labelledby="steps-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                id="steps-heading"
                eyebrow="PROCESS"
                title={
                  <>
                    {service.name}の
                    <br className="hidden sm:block" />
                    施工の流れ
                  </>
                }
                as="h2"
              />
              <p className="mt-6 text-[13.5px] leading-[1.9] text-ink-500">
                現場の状況や工事の内容によって、工程が前後する場合があります。
              </p>
            </div>

            <ProcessSteps steps={service.steps} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title={`${service.name}のよくあるご質問`}
            as="h2"
            align="center"
          />
          <FaqList faqs={service.faqs} className="mt-12" />
        </div>
      </section>

      {/* 他の工事 */}
      <section className="border-t border-mist-200 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-[11px] font-medium tracking-[0.22em] text-ink-500">
            他の工事も見る
          </h2>

          <ul className="mt-6 grid gap-px border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full items-center justify-between gap-3 bg-white p-5 transition-colors hover:bg-brand-50"
                >
                  <span className="text-[14px] font-medium text-ink-900">{o.name}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-ink-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-700"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
