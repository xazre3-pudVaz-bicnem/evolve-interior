import type { Metadata } from 'next'
import { Noto_Sans_JP, Playfair_Display } from 'next/font/google'
import './globals.css'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileCTABar from '@/components/layout/MobileCTABar'
import Loader from '@/components/layout/Loader'
import JsonLd from '@/components/ui/JsonLd'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import { localBusinessSchema, organizationSchema, websiteSchema } from '@/lib/seo'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

/** ロゴのワードマークに近い高コントラストのセリフ体 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '株式会社EVOLVE｜尼崎の軽鉄・ボード・内装工事',
    template: `%s｜${SITE_NAME}`,
  },
  description:
    '株式会社EVOLVEは兵庫県尼崎市を拠点に、軽鉄工事、ボード工事、大工造作工事、クロス、塗装などの内装工事に対応しています。兵庫・大阪・京都・滋賀を中心とした関西エリアの工事相談と採用応募を受け付けています。',
  keywords: [
    '尼崎 軽鉄工事',
    '尼崎 ボード工事',
    '尼崎 内装工事',
    '兵庫 軽鉄工事',
    '兵庫 ボード工事',
    '大阪 軽鉄工事',
    '大阪 ボード工事',
    '関西 軽鉄工事',
    '関西 ボード工事',
    '軽量鉄骨 下地工事',
    '内装下地工事',
    '大工造作工事',
    '店舗 内装下地',
    'オフィス 内装工事',
    '工務店 軽鉄業者',
    '建設会社 ボード工事業者',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: SITE_NAME,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-white pb-16 font-sans text-ink-800 antialiased lg:pb-0">
        {/*
          描画前に同期実行させるため body の先頭に置く（ちらつき防止）。

          .js      … JSが有効。スクロール演出（.reveal）の初期状態 opacity:0 は
                     このクラスが付いているときだけ効く。JS無効でも本文が必ず見えるようにするため。
          .loading … ローディング画面を出す。初回訪問時のみ付ける。
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{if(!sessionStorage.getItem('evolve-visited'))document.documentElement.classList.add('loading')}catch(e){document.documentElement.classList.add('loading')}`,
          }}
        />

        <Loader />

        <JsonLd data={[organizationSchema, localBusinessSchema, websiteSchema]} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          本文へスキップ
        </a>

        <Header />

        {/*
          ヘッダーは position:fixed のため、本文にヘッダー分の余白を確保する。
          トップページのヒーローだけは負のマージンでこの余白を打ち消し、
          写真をヘッダーの下まで敷き込む（全画面ヒーロー）。
        */}
        <main id="main" className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>

        <Footer />
        <MobileCTABar />
      </body>
    </html>
  )
}
