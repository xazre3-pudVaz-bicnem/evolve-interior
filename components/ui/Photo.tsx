import Image from 'next/image'
import PhotoFrame from './PhotoFrame'
import { resolveImage } from '@/lib/media'

type Props = {
  /** public/images/ 配下のファイル名（例: 'hero.jpg' / 'works/shop-after.jpg'） */
  src?: string
  /** 画像のalt。写真がある場合に使用する */
  alt: string
  /** 仮枠に表示するラベル（未指定なら alt を使用） */
  label?: string
  ratio?: string
  className?: string
  priority?: boolean
  sizes?: string
  tone?: 'dark' | 'light'
}

/**
 * 写真表示コンポーネント（サーバーコンポーネント）。
 *
 * - public/images/ に該当ファイルがある → next/image で最適化表示
 * - ない → PhotoFrame（仮枠）を表示
 *
 * つまり「写真を置いて再ビルドするだけ」で差し替えが完了する。
 */
export default function Photo({
  src,
  alt,
  label,
  ratio = '4 / 3',
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  tone = 'dark',
}: Props) {
  const resolved = resolveImage(src)

  if (!resolved) {
    return (
      <PhotoFrame ratio={ratio} label={label ?? alt} tone={tone} className={className} />
    )
  }

  return (
    <div
      className={`relative overflow-hidden bg-mist-100 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}
