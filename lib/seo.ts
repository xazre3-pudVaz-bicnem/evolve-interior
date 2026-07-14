import type { Metadata } from 'next'
import {
  SITE_URL,
  SITE_NAME,
  COMPANY,
  INSTAGRAM_URL,
  LINE_URL,
  GOOGLE_MAP_SEARCH_URL,
} from './constants'
import { SERVICES } from './services'
import type { Faq } from './faqs'

type PageMetaArgs = {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
}

/**
 * 各ページの metadata を生成する。
 *
 * ※ openGraph.images を明示的に指定している理由
 *   app/opengraph-image.tsx（ファイル規約）で生成される画像は、
 *   そのセグメント（＝トップページ）にしか適用されず、下層ページには継承されない。
 *   指定を省くと下層ページの og:image が欠落するため、
 *   生成済みの /opengraph-image を全ページで明示的に参照する。
 */
const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}｜尼崎の軽鉄・ボード・内装工事`,
}

export function pageMeta({
  title,
  description,
  path,
  keywords,
  noIndex,
}: PageMetaArgs): Metadata {
  const url = `${SITE_URL}${path}`
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: `${title}｜${SITE_NAME}`,
      description,
      url,
      type: 'website',
      locale: 'ja_JP',
      siteName: SITE_NAME,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  addressRegion: COMPANY.addressRegion,
  addressLocality: COMPANY.addressLocality,
  streetAddress: COMPANY.streetAddress,
  addressCountry: COMPANY.addressCountry,
} as const

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: '兵庫県' },
  { '@type': 'AdministrativeArea', name: '大阪府' },
  { '@type': 'AdministrativeArea', name: '京都府' },
  { '@type': 'AdministrativeArea', name: '滋賀県' },
  { '@type': 'City', name: '尼崎市' },
] as const

/** Organization */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.svg`,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: POSTAL_ADDRESS,
  // ※ founder（創業者）は使わない。提供されているのは「代表者」であって、
  //   その人物が創業者かどうかは確認できていない（推測で断定しない）。
  employee: [{ '@type': 'Person', name: COMPANY.ceo, jobTitle: COMPANY.ceoRole }],
  sameAs: [INSTAGRAM_URL, LINE_URL],
}

/**
 * HomeAndConstructionBusiness（LocalBusiness のサブタイプ）。
 *
 * ※ geo（緯度経度）は未確認のため含めない。
 * ※ openingHoursSpecification は営業曜日が未提供のため含めない。
 *    「問い合わせ受付時間 08:30〜18:30」はサイト本文にのみ記載する。
 */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  image: `${SITE_URL}/opengraph-image`,
  description:
    '株式会社EVOLVEは兵庫県尼崎市を拠点とする内装工事会社です。軽鉄工事・ボード工事を中心に、化粧ケイカル、キッチンパネル、システム天井、大工造作、クロス、塗装、サイディングまで対応しています。',
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED,
  hasMap: GOOGLE_MAP_SEARCH_URL,
  sameAs: [INSTAGRAM_URL, LINE_URL],
  knowsAbout: [
    '軽鉄工事',
    '軽量鉄骨下地',
    'ボード工事',
    '化粧ケイカル工事',
    'キッチンパネル工事',
    'システム天井工事',
    '大工造作工事',
    'クロス工事',
    '塗装工事',
    'サイディング工事',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '対応できる工事',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    })),
  },
}

/** WebSite */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'ja',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

/** WebPage（各ページ） */
export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  const url = `${SITE_URL}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'ja',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  }
}

/** Service（各サービス詳細ページ） */
export function serviceSchema({
  name,
  description,
  slug,
}: {
  name: string
  description: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${slug}#service`,
    name,
    description,
    serviceType: name,
    url: `${SITE_URL}/services/${slug}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: AREA_SERVED,
  }
}

/** FAQPage */
export function faqSchema(faqs: readonly Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
