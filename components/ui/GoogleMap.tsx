import { GOOGLE_MAP_EMBED_URL, GOOGLE_MAP_URL, COMPANY, SITE_NAME } from '@/lib/constants'

/**
 * Googleマップの埋め込み。
 *
 * ・Googleマップ上の「株式会社EVOLVE」のピンと、サイトの住所が一致することを確認済み。
 * ・loading="lazy" で、スクロールして近づくまで読み込まない。
 *   Googleの地図は1MB近くあるため、初期表示の速度を落とさないようにする。
 * ・iframe には title が必須（無いとスクリーンリーダーが何のフレームか読み上げられない）。
 *
 * ※ 住所はこのコンポーネントでは出さない。
 *   置き先のページ（会社概要）に <address> があり、二重に表示されてしまうため。
 */
export default function GoogleMap({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-mist-200 bg-mist-100 sm:aspect-[16/8]">
        <iframe
          src={GOOGLE_MAP_EMBED_URL}
          title={`${SITE_NAME}（${COMPANY.address}）の地図`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <a
          href={GOOGLE_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 border border-ink-400 px-5 py-3 text-[13.5px] font-medium text-ink-900 transition-colors hover:border-ink-900"
        >
          Googleマップで開く（経路を調べる）
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </div>
  )
}
