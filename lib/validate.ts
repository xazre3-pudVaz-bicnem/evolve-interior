/**
 * フォームのバリデーション。
 * クライアント・サーバー双方から呼び、同じルールを共有する。
 * （クライアントの検証は迂回できるため、サーバー側でも必ず実行すること）
 */

export type Errors<T> = Partial<Record<keyof T, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** 数字・ハイフン・括弧・空白・国番号を許容 */
const PHONE_RE = /^[0-9+\-() 　]{9,20}$/

export function isEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim())
}

export function isPhone(v: string): boolean {
  return PHONE_RE.test(v.trim())
}

export function required(v: string | undefined | null): boolean {
  return typeof v === 'string' && v.trim().length > 0
}

export function maxLen(v: string, n: number): boolean {
  return v.trim().length <= n
}

/** ── 工事のご相談フォーム ── */
export type ContactInput = {
  name: string
  company: string
  entityType: string
  email: string
  phone: string
  site: string
  works: string[]
  message: string
  timing: string
  hasDocs: string
  consent: boolean
}

export function validateContact(v: Partial<ContactInput>): Errors<ContactInput> {
  const e: Errors<ContactInput> = {}

  if (!required(v.name)) e.name = 'お名前を入力してください。'
  else if (!maxLen(v.name!, 50)) e.name = 'お名前は50文字以内で入力してください。'

  if (!required(v.entityType)) e.entityType = '個人・法人のいずれかを選択してください。'

  if (v.entityType === '法人' && !required(v.company)) {
    e.company = '会社名または屋号を入力してください。'
  }

  if (!required(v.email)) e.email = 'メールアドレスを入力してください。'
  else if (!isEmail(v.email!)) e.email = 'メールアドレスの形式が正しくありません。'

  if (!required(v.phone)) e.phone = '電話番号を入力してください。'
  else if (!isPhone(v.phone!)) e.phone = '電話番号の形式が正しくありません。'

  if (!required(v.site)) e.site = '工事場所を入力してください。'

  if (!v.works || v.works.length === 0) {
    e.works = '希望する工事を1つ以上選択してください。'
  }

  if (!required(v.message)) e.message = 'お問い合わせ内容を入力してください。'
  else if (!maxLen(v.message!, 2000)) e.message = 'お問い合わせ内容は2000文字以内で入力してください。'

  if (!v.consent) e.consent = '個人情報保護方針への同意が必要です。'

  return e
}

/** ── 採用応募フォーム ── */
export type ApplyInput = {
  name: string
  kana: string
  age: string
  phone: string
  email: string
  area: string
  workStyle: string
  experience: string
  years: string
  licenses: string
  contactMethod: string
  message: string
  consent: boolean
}

export function validateApply(v: Partial<ApplyInput>): Errors<ApplyInput> {
  const e: Errors<ApplyInput> = {}

  if (!required(v.name)) e.name = '氏名を入力してください。'
  if (!required(v.kana)) e.kana = 'ふりがなを入力してください。'

  if (!required(v.age)) e.age = '年齢を入力してください。'
  else {
    const n = Number(v.age)
    if (!Number.isInteger(n) || n < 15 || n > 99) {
      // 「14」と入れた人に「数字で入力してください」と言っても直しようがない。
      // 実際のルール（15〜99）をそのまま伝える。
      e.age = '年齢は15〜99の半角数字で入力してください。'
    }
  }

  if (!required(v.phone)) e.phone = '電話番号を入力してください。'
  else if (!isPhone(v.phone!)) e.phone = '電話番号の形式が正しくありません。'

  if (!required(v.email)) e.email = 'メールアドレスを入力してください。'
  else if (!isEmail(v.email!)) e.email = 'メールアドレスの形式が正しくありません。'

  if (!required(v.area)) e.area = '居住エリアを入力してください。'
  if (!required(v.workStyle)) e.workStyle = '希望する働き方を選択してください。'
  if (!required(v.experience)) e.experience = '内装工事経験の有無を選択してください。'
  if (!required(v.contactMethod)) e.contactMethod = '希望する連絡方法を選択してください。'

  if (v.message && !maxLen(v.message, 2000)) {
    e.message = '2000文字以内で入力してください。'
  }

  if (!v.consent) e.consent = '個人情報保護方針への同意が必要です。'

  return e
}

export function hasErrors<T>(e: Errors<T>): boolean {
  return Object.keys(e).length > 0
}

/**
 * 入力不備があったとき、最初のエラー項目へフォーカスを移す。
 *
 * スクロールするだけだと、キーボード利用者のフォーカスは送信ボタンに
 * 残ったままになり、どこを直せばいいのか分からない。
 * また [aria-invalid] が付くのは <fieldset> のこともあるため、
 * その場合は中の最初の入力要素を探してフォーカスする。
 */
export function focusFirstError() {
  requestAnimationFrame(() => {
    const invalid = document.querySelector<HTMLElement>('[aria-invalid="true"]')
    if (!invalid) return

    const target = invalid.matches('input, select, textarea')
      ? invalid
      : invalid.querySelector<HTMLElement>('input, select, textarea')

    ;(target ?? invalid).focus({ preventScroll: true })
    invalid.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
