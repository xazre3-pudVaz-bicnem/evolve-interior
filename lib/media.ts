import fs from 'node:fs'
import path from 'node:path'

/**
 * 画像の「置くだけ差し替え」を実現するためのビルド時解決。
 *
 * public/images/ に該当ファイルがあればそのパスを返し、
 * なければ null を返す（＝呼び出し側が仮枠を表示する）。
 *
 * つまり、写真を public/images/ に置いて再ビルドするだけで、
 * コードを1行も触らずに仮枠が実写に切り替わる。
 *
 * ※ サーバー専用モジュール。クライアントコンポーネントから import しないこと。
 *    クライアント側で画像が必要な場合は、サーバー側で解決してから props で渡す。
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public')

function exists(absPath: string): boolean {
  try {
    return fs.existsSync(absPath)
  } catch {
    return false
  }
}

/** パストラバーサル防止（内部利用のみだが念のため） */
function sanitize(rel: string): string | null {
  const clean = rel.replace(/^[/\\]+/, '')
  if (clean.includes('..')) return null
  return clean
}

/**
 * public/images/ 配下のファイルを解決する。
 * @param rel 例: 'hero.jpg' / 'works/shop-after.jpg'
 * @returns 存在すれば '/images/...'、なければ null
 */
export function resolveImage(rel?: string | null): string | null {
  if (!rel) return null
  const clean = sanitize(rel)
  if (!clean) return null
  return exists(path.join(PUBLIC_DIR, 'images', clean)) ? `/images/${clean}` : null
}

/**
 * public/ 直下のファイルを解決する。
 * 公式ロゴ（logo.svg など）を後から置いたときに自動で使うために利用する。
 */
export function resolvePublic(rel: string): string | null {
  const clean = sanitize(rel)
  if (!clean) return null
  return exists(path.join(PUBLIC_DIR, clean)) ? `/${clean}` : null
}

/**
 * 公式ロゴ（ロックアップ）を探す。
 * public/ に logo.svg / logo.png / logo.webp のいずれかを置くと、
 * ヘッダー・フッターの表示が自動でその画像に切り替わる。
 */
export function findBrandLogo(): string | null {
  for (const file of ['logo.svg', 'logo.png', 'logo.webp', 'logo.jpg']) {
    const found = resolvePublic(file)
    if (found) return found
  }
  return null
}

/**
 * 濃色背景用の白抜きロゴ。
 * ヒーロー上の透過ヘッダーなど、暗い背景に重ねるときに使う。
 * （支給された logo.pdf から、緑のマークを残したまま文字だけ白にして生成）
 */
export function findBrandLogoWhite(): string | null {
  for (const file of ['logo-white.svg', 'logo-white.png', 'logo-white.webp']) {
    const found = resolvePublic(file)
    if (found) return found
  }
  return null
}
