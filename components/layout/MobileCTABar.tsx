import Link from 'next/link'
import { COMPANY, LINE_URL } from '@/lib/constants'
import PhoneIcon from '@/components/ui/PhoneIcon'
import LineIcon from '@/components/ui/LineIcon'

/**
 * スマートフォン用の固定導線（画面下部）。
 *
 * ・電話（受付時間も表示する）
 * ・LINE（写真を送って相談できるので、この業種では最も使われる導線）
 * ・工事の相談
 * ・採用応募
 *
 * ※ 本文が隠れないよう、layout.tsx の body に pb-16 を付けている。
 * ※ lg 以上では非表示（ヘッダーの導線に集約）。
 * ※ LINE緑は白文字だと 2.26:1 しかないため、必ず濃色文字を乗せる。
 */
export default function MobileCTABar() {
  return (
    // data-mobile-cta: モバイルメニューを開いたときに inert にするための目印
    <div
      data-mobile-cta
      className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white lg:hidden"
    >
      <div className="grid h-16 grid-cols-[64px_64px_1fr_1fr]">
        <a
          href={`tel:${COMPANY.phoneHref}`}
          className="flex flex-col items-center justify-center gap-0.5 border-r border-mist-200 text-ink-900"
          aria-label={`電話をかける ${COMPANY.phone}（受付時間 ${COMPANY.hours}）`}
        >
          <PhoneIcon className="h-[17px] w-[17px] text-brand-700" />
          <span className="text-[10.5px] font-medium leading-none">電話</span>
          <span className="text-[8.5px] leading-none text-ink-500">{COMPANY.hoursShort}</span>
        </a>

        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 bg-line text-ink-900"
          aria-label="LINEで相談する（新しいタブで開きます）"
        >
          <LineIcon className="h-[19px] w-[19px]" />
          <span className="text-[10.5px] font-bold leading-none">LINE</span>
        </a>

        <Link
          href="/contact"
          className="flex items-center justify-center bg-brand-700 text-[13.5px] font-medium text-white"
        >
          工事の相談
        </Link>

        <Link
          href="/recruit/apply"
          className="flex items-center justify-center bg-ink-900 text-[13.5px] font-medium text-white"
        >
          採用応募
        </Link>
      </div>
    </div>
  )
}
