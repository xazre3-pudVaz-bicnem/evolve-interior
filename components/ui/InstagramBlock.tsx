import Photo from './Photo'
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/lib/constants'
import InstagramIcon from './InstagramIcon'

type Props = {
  /** 表示する枠の数 */
  count?: number
  className?: string
  tone?: 'light' | 'dark'
}

/**
 * Instagram 導線。
 *
 * 公式の埋め込みフィード（iframe）は、表示速度と Cookie の観点から使用しない。
 * public/images/ に instagram-1.jpg 〜 instagram-6.jpg を置くと、
 * 実際の投稿画像として表示される（未設置のあいだは仮枠）。
 */
export default function InstagramBlock({ count = 6, className = '', tone = 'light' }: Props) {
  const items = Array.from({ length: count }, (_, i) => i + 1)

  return (
    <div className={className}>
      <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {items.map((n) => (
          <li key={n}>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
              aria-label={`EVOLVEのInstagram（${INSTAGRAM_HANDLE}）を開く`}
            >
              <Photo
                src={`instagram-${n}.jpg`}
                alt={`EVOLVEのInstagram投稿 ${n}`}
                label="Instagram"
                ratio="1 / 1"
                tone={tone === 'dark' ? 'dark' : 'light'}
                sizes="(max-width: 1024px) 33vw, 16vw"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-3 border px-7 py-4 text-[15px] font-medium transition-colors ${
            tone === 'dark'
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-mist-300 text-ink-900 hover:border-ink-900'
          }`}
        >
          <InstagramIcon className="h-5 w-5" />
          <span>Instagramで施工の様子を見る</span>
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
