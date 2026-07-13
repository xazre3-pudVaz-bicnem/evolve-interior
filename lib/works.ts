/**
 * 施工実績データ。
 *
 * ■ 重要（捏造しないための設計）
 * 支給された施工写真から確認できる内容だけを記載している。
 * 写真から判断できない情報（施工場所・施工時期・対象区分・施主）は
 * すべて任意項目とし、未確認のあいだは画面に出さない。
 * 推測で「兵庫県尼崎市」「2026年5月」などと書いてはならない。
 *
 * ■ 追加・追記の方法（CMS不要）
 * 1. 写真を public/images/works/ に置く
 * 2. 下の WORKS 配列にオブジェクトを追加、または既存項目に place / period / target を追記する
 * 3. 再デプロイすれば一覧・絞り込みに自動で反映される
 */

/** 絞り込みカテゴリー */
export const WORK_CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'light-gauge-steel', label: '軽鉄' },
  { id: 'board', label: 'ボード' },
  { id: 'carpentry', label: '大工造作' },
  { id: 'finishing', label: '内装仕上げ' },
  { id: 'other', label: 'その他' },
] as const

export type WorkCategory = Exclude<(typeof WORK_CATEGORIES)[number]['id'], 'all'>

/** 対象区分 */
export const WORK_TARGETS = ['一般住宅', '店舗', 'オフィス', '施設', 'その他'] as const
export type WorkTarget = (typeof WORK_TARGETS)[number]

export type Work = {
  id: string
  /** 施工タイトル */
  title: string
  /** 施工種別（表示用のラベル） */
  type: string
  /** 絞り込み用カテゴリー（複数可） */
  categories: WorkCategory[]
  /** 施工内容 */
  description: string
  /** 工事のポイント */
  points: string[]
  /** 写真（public/images/works/ 配下のファイル名） */
  photos: {
    before?: string
    during?: string
    after?: string
  }

  /* ── 以下は写真から判断できないため任意。確認できたら追記する ── */
  /** 施工場所（例: 兵庫県尼崎市） */
  place?: string
  /** 施工時期（例: 2026年5月） */
  period?: string
  /** 対象区分 */
  target?: WorkTarget
}

/**
 * 施工実績。
 * 支給写真から確認できる工事内容のみを記載している。
 */
