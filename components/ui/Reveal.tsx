'use client'

import { useEffect, useRef, useState } from 'react'

/** 表示のしかた（globals.css の [data-anim] に対応） */
export type Anim = 'up' | 'fade' | 'left' | 'right' | 'zoom' | 'clip'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  anim?: Anim
  as?: 'div' | 'section' | 'li' | 'article' | 'tr' | 'figure'
}

/**
 * スクロール時の表示アニメーション。
 *
 * - IntersectionObserver で一度だけ発火
 * - JS無効／prefers-reduced-motion では、そのまま表示される
 *   （初期状態の opacity:0 は .js が付いているときだけ効く）
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  anim = 'up',
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      data-anim={anim}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
