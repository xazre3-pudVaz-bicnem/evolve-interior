'use client'

import { useEffect, useRef, useState } from 'react'
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
 * ※ 透過時の白文字の可読性は、ヘッダー自身のグラデーションだけでは足りない。
 *   ヒーロー側（components/home/Hero.tsx）にもヘッダー用のスクリムを敷いて、
 *   2枚重ねでコントラストを確保している。片方だけ外すと文字が写真に埋もれる。
 */
export default function HeaderShell({ logoLight, logoDark }: Props) {
  const pathname = usePathname()
  const isTop = pathname === '/'

  const [scrolled, setScrolled] = useState(false)
  const solid = !isTop || scrolled

  /**
   * 事業内容のサブメニュー。
   *
   * 以前はCSSだけ（group-hover / group-focus-within）で開閉していたが、
   * それだと Escape で閉じられず（WCAG 1.4.13）、
   * サブメニューが開いたことも支援技術に伝わらなかった（aria-expanded なし）。
   * そのため状態を持たせている。
   */
  const [subOpen, setSubOpen] = useState(false)
  const subRef = useRef<HTMLLIElement>(null)

  const closeSub = () => setSubOpen(false)

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

  // ページを移動したらサブメニューを閉じる
  const [seenPath, setSeenPath] = useState(pathname)
  if (seenPath !== pathname) {
    setSeenPath(pathname)
    setSubOpen(false)
  }

  // Escapeでサブメニューを閉じ、トリガーへフォーカスを戻す
  useEffect(() => {
    if (!subOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setSubOpen(false)
      subRef.current?.querySelector<HTMLElement>('button')?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [subOpen])

  const navText = solid
    ? 'text-ink-700 hover:text-brand-700'
    : 'text-white/90 hover:text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'border-b border-mist-200 bg-white/95 backdrop-blur-sm'
          : 'border-b border-transparent bg-gradient-to-b from-black/50 via-black/40 to-black/10'
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

                if (!isServices) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-4 py-3 text-[14px] font-medium transition-colors ${navText}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                }

                return (
                  <li
                    key={item.href}
                    ref={subRef}
                    className="relative"
                    // マウスのときだけホバーで開く。
                    // タッチでも onMouseEnter は発火するため、そのままだと
                    // 「開く→クリックでトグル→閉じる」となり、タップしても何も起きない。
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') setSubOpen(true)
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === 'mouse') closeSub()
                    }}
                    // フォーカスがこの項目の外へ出たら閉じる（Tabで抜けたとき）
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeSub()
                    }}
                  >
                    <span className="inline-flex items-center">
                      <Link
                        href={item.href}
                        onFocus={() => setSubOpen(true)}
                        className={`inline-flex items-center py-3 pl-4 text-[14px] font-medium transition-colors ${navText}`}
                      >
                        {item.label}
                      </Link>

                      {/* サブメニューの開閉。リンクとは別のボタンにして、
                          aria-expanded で開閉状態を伝える */}
                      <button
                        type="button"
                        onClick={() => setSubOpen((v) => !v)}
                        aria-expanded={subOpen}
                        aria-controls="services-submenu"
                        aria-label={`${item.label}のサブメニューを${subOpen ? '閉じる' : '開く'}`}
                        className={`py-3 pl-1.5 pr-4 text-[9px] transition-colors ${navText}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block opacity-60 transition-transform duration-200 ${
                            subOpen ? 'rotate-180' : ''
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                    </span>

                    <div
                      id="services-submenu"
                      hidden={!subOpen}
                      className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-2"
                    >
                      <div className="border border-mist-200 bg-white p-2 shadow-xl shadow-ink-900/10">
                        <ul className="grid grid-cols-2 gap-px bg-mist-100">
                          {SERVICES.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                onClick={closeSub}
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
                          onClick={closeSub}
                          className="mt-2 flex items-center justify-center gap-2 bg-mist-50 py-3 text-[13px] font-medium text-ink-900 transition-colors hover:bg-mist-100"
                        >
                          事業内容の一覧を見る
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
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
              {/* 小さい文字なので 4.5:1 が必要。white/70 だと写真の上で 3.9:1 しか出ない */}
              <span
                className={`block text-[10px] leading-tight ${
                  solid ? 'text-ink-500' : 'text-white/90'
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
