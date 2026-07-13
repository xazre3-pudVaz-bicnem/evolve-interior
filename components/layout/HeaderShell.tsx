'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import InstagramIcon from '@/components/ui/InstagramIcon'
import MobileMenu from './MobileMenu'
import { NAV, INSTAGRAM_URL, COMPANY } from '@/lib/constants'
import { SERVICES } from '@/lib/services'

type Props = {
  /** 白背景用のロゴ（サーバー側で描画して渡す） */
  logoLight: React.ReactNode
  /** 濃色背景用の白抜きロゴ */
  logoDark: React.ReactNode
}

/**
 * ヘッダーの外側。
 *
 * トップページでは、最上部にいるあいだヘッダーを透過させて
 * ヒーロー写真の上に重ねる。スクロールすると白背景に切り替わる。
 *
 * ※ 透過時は上から黒のグラデーションを敷いているため、
 *   写真の明るさに関わらず白文字の可読性が保たれる。
 */
export default function HeaderShell({ logoLight, logoDark }: Props) {
  const pathname = usePathname()
  const isTop = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const solid = !isTop || scrolled

  useEffect(() => {
    if (!isTop) return

    const onScroll = () => setScrolled(window.scrollY > 40)

    window.addEventListener('scroll', onScroll, { passive: true })
    // リロードで途中から復元された場合にも対応する（effect本体ではなく次フレームで反映）
    const raf = requestAnimationFrame(onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [isTop])

  const navText = solid
    ? 'text-ink-700 hover:text-brand-700'
    : 'text-white/90 hover:text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'border-b border-mist-200 bg-white/95 backdrop-blur-sm'
          : 'border-b border-transparent bg-gradient-to-b from-black/65 via-black/25 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" aria-label="株式会社EVOLVE トップページ" className="shrink-0">
            {isTop ? (
              // トップページは2種類を重ねてクロスフェードさせる
              <span className="grid">
                <span
                  className="col-start-1 row-start-1 transition-opacity duration-300"
                  style={{ opacity: solid ? 1 : 0 }}
                >
                  {logoLight}
                </span>
                <span
                  className="col-start-1 row-start-1 transition-opacity duration-300"
                  style={{ opacity: solid ? 0 : 1 }}
                  aria-hidden={solid}
                >
                  {logoDark}
                </span>
              </span>
            ) : (
              logoLight
            )}
          </Link>

          {/* デスクトップナビ */}
          <nav aria-label="メインナビゲーション" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.filter((n) => n.href !== '/contact').map((item) => {
                const isServices = item.href === '/services'

                return (
                  <li key={item.href} className={isServices ? 'group relative' : ''}>
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1.5 px-4 py-3 text-[14px] font-medium transition-colors ${navText}`}
                    >
                      {item.label}
                      {isServices && (
                        <span
                          aria-hidden="true"
                          className="text-[9px] opacity-60 transition-transform duration-200 group-hover:rotate-180"
                        >
                          ▼
                        </span>
                      )}
                    </Link>

                    {/* 事業内容のドロップダウン（CSSのみ／キーボード対応） */}
                    {isServices && (
                      <div className="invisible absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <div className="border border-mist-200 bg-white p-2 shadow-xl shadow-ink-900/10">
                          <ul className="grid grid-cols-2 gap-px bg-mist-100">
                            {SERVICES.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  className="flex h-full flex-col gap-1 bg-white p-3.5 transition-colors hover:bg-brand-50"
                                >
                                  <span className="text-[13.5px] font-medium text-ink-900">
                                    {s.name}
                                  </span>
                                  <span className="line-clamp-1 text-[11.5px] text-ink-500">
                                    {s.short}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/services"
                            className="mt-2 flex items-center justify-center gap-2 bg-mist-50 py-3 text-[13px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
                          >
                            事業内容の一覧を見る
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* デスクトップ右側 */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EVOLVEのInstagramを開く（新しいタブ）"
              className={`flex h-11 w-11 items-center justify-center border transition-colors ${
                solid
                  ? 'border-mist-200 text-ink-700 hover:border-ink-900 hover:text-ink-900'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>

            <div className="hidden xl:block">
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className={`block text-[15px] font-bold leading-tight transition-colors ${
                  solid ? 'text-ink-900 hover:text-brand-700' : 'text-white'
                }`}
              >
                {COMPANY.phone}
              </a>
              <span
                className={`block text-[10px] leading-tight ${
                  solid ? 'text-ink-500' : 'text-white/70'
                }`}
              >
                受付 {COMPANY.hours}
              </span>
            </div>

            <Link
              href="/contact"
              className="bg-brand-700 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-800"
            >
              お問い合わせ
            </Link>
          </div>

          <MobileMenu tone={solid ? 'light' : 'dark'} />
        </div>
      </div>
    </header>
  )
}