export const WORKS: Work[] = [
  {
    id: 'round-ceiling',
    title: '円形天井の軽鉄下地からボード・仕上げまで',
    type: '軽鉄工事・ボード工事・内装仕上げ',
    categories: ['light-gauge-steel', 'board', 'finishing'],
    description:
      '同心円状に組んだ軽量鉄骨の下地に石膏ボードを張り、木の仕上げと間接照明で納めた円形天井です。下地の段階から仕上げまで、一連の流れで施工しています。',
    points: [
      '円形に湾曲させた軽鉄下地を、同心円状に何重にも組み上げています。',
      '曲面に合わせてボードを加工し、途切れのない円弧として通しています。',
      '照明が入る溝の位置と深さが仕上がりを左右するため、下地の段階から寸法を追い込んでいます。',
    ],
    photos: {
      before: 'round-ceiling-before.jpg',
      during: 'round-ceiling-during.jpg',
      after: 'round-ceiling-after.jpg',
    },
  },
  {
    id: 'large-curved',
    title: '大型施設の曲面造作と天井下地',
    type: '軽鉄工事・大工造作工事',
    categories: ['light-gauge-steel', 'carpentry'],
    description:
      '大空間に立ち上げた円筒形の造作です。曲面に沿って軽鉄で下地を組み、木の仕上げ材を張り込んでいます。天井は鉄骨の下に軽鉄の下地を吊って構成しています。',
    points: [
      '円筒形の曲面に合わせて、軽鉄下地を1本ずつ角度を変えて建て込んでいます。',
      '高所作業車を使い、大空間の天井下地を組んでいます。',
      '造作部分は木を使い、開口部の納まりまで現場で加工しています。',
    ],
    photos: {
      before: 'large-curved-before.jpg',
      during: 'large-curved-during.jpg',
      after: 'large-curved-after.jpg',
    },
  },
  {
    id: 'oval-ceiling',
    title: '楕円形の下がり天井の施工',
    type: '軽鉄工事・ボード工事',
    categories: ['light-gauge-steel', 'board'],
    description:
      '天井の一部を楕円形に下げた造作です。軽鉄で楕円の輪郭をつくり、曲面にボードを張り、白く仕上げています。',
    points: [
      '楕円の輪郭は、軽鉄を細かく切り込んで曲げながら形をつくっています。',
      '曲面のボードは継ぎ目が目立たないよう、割付けを調整して張っています。',
    ],
    photos: {
      before: 'oval-ceiling-before.jpg',
      during: 'oval-ceiling-during.jpg',
      after: 'oval-ceiling-after.jpg',
    },
  },
  {
    id: 'siding',
    title: '外壁サイディングの施工',
    type: 'サイディング工事',
    categories: ['other'],
    description:
      'レンガ調のサイディングボードを外壁に張り、目地をシーリングで納めています。出隅部分は専用の役物を使って通しています。',
    points: [
      '割付けを決めてから張り始め、目地の通りを揃えています。',
      '出隅は役物を使い、角の見え方を整えています。',
      '目地のシーリングは、養生をしたうえで施工しています。',
    ],
    photos: {
      before: 'siding-before.jpg',
      during: 'siding-during.jpg',
      after: 'siding-after.jpg',
    },
  },
  {
    id: 'board-finish',
    title: '化粧ボードによる壁・天井の仕上げ',
    type: 'ボード工事・内装仕上げ',
    categories: ['board', 'finishing'],
    description:
      '表面が仕上がった化粧ボードを壁と天井に張り込んでいます。貼った時点で仕上がりになるため、割付けと目地の通りが仕上がりを決めます。',
    points: [
      '目地が縦横で通るように、壁と天井の割付けを合わせています。',
      '柱型の出隅も、同じ材料で包んで納めています。',
      '点検口や設備の開口は、寸法を測って切り欠いています。',
    ],
    photos: {
      during: 'board-finish-during.jpg',
      after: 'board-finish-after.jpg',
    },
  },
  {
    id: 'rockwool-ceiling',
    title: '岩綿吸音板による天井仕上げ',
    type: '内装仕上げ',
    categories: ['finishing'],
    description:
      '天井下地の上に岩綿吸音板を張り込んでいます。空調の吹出口や点検口の位置に合わせて、板を加工しながら進めています。',
    points: [
      '目地を通しながら、天井全体の割付けを合わせています。',
      '空調機や照明の開口部は、位置を測って切り欠いています。',
    ],
    photos: {
      during: 'rockwool-during.jpg',
      after: 'rockwool-after.jpg',
    },
  },
  {
    id: 'large-ceiling',
    title: '大空間の天井下地',
    type: '軽鉄工事',
    categories: ['light-gauge-steel'],
    description:
      '広い空間の天井に、吊りボルトと野縁で下地を組んでいます。設備の配管やダクトをかわしながら、水平を出して組み上げています。',
    points: [
      '吊りボルトの間隔と水平を確認しながら、広い面を通しています。',
      '設備の配管・ダクトとの取り合いを調整しながら組んでいます。',
    ],
    photos: {
      after: 'large-ceiling-after.jpg',
    },
  },
]

export const WORKS_PREPARING_MESSAGE =
  '現在、施工事例を順次掲載しています。詳しい施工内容や対応可否については、お問い合わせください。'

/** 施工場所・施工時期などが未確認であることの注記 */
export const WORKS_DETAIL_NOTE =
  '施工場所・施工時期・対象区分などの詳細情報は、確認でき次第、順次追記していきます。'

export function filterWorks(works: Work[], category: string): Work[] {
  if (category === 'all') return works
  return works.filter((w) => w.categories.includes(category as WorkCategory))
}
