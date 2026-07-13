import { COMPANY, SITE_URL, SITE_NAME } from './constants'

/**
 * 採用情報データ。
 *
 * ■ 重要（絶対に守ること）
 * 給与・日給・月給・賞与・昇給・雇用形態・休日・社会保険・交通費・試用期間・
 * 資格手当・残業時間・福利厚生・寮／社宅・選考回数 は「未提供」である。
 * これらを推測で記載してはならない。
 *
 * 未確定項目は value を null にすると、画面上は
 * 「詳細は面談時にご案内します」と自動表示される。
 * 条件が確定したら value に文字列を入れるだけで反映される。
 */

export type Requirement = {
  label: string
  /** null = 未確定（「詳細は面談時にご案内します」と表示される） */
  value: string | string[] | null
  note?: string
}

export const UNDETERMINED_TEXT = '詳細は面談時にご案内します'

/** 募集職種名（JobPosting実装時にも使用） */
export const JOB_TITLE = '内装工事スタッフ'

/** 仕事内容（提供された工事種別） */
export const JOB_TASKS = [
  '軽鉄工事',
  'ボード工事',
  '化粧ケイカル工事',
  'キッチンパネル工事',
  'システム天井工事',
  '大工造作工事',
  'クロス工事',
  '塗装工事',
  'サイディング工事',
] as const

/**
 * 募集要項。
 * 提供された情報のみ value を埋めている。それ以外は null（＝面談時案内）。
 */
export const REQUIREMENTS: Requirement[] = [
  { label: '募集職種', value: JOB_TITLE },
  {
    label: '仕事内容',
    value: [...JOB_TASKS],
    note: '現場や工事の内容によって、担当する作業は異なります。未経験の方は、できる作業から順に覚えていただきます。',
  },
  {
    label: '応募対象',
    value: '未経験者・経験者ともに歓迎',
    note: '10代後半から20代の若手スタッフを中心に、幅広い年代の方からの応募を歓迎しています。',
  },
  { label: '性別', value: '男女問わず歓迎' },
  {
    label: '主な現場',
    value: '兵庫県、大阪府、京都府、滋賀県を中心とした関西エリア',
  },
  {
    label: '勤務時間の目安',
    value: COMPANY.workHours,
    note: '現場や工事の内容によって前後する場合があります。',
  },
  {
    label: '勤務形態',
    value: '現場へ直行し、作業終了後は現地解散',
  },
  {
    label: '経験者の方の待遇',
    value: '経験や技術を考慮します',
    note: '経験者は、これまでの経験や技術を考慮します。詳しい条件は面談時にご案内します。',
  },
  // ── 以下は未提供のため null（勝手に埋めないこと） ──
  { label: '雇用形態', value: null },
  { label: '給与', value: null },
  { label: '休日・休暇', value: null },
  { label: '待遇・福利厚生', value: null },
  { label: '選考の流れ', value: null },
  {
    label: 'お問い合わせ受付時間',
    value: COMPANY.hours,
  },
]

/** 一日の流れ */
export const DAY_SCHEDULE = [
  {
    time: '08:30',
    title: '現場集合・作業内容の確認',
    body: 'その日の作業範囲と段取りを確認してから始めます。現場へは直行します。',
    image: 'day-morning.jpg',
  },
  {
    time: '午前',
    title: '軽鉄下地、ボード施工、造作工事など',
    body: 'その日の工事内容に応じて作業を進めます。未経験の方は、先輩と組んでできることから覚えていきます。',
    image: 'day-work.jpg',
  },
  {
    time: '昼',
    title: '休憩',
    body: '現場の状況に合わせて休憩をとります。',
    image: 'day-break.jpg',
  },
  {
    time: '午後',
    title: '午前中の続き、仕上がり確認、現場整理',
    body: '作業の続きを進め、仕上がりを確認します。最後に現場を片付けます。',
    image: 'day-afternoon.jpg',
  },
  {
    time: '17:30',
    title: '作業終了・現地解散',
    body: '片付けと確認が終わったら、現地で解散です。',
    image: 'day-end.jpg',
  },
] as const

export const DAY_NOTES = [
  '基本的に現場へ直行します。',
  '工事対応後は、現地で解散します。',
  '現場や工事の内容によって、流れが異なる場合があります。',
] as const

/** EVOLVEで働く魅力 */
export const RECRUIT_APPEALS = [
  {
    title: '手に職がつく仕事です',
    body: '軽鉄・ボード工事は、建物の内側を形づくる技術です。図面を読み、寸法を出し、下地を組む。一度身につけた技術は、現場が変わっても使えます。',
  },
  {
    title: '若いスタッフが中心の現場です',
    body: '20代の若いスタッフが多く活躍しています。年齢の近い先輩に質問しやすい環境で、分からないことをそのままにせず進められます。',
  },
  {
    title: '経験を正当に評価します',
    body: '内装工事の経験がある方は、これまでの経験や技術を考慮します。できることを活かして、現場を任せられる存在になっていただきたいと考えています。',
  },
  {
    title: '幅広い工事に関われます',
    body: '軽鉄・ボードを中心に、大工造作から内装仕上げまで幅広く対応しています。ひとつの工程だけでなく、内装工事の全体像を知ることができます。',
  },
] as const

