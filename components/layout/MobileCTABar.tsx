import Link from 'next/link'
import { COMPANY } from '@/lib/constants'
import PhoneIcon from '@/components/ui/PhoneIcon'

/**
 * スマートフォン用の固定導線（画面下部）。
 *
 * ・工事の相談
 * ・採用応募
 * ・電話（受付時間も表示する）
 *
 * ※ 本文が隠れないよう、layout.tsx の body に pb-16 を付けている。
 * ※ lg 以上では非表示（ヘッダーの導線に集約）。
 */
export default function MobileCTABar() {
  return (
    // data-mobile-cta: モバイルメニューを開いたときに inert にするための目印
    <div
      data-mobile-cta
      className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white lg:hidden"
    >
      <div className="grid h-16 grid-cols-[84px_1fr_1fr]">
        <a
          href={`tel:${COMPANY.phoneHref}`}
          className="flex flex-col items-center justify-center gap-0.5 border-r border-mist-200 text-ink-900"
          aria-label={`電話をかける ${COMPANY.phone}（受付時間 ${COMPANY.hours}）`}
        >
          <PhoneIcon className="h-[18px] w-[18px] text-brand-700" />
          <span className="text-[11px] font-medium leading-none">電話</span>
          <span className="text-[9px] leading-none text-ink-500">{COMPANY.hoursShort}</span>
        </a>

        <Link
          href="/contact"
          className="flex items-center justify-center bg-brand-700 text-[14px] font-medium text-white"
        >
          工事の相談
        </Link>

        <Link
          href="/recruit/apply"
          className="flex items-center justify-center bg-ink-900 text-[14px] font-medium text-white"
        >
          採用応募
        </Link>
      </div>
    </div>
  )
}
