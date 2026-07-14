'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import PhotoFrame from '@/components/ui/PhotoFrame'
import { WORK_CATEGORIES, filterWorks, type Work } from '@/lib/works'

/** サーバー側で解決済みの写真パス（存在しない場合は null） */
export type ResolvedWork = Omit<Work, 'photos'> & {
  photos: {
    before: string | null
    during: string | null
    after: string | null
  }
}

function WorkPhoto({
  src,
  alt,
  caption,
}: {
  src: string | null
  alt: string
  caption: string
}) {
  return (
    <figure className="zoom-parent">
      {src ? (
        <div
          className="relative overflow-hidden bg-mist-100"
          style={{ aspectRatio: '4 / 3' }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover"
          />
          <span className="absolute left-0 top-0 bg-ink-900/85 px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] text-white">
            {caption}
          </span>
        </div>
      ) : (
        <PhotoFrame ratio="4 / 3" label={caption} tone="light" />
      )}
    </figure>
  )
}

export default function WorksGallery({ works }: { works: ResolvedWork[] }) {
  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(() => filterWorks(works, active), [works, active])

  return (
    <div>
      {/* 絞り込み */}
      <div role="group" aria-label="施工実績の絞り込み" className="flex flex-wrap gap-2">
        {WORK_CATEGORIES.map((c) => {
          const isActive = active === c.id
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={isActive}
              className={`border px-5 py-2.5 text-[13.5px] font-medium transition-colors ${
                isActive
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-mist-300 bg-white text-ink-700 hover:border-ink-900'
              }`}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-[13px] text-ink-500">
        {filtered.length}件の施工実績
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 border border-mist-200 bg-mist-50 p-8 text-[14.5px] text-ink-600">
          この条件に該当する施工実績はまだありません。
        </p>
      ) : (
        <ul className="mt-8 space-y-16">
          {filtered.map((w) => {
            const shots = [
              { src: w.photos.before, caption: '施工前・下地' },
              { src: w.photos.during, caption: '施工中' },
              { src: w.photos.after, caption: '施工後' },
            ].filter((s) => s.src !== null)

            return (
              <li key={w.id} className="border-t border-mist-200 pt-10">
                <article>
                  <div className="flex flex-wrap items-center gap-2">
                    {w.target && (
                      <span className="bg-ink-900 px-2.5 py-1 text-[11px] font-medium text-white">
                        {w.target}
                      </span>
                    )}
                    <span className="border border-mist-300 px-2.5 py-1 text-[11px] text-ink-600">
                      {w.type}
                    </span>
                  </div>

                  <h2 className="heading-jp mt-4 text-xl font-bold text-ink-900 sm:text-2xl">
                    {w.title}
                  </h2>

                  {/* 施工場所・施工時期は、確認できている場合のみ表示する */}
                  {(w.place || w.period) && (
                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[13px] text-ink-500">
                      {w.place && (
                        <div className="flex gap-2">
                          <dt>施工場所</dt>
                          <dd className="text-ink-700">{w.place}</dd>
                        </div>
                      )}
                      {w.period && (
                        <div className="flex gap-2">
                          <dt>施工時期</dt>
                          <dd className="text-ink-700">{w.period}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  {/* 施工前 / 施工中 / 施工後（ある写真だけ並べる）
                      写真が少ない実績でも大きさが揃うよう、列数は常に3で固定する */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {shots.map((s) => (
                      <WorkPhoto
                        key={s.caption}
                        src={s.src}
                        alt={`${w.title}（${s.caption}）`}
                        caption={s.caption}
                      />
                    ))}
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-[11px] font-medium tracking-[0.2em] text-ink-500">
                        施工内容
                      </h3>
                      <p className="mt-3 text-[14.5px] leading-[1.95] text-ink-700">
                        {w.description}
                      </p>
                    </div>

                    {w.points.length > 0 && (
                      <div>
                        <h3 className="text-[11px] font-medium tracking-[0.2em] text-ink-500">
                          工事のポイント
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                          {w.points.map((p) => (
                            <li key={p} className="flex items-start gap-3">
                              <span
                                className="mt-2 h-1.5 w-3.5 shrink-0 skew-x-[-24deg] bg-brand-500"
                                aria-hidden="true"
                              />
                              <span className="text-[14px] leading-relaxed text-ink-700">
                                {p}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
