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
  /** 郵便番号。EVOLVE社のGoogleビジネスプロフィールで確認済み */
  postalCode: '660-0075',
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
 *
 * EVOLVE社から共有されたリンク（https://share.google/f1xtnprzGQjTDOme0）を辿って確認した結果、
 * Googleマップ上に「株式会社EVOLVE」のピンが立ち、
 * 住所が「〒660-0075 兵庫県尼崎市大庄中通5丁目27-6」と表示されることを確認済み。
 * サイトの表記と一致する。
 *
 * ★ 共有リンク（share.google/...）そのものをリンク先に使ってはいけない。
 *   開くとGoogleマップではなく「検索結果ページ」に飛ぶ。
 *   「Googleマップで開く」ボタンが地図を開かない、という状態になる。
 *   下の公式のMaps URLスキームを使うこと（スマホではマップアプリが開き、経路案内に進める）。
 */
const MAP_QUERY = encodeURIComponent(`${SITE_NAME} ${COMPANY.address}`)

/** 「Googleマップで開く」用（公式のMaps URLスキーム） */
export const GOOGLE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

/**
 * 地図の埋め込み用URL。
 * ※ このURLは iframe の中でしか動かない（直接開くとエラーになる仕様）。
 */
export const GOOGLE_MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&hl=ja&z=17&output=embed`

/**
 * 緯度経度。
 * Googleマップ上の「株式会社EVOLVE」のピンから取得した実測値
 * （/maps/place/株式会社EVOLVE/@34.7190785,135.391342）。
 * 推測ではないので、構造化データの geo に使える。
 */
export const GEO = { lat: 34.7190785, lng: 135.391342 } as const

export const INSTAGRAM_URL = 'https://www.instagram.com/evolv_e96/?hl=ja'
export const INSTAGRAM_HANDLE = '@evolv_e96'

/**
 * LINE（友だち追加リンク）。
 *
 * 内装工事の相談では「現場の写真を送りたい」というニーズが強く、
 * メールより LINE のほうが圧倒的に使われる。
 * 若い求職者にとってもメール・電話より心理的なハードルが低い。
 * そのため、問い合わせ・採用の両方に導線を置いている。
 */
export const LINE_URL = 'https://line.me/ti/p/cd7hEovSUJ#~'

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
