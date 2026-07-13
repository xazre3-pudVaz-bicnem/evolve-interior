import { COMPANY } from './constants'
import type { ContactInput, ApplyInput } from './validate'

/**
 * mailto: 方式の送信内容を組み立てる。
 *
 * 既存プロジェクト（染 YUI COLORS など）と同じ方式。
 * 訪問者のメールソフトが開き、本文が入力済みの状態になる。
 * サーバーの設定も外部サービスの契約も不要で、そのまま運用できる。
 *
 * ■ 本文を短く保つこと（重要）
 * 日本語は1文字が %XX%XX%XX（9文字）に展開されるため、
 * mailto のURLは驚くほど長くなる。「全角スペースで見た目を揃える」ような
 * 装飾を入れると、それだけで数百文字ぶん膨らむ。
 * 一部のメールソフト（Outlook等）はURLが長いと本文を切り落とすため、
 * 見出しは最小限にし、余計な前置きや区切り線は入れない。
 *
 * それでも長文が入力されれば上限を超えうるので、
 * 画面側では必ず「内容をコピーする」手段を併記すること（MailtoPanel）。
 */

/**
 * これを超えると、メールソフトによっては本文が切れる可能性がある。
 *
 * Outlook など一部のメールソフトは mailto のURLを約2000文字で打ち切る。
 * 標準的な内容（本文100文字程度）なら 1900〜2000文字に収まるため、
 * その範囲では警告を出さず、明らかに長い場合だけ注意を促す。
 */
export const MAILTO_SAFE_LENGTH = 2000

/** 工事のご相談 */
export function buildContactMail(v: ContactInput): { subject: string; body: string } {
  const subject = `【工事のご相談】${v.name}様（${v.entityType}）`

  const body = [
    `■お名前: ${v.name}`,
    `■個人/法人: ${v.entityType}`,
    `■会社名・屋号: ${v.company || '(なし)'}`,
    `■メール: ${v.email}`,
    `■電話: ${v.phone}`,
    `■工事場所: ${v.site}`,
    `■希望する工事: ${v.works.join('、')}`,
    `■希望時期: ${v.timing || '(未選択)'}`,
    `■図面・写真: ${v.hasDocs || '(未選択)'}`,
    '',
    '■お問い合わせ内容',
    v.message,
  ].join('\n')

  return { subject, body }
}

/** 採用応募 */
export function buildApplyMail(v: ApplyInput): { subject: string; body: string } {
  const subject = `【採用応募】${v.name}様（${v.experience}）`

  const body = [
    `■氏名: ${v.name}`,
    `■ふりがな: ${v.kana}`,
    `■年齢: ${v.age}`,
    `■居住エリア: ${v.area}`,
    `■電話: ${v.phone}`,
    `■メール: ${v.email}`,
    `■希望する連絡方法: ${v.contactMethod}`,
    `■内装工事の経験: ${v.experience}`,
    `■経験年数: ${v.years || '(なし)'}`,
    `■保有資格: ${v.licenses || '(なし)'}`,
    `■希望する働き方: ${v.workStyle}`,
    '',
    '■応募理由・ご質問',
    v.message || '(なし)',
  ].join('\n')

  return { subject, body }
}

/** mailto: のURLを組み立てる */
export function mailtoHref(subject: string, body: string, to: string = COMPANY.email): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** この内容だと本文が切れる可能性があるか */
export function isMailtoTooLong(subject: string, body: string): boolean {
  return mailtoHref(subject, body).length > MAILTO_SAFE_LENGTH
}

