/**
 * 簡易レート制限（スパム対策の一部）。
 *
 * ※ プロセス内のメモリで管理するため、サーバーレスで複数インスタンスに
 *   分散した場合は完全ではない。あくまで「連続投稿の抑止」が目的。
 *   本格的に対策する場合は、Upstash Redis などの外部ストアに置き換えること。
 */

const WINDOW_MS = 10 * 60 * 1000 // 10分
const MAX_REQUESTS = 5

const hits = new Map<string, number[]>()

export function checkRateLimit(key: string): { ok: boolean } {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent)
    return { ok: false }
  }

  recent.push(now)
  hits.set(key, recent)

  // メモリが際限なく増えないように、古いキーを掃除する
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    }
  }

  return { ok: true }
}

/** リクエストから送信元IPを推定する */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

/**
 * ボット判定。
 * ・ハニーポットに値が入っている
 * ・フォーム表示から送信までが速すぎる（人間なら数秒はかかる）
 */
export function looksLikeBot(body: {
  'website-url'?: unknown
  elapsedMs?: unknown
}): boolean {
  const honeypot = body['website-url']
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return true

  const elapsed = body.elapsedMs
  if (typeof elapsed === 'number' && elapsed < 3000) return true

  return false
}
