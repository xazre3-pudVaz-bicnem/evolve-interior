import Link from 'next/link'
import { COMPANY } from '@/lib/constants'
import Button from './Button'
import LineButton from './LineButton'
import PhoneIcon from './PhoneIcon'

type Props = {
  className?: string
}

/**
 * 共通のお問い合わせ導線。
 * 「工事のご相談」と「採用のご応募」は目的が違うため、明確に分けて提示する。
 */
export default function ContactCta({ className = '' }: Props) {
  return (
    <section className={`bg-ink-900 ${className}`} aria-labelledby="contact-cta-heading">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-brand-300">
            <span className="eyebrow-bar" aria-hidden="true" />
            CONTACT
          </p>
          <h2
            id="contact-cta-heading"
            className="heading-jp mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-[2.1rem]"
          >
            工事のご相談も、採用のご応募も、
            <br />
            まずはご連絡ください。
          </h2>
          <p className="mt-5 text-[15px] leading-[1.95] text-mist-300">
            工事の内容が固まっていない段階でのご相談も承ります。採用については、応募前のご質問だけでも構いません。
          </p>
        </div>

        {/* 2つの導線を明確に分ける */}
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
          <div className="flex flex-col justify-between gap-6 bg-ink-900 p-8 sm:p-10">
            <div>
              <h3 className="text-lg font-bold text-white">工事のご相談</h3>
              <p className="mt-3 text-sm leading-[1.9] text-mist-400">
                法人・工務店・一般のお客様、いずれのご相談も承っています。写真や図面があれば、あわせてお送りください。
              </p>
            </div>
            <Button href="/contact" variant="primary" className="w-full sm:w-auto">
              工事の相談をする
            </Button>
          </div>

          <div className="flex flex-col justify-between gap-6 bg-ink-900 p-8 sm:p-10">
            <div>
              <h3 className="text-lg font-bold text-white">採用のご応募</h3>
              <p className="mt-3 text-sm leading-[1.9] text-mist-400">
                未経験の方も、経験者の方も歓迎します。仕事内容や働き方について、質問だけでも構いません。
              </p>
            </div>
            <Button href="/recruit/apply" variant="outlineLight" className="w-full sm:w-auto">
              採用に応募する
            </Button>
          </div>
        </div>

        {/* LINE・電話・メール */}
        <div className="mt-10 border-t border-white/10 pt-10">
          {/* LINEは写真をそのまま送れるので、この業種では最も使われる導線 */}
          <div className="flex flex-col gap-4 border border-white/15 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-[15px] font-bold text-white">LINEでも受け付けています</p>
              <p className="mt-2 text-sm leading-[1.9] text-mist-300">
                現場の写真をそのまま送っていただけます。工事の名前が分からなくても、写真があればご案内できる場合があります。
              </p>
            </div>
            <LineButton variant="filled" className="shrink-0">
              LINEで相談する
            </LineButton>
          </div>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] tracking-[0.2em] text-mist-400">お電話でのお問い合わせ</p>
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="mt-2 inline-flex items-center gap-3 text-2xl font-bold text-white transition-colors hover:text-brand-300 sm:text-3xl"
              >
                <PhoneIcon className="h-6 w-6 text-brand-400" />
                {COMPANY.phone}
              </a>
              <p className="mt-2 text-xs text-mist-400">受付時間 {COMPANY.hours}</p>
            </div>

            <div className="sm:text-right">
              <p className="text-[11px] tracking-[0.2em] text-mist-400">メール</p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-2 block break-all text-[15px] text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-brand-300"
              >
                {COMPANY.email}
              </a>
              <Link
                href="/privacy"
                className="mt-3 inline-block text-xs text-mist-400 underline underline-offset-4 transition-colors hover:text-white"
              >
                個人情報保護方針
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
