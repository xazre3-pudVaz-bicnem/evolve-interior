/**
 * サイト全体の単一情報源（Single Source of Truth）。
 *
 * 会社名・電話番号・メール・住所は必ずここを参照すること。
 * ページ側でハードコードすると表記ゆれ・構造化データとの不一致が発生する。
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://evolve-interior.com'

export const SITE_NAME = '株式会社EVOLVE'
export const SITE_NAME_EN = 'EVOLVE'
export const SITE_TAGLINE_EN = 'INTERIOR WORK'

/** 提供された確定情報のみ。未提供項目は絶対に追加しないこと。 */
export const COMPANY = {
  name: SITE_NAME,
  nameEn: 'EVOLVE Inc.',
  /** 代表者。役職は「代表者」としか提供されていないため、
   *  「代表取締役」などと具体化しない（登記上の役職は未確認）。 */
  ceo: '元田 健司郎',
  ceoRole: '代表者',
  /** 住所（表示用・構造化データ用で完全一致させる） */
  address: '兵庫県尼崎市大庄中通5-27-6',
  addressRegion: '兵庫県',
  addressLocality: '尼崎市',
  streetAddress: '大庄中通5-27-6',
  addressCountry: 'JP',
  /** 電話番号（表示用 / tel:リンク用） */
  phone: '080-2523-6928',
  phoneHref: '+818025236928',
  /** メールアドレス */
  email: 'evolve.see0906@ymail.ne.jp',
  /** 問い合わせ受付時間 */
  hours: '08:30〜18:30',
  hoursShort: '8:30-18:30',
  /** 勤務時間の目安（採用） */
  workHours: '08:30〜17:30',
} as const

/**
 * Googleマップ。
 * 緯度経度は未確認のため構造化データには含めない（捏造しない）。
 * 住所検索リンクのみ設置し、iframe埋め込みは位置確認が取れるまで保留。
 */
export const GOOGLE_MAP_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMPANY.address,
)}`

export const INSTAGRAM_URL = 'https://www.instagram.com/evolv_e96/?hl=ja'
export const INSTAGRAM_HANDLE = '@evolv_e96'

/**
 * フォームの送信方式。
 *
 *  'mailto' … 訪問者のメールソフトを開き、本文が入力済みの状態で送ってもらう。
 *             サーバーの設定も外部サービスの契約も不要。デプロイした時点で使える。
 *             （既存プロジェクト「染 YUI COLORS」と同じ方式）
 *
 *  'api'    … /api/contact・/api/apply からサーバー側でメールを送る。
 *             Resend の APIキーとドメイン認証が必要（.env.example 参照）。
 *             設定が済んだら、この値を 'api' に変えるだけで切り替わる。
 *             未設定のまま 'api' にすると、フォームはエラーを返す
 *             （届いていないのに「送信完了」と表示しないため）。
 */
export const FORM_MODE: 'mailto' | 'api' = 'mailto'

/** ヘッダー / フッターの共通ナビゲーション */
export const NAV = [
  { label: 'トップ', href: '/' },
  { label: '事業内容', href: '/services' },
  { label: '施工実績', href: '/works' },
  { label: '会社概要', href: '/company' },
  { label: '採用情報', href: '/recruit' },
  { label: 'お問い合わせ', href: '/contact' },
] as const

/**
 * 対応エリア。
 * 提供情報：尼崎市を中心とする阪神間 / 兵庫・大阪・京都・滋賀 /
 * 姫路方面から滋賀県方面までの関西エリア。
 */
export const AREAS = [
  { name: '兵庫県', note: '尼崎市を中心とした阪神間、姫路方面まで' },
  { name: '大阪府', note: '大阪市内・北摂・南部エリア' },
  { name: '京都府', note: '京都市内および周辺エリア' },
  { name: '滋賀県', note: '大津方面をはじめとした県内エリア' },
] as const

export const AREA_SUMMARY =
  '兵庫県尼崎市を拠点に、姫路方面から滋賀県方面までの関西エリアに対応しています。'

/** ヒーロー直下に置く短い要点表示 */
export const KEY_POINTS = [
  '軽鉄・ボード工事に特化',
  '大工造作工事にも対応',
  '兵庫・大阪・京都・滋賀を中心に対応',
  '法人・工務店・一般のお客様から相談可能',
] as const
