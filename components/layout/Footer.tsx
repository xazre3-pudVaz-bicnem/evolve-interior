import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import InstagramIcon from '@/components/ui/InstagramIcon'
import PhoneIcon from '@/components/ui/PhoneIcon'
import {
  COMPANY,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  SITE_NAME,
} from '@/lib/constants'
import { SERVICES } from '@/lib/services'

const SITE_LINKS = [
  { label: '事業内容', href: '/services' },
  { label: '施工実績', href: '/works' },
  { label: '会社概要', href: '/company' },
  { label: 'お問い合わせ', href: '/contact' },
]

const RECRUIT_LINKS = [
  { label: '採用情報', href: '/recruit' },
  { label: '募集要項', href: '/recruit/requirements' },
  { label: '一日の流れ', href: '/recruit/day' },
  { label: '応募フォーム', href: '/recruit/apply' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-mist-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* 会社情報 */}
          <div>
            <Logo gradientId="evolve-mark-footer" />

            <address className="mt-6 not-italic">
              <p className="text-sm font-medium text-ink-900">{SITE_NAME}</p>
              <p className="mt-2 text-sm leading-[1.9] text-ink-600">{COMPANY.address}</p>

              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="mt-4 inline-flex items-center gap-2.5 text-xl font-bold text-ink-900 transition-colors hover:text-brand-700"
              >
                <PhoneIcon className="h-[18px] w-[18px] text-brand-700" />
                {COMPANY.phone}
              </a>
              <p className="mt-1 text-xs text-ink-500">
                お問い合わせ受付時間 {COMPANY.hours}
              </p>

              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-3 block break-all text-sm text-ink-600 underline decoration-mist-300 underline-offset-4 transition-colors hover:text-brand-700"
              >
                {COMPANY.email}
              </a>
            </address>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 border border-mist-300 px-5 py-3 text-[13px] font-medium text-ink-900 transition-colors hover:border-ink-900"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
              Instagram {INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* リンク */}
          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-labelledby="footer-services">
              <h2
                id="footer-services"
                className="text-[11px] font-medium tracking-[0.2em] text-ink-500"
              >
                対応できる工事
              </h2>
              <ul className="mt-5 space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[13.5px] text-ink-700 transition-colors hover:text-brand-700"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-site">
              <h2
                id="footer-site"
                className="text-[11px] font-medium tracking-[0.2em] text-ink-500"
              >
                サイトメニュー
              </h2>
              <ul className="mt-5 space-y-3">
                {SITE_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-ink-700 transition-colors hover:text-brand-700"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-recruit">
              <h2
                id="footer-recruit"
                className="text-[11px] font-medium tracking-[0.2em] text-ink-500"
              >
                採用情報
              </h2>
              <ul className="mt-5 space-y-3">
                {RECRUIT_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-ink-700 transition-colors hover:text-brand-700"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* 下段 */}
        <div className="mt-14 flex flex-col gap-5 border-t border-mist-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-xs text-ink-500 transition-colors hover:text-brand-700"
              >
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap"
                className="text-xs text-ink-500 transition-colors hover:text-brand-700"
              >
                サイトマップ
              </Link>
            </li>
          </ul>

          <p className="text-xs text-ink-400">
            © {year} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
