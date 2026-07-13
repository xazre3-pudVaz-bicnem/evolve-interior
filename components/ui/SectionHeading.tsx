type Props = {
  /**
   * 見出しに付けるid。
   * 親の <section aria-labelledby="..."> から参照するために必須。
   * これを渡し忘れると、参照先が存在せずセクションが
   * ランドマーク（領域）として認識されなくなる。
   */
  id?: string
  /** 英字の小見出し（例: SERVICES） */
  eyebrow?: string
  /** 見出し本体 */
  title: React.ReactNode
  /** 補足文 */
  lead?: string
  /** 見出しのHTMLタグ（h1はページに1つだけ） */
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

/** セクション見出し。斜めバー + 英字ラベル + 日本語見出し。 */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  as = 'h2',
  align = 'left',
  tone = 'light',
  className = '',
}: Props) {
  const Tag = as
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] ${
            centered ? 'justify-center' : ''
          } ${tone === 'dark' ? 'text-brand-300' : 'text-brand-700'}`}
        >
          <span className="eyebrow-bar" aria-hidden="true" />
          {eyebrow}
        </p>
      )}

      <Tag
        id={id}
        className={`heading-jp mt-4 text-2xl font-bold sm:text-3xl lg:text-[2.1rem] ${
          tone === 'dark' ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </Tag>

      {lead && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-[1.95] ${centered ? 'mx-auto' : ''} ${
            tone === 'dark' ? 'text-mist-300' : 'text-ink-600'
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
