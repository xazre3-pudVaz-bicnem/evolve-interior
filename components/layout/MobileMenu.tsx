'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV, INSTAGRAM_URL, COMPANY, INSTAGRAM_HANDLE } from '@/lib/constants'
import { SERVICES } from '@/lib/services'
import InstagramIcon from '@/components/ui/InstagramIcon'
import PhoneIcon from '@/components/ui/PhoneIcon'

const RECRUIT_LINKS = [
  { label: '採用トップ', href: '/recruit' },
  { label: '募集要項', href: '/recruit/requirements' },
  { label: '一日の流れ', href: '/recruit/day' },
  { label: '応募フォーム', href: '/recruit/apply' },
]

type Props = {
  /** dark: ヒーロー上の透過ヘッダー（ハンバーガーを白くする） */
  tone?: 'light' | 'dark'
}

export default function MobileMenu({ tone = 'light' }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [seenPath, setSeenPath] = useState(pathname)

  // ページ遷移でメニューを閉じる。
  // useEffect ではなくレンダー中に調整することで、余分な再レンダーを避ける
  // （Reactが推奨する「propsの変化に応じてstateを調整する」パターン）。
  // ブラウザの戻る／進むによる遷移にも対応できる。
  if (seenPath !== pathname) {
    setSeenPath(pathname)
    setOpen(false)
  }

  // 背面スクロールの固定 + Escapeで閉じる
  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
      >
        {/* メニューを開いている間は白背景のパネルが出るので、必ず濃色に戻す */}
        {(() => {
          const bar = open || tone === 'light' ? 'bg-ink-900' : 'bg-white'
          return (
            <>
              <span
                className={`block h-[2px] w-6 transition-all duration-200 ${bar} ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-6 transition-all duration-200 ${bar} ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-6 transition-all duration-200 ${bar} ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </>
          )
        })()}
      </button>

      {/*
        パネルは createPortal で <body> 直下に出す。
        ヘッダーには backdrop-blur が掛かっており、backdrop-filter は
        position:fixed の「包含ブロック」を作ってしまうため、
        パネルをヘッダー内に置くとヘッダー(高さ64px)を基準に配置され、
        高さが潰れて表示されなくなる。ポータルで body に逃がすことで回避する。
        open は初期値 false なので、SSR時に createPortal は呼ばれない。
      */}
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
          >
            <nav aria-label="モバイルメニュー" className="px-5 pb-32 pt-6">
            <ul className="divide-y divide-mist-200 border-y border-mist-200">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 text-base font-medium text-ink-900"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-mist-400">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* 工事の種類 */}
            <p className="mt-8 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-brand-700">
              <span className="eyebrow-bar" aria-hidden="true" />
              対応できる工事
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-px bg-mist-200">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex h-full items-center bg-white px-3 py-3.5 text-[13px] text-ink-700"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              {/* 工事は9件なので2列だと1マス余る。一覧への導線で埋める */}
              <li>
                <Link
                  href="/services"
                  className="flex h-full items-center justify-between gap-2 bg-white px-3 py-3.5 text-[13px] font-medium text-brand-700"
                >
                  一覧を見る
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>

            {/* 採用 */}
            <p className="mt-8 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-brand-700">
              <span className="eyebrow-bar" aria-hidden="true" />
              採用情報
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-px bg-mist-200">
              {RECRUIT_LINKS.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="flex h-full items-center bg-white px-3 py-3.5 text-[13px] text-ink-700"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 連絡先 */}
            <div className="mt-10 border border-mist-200 p-5">
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="flex items-center gap-3 text-xl font-bold text-ink-900"
              >
                <PhoneIcon className="h-5 w-5 text-brand-700" />
                {COMPANY.phone}
              </a>
              <p className="mt-1.5 text-xs text-ink-500">受付時間 {COMPANY.hours}</p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-3 block break-all text-sm text-ink-600 underline underline-offset-4"
              >
                {COMPANY.email}
              </a>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2.5 border border-mist-300 py-4 text-sm font-medium text-ink-900"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram {INSTAGRAM_HANDLE}
            </a>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
