'use client'

import { useEffect } from 'react'
import Mark from '@/components/ui/Mark'
import { SITE_NAME_EN, SITE_TAGLINE_EN } from '@/lib/constants'

/**
 * ローディング画面。
 *
 * ・表示するかどうかは <html> のクラスで決まる（globals.css 参照）。
 *   クラスは layout.tsx のインラインスクリプトが描画前に付けるため、ちらつかない。
 * ・初回訪問時だけ表示する（sessionStorage）。
 * ・JS無効なら .js が付かないので、そもそも表示されない。
 * ・prefers-reduced-motion では非表示。
 *
 * このコンポーネントの役割は「一定時間後に退場させる」ことだけ。
 * マークアップは常にSSRされるので、ハイドレーションのズレは起きない。
 */
export default function Loader() {
  useEffect(() => {
    const html = document.documentElement

    // 2回目以降の訪問（.loading が付いていない）は何もしない
    if (!html.classList.contains('loading')) return

    let done = false

    const finish = () => {
      if (done) return
      done = true

      html.classList.add('loaded')
      try {
        sessionStorage.setItem('evolve-visited', '1')
      } catch {
        // プライベートモード等で使えなくても問題ない
      }

      // 退場アニメーション（0.8s）の後に、完全に取り除く
      window.setTimeout(() => {
        html.classList.remove('loading', 'loaded')
      }, 900)
    }

    // 画像の読み込みは待たない（写真が多いページで待たせないため）
    const timer = window.setTimeout(finish, 1300)

    return () => {
      window.clearTimeout(timer)
      // 何らかの理由でアンマウントされても、ページが操作不能にならないようにする
      finish()
    }
  }, [])

  return (
    <div id="loader" aria-hidden="true">
      <div className="flex flex-col items-center gap-5">
        <Mark className="loader-mark" gradientId="evolve-mark-loader" />

        <div className="flex flex-col items-center gap-1.5">
          <span className="font-display text-lg font-bold tracking-[0.18em] text-white">
            {SITE_NAME_EN}
          </span>
          <span className="text-[8px] tracking-[0.34em] text-mist-400">
            {SITE_TAGLINE_EN}
          </span>
        </div>
      </div>

      <div className="loader-bar">
        <span />
      </div>
    </div>
  )
}
