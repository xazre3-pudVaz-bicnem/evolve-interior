import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { SERVICES } from '@/lib/services'

/** 更新日。内容を大きく更新したときに書き換える。 */
const LAST_MODIFIED = new Date('2026-07-13')

type Entry = {
  path: string
  priority: number
  freq: MetadataRoute.Sitemap[number]['changeFrequency']
}

const STATIC_ROUTES: Entry[] = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/works', priority: 0.8, freq: 'weekly' },
  { path: '/company', priority: 0.7, freq: 'monthly' },
  { path: '/contact', priority: 0.9, freq: 'monthly' },
  { path: '/recruit', priority: 0.9, freq: 'monthly' },
  { path: '/recruit/requirements', priority: 0.8, freq: 'monthly' },
  { path: '/recruit/day', priority: 0.7, freq: 'monthly' },
  { path: '/recruit/apply', priority: 0.8, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/sitemap', priority: 0.3, freq: 'yearly' },
]

const SERVICE_ROUTES: Entry[] = SERVICES.map((s) => ({
  path: `/services/${s.slug}`,
  priority: 0.8,
  freq: 'monthly' as const,
}))

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_ROUTES, ...SERVICE_ROUTES].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