/** 求める人物像 */
export const IDEAL_CANDIDATES = [
  '身体を動かす仕事に興味がある',
  '技術を身につけたい',
  '現場での連携を大切にできる',
  '時間や約束を守れる',
  '経験を活かして活躍したい',
  '新しい仕事を前向きに覚えられる',
] as const

/** 未経験の方へ */
export const MESSAGE_BEGINNER = {
  title: '未経験の方へ',
  lead: '最初から、道具の名前も、材料の名前も、知らなくて構いません。',
  body: [
    '内装工事の現場は、覚えることがたくさんあります。ただ、それは一度に全部覚えるものではありません。運搬や片付けといった作業から始めて、道具の使い方を覚え、少しずつ任される範囲が広がっていきます。',
    'EVOLVEには20代の若いスタッフが多く在籍しています。年齢の近い先輩がいるということは、質問しやすいということです。分からないことを分からないまま進めるのが、いちばん危険です。',
    '大切なのは、時間を守ること、任された作業を最後までやりきること、分からないときに聞けること。この3つができれば、技術は現場で身につきます。',
  ],
} as const

/** 経験者の方へ */
export const MESSAGE_EXPERIENCED = {
  title: '経験者の方へ',
  lead: 'これまで積み上げてきたものを、そのまま活かしてください。',
  body: [
    '軽鉄・ボード工事の経験がある方であれば、EVOLVEの現場ですぐに力を発揮していただけます。墨出しから建て込み、割付けまで、任せられる範囲は経験に応じて広がります。',
    '経験や技術は正当に考慮します。詳しい条件については、面談の際にご案内します。ご希望や条件のすり合わせも、その場でお話しさせてください。',
    'また、若いスタッフに技術を伝えていただける方も歓迎します。現場で教えられる人がいることは、会社にとって大きな財産です。',
  ],
} as const

/**
 * JobPosting 構造化データ用の準備。
 *
 * 給与・雇用形態・休日などが未確定のため、現時点では出力しない。
 * 条件が確定したら JOB_POSTING_DATA を埋めるだけで、
 * buildJobPostingSchema() が自動的にスキーマを返すようになる。
 */
export type JobPostingData = {
  /** 雇用形態: FULL_TIME / PART_TIME / CONTRACTOR など */
  employmentType: string | null
  /** 給与（下限） */
  baseSalaryMin: number | null
  /** 給与（上限） */
  baseSalaryMax: number | null
  /** 給与の単位: HOUR / DAY / MONTH / YEAR */
  salaryUnit: 'HOUR' | 'DAY' | 'MONTH' | 'YEAR' | null
  /** 掲載日（ISO 8601） */
  datePosted: string | null
  /** 掲載終了日（ISO 8601） */
  validThrough: string | null
}

/** ★ 条件が確定したらここを埋める。null のあいだは JobPosting を出力しない。 */
export const JOB_POSTING_DATA: JobPostingData = {
  employmentType: null,
  baseSalaryMin: null,
  baseSalaryMax: null,
  salaryUnit: null,
  datePosted: null,
  validThrough: null,
}

/**
 * JobPosting 構造化データを生成する。
 * 必須項目がひとつでも欠けている場合は null を返し、出力しない。
 * （不完全な JobPosting は Google のガイドライン違反となるため）
 */
export function buildJobPostingSchema(data: JobPostingData = JOB_POSTING_DATA) {
  const { employmentType, baseSalaryMin, salaryUnit, datePosted } = data

  if (!employmentType || baseSalaryMin === null || !salaryUnit || !datePosted) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: JOB_TITLE,
    description: `軽鉄工事・ボード工事を中心とした内装工事スタッフの募集です。未経験者・経験者ともに歓迎します。主な現場は兵庫県、大阪府、京都府、滋賀県を中心とした関西エリアです。`,
    datePosted,
    ...(data.validThrough ? { validThrough: data.validThrough } : {}),
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressRegion: COMPANY.addressRegion,
        addressLocality: COMPANY.addressLocality,
        streetAddress: COMPANY.streetAddress,
        addressCountry: COMPANY.addressCountry,
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'JPY',
      value: {
        '@type': 'QuantitativeValue',
        ...(data.baseSalaryMax !== null
          ? { minValue: baseSalaryMin, maxValue: data.baseSalaryMax }
          : { value: baseSalaryMin }),
        unitText: salaryUnit,
      },
    },
  }
}
