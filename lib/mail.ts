import { COMPANY } from './constants'

/**
 * メール送信。
 *
 * 送信先・送信元・APIキーはすべて環境変数で差し替えられる（.env.example 参照）。
 *   RESEND_API_KEY    … Resend の APIキー
 *   MAIL_FROM_EMAIL   … 送信元（Resendで認証済みドメインのアドレス）
 *   CONTACT_TO_EMAIL  … 工事のご相談の送信先（未設定なら会社のメールアドレス）
 *   RECRUIT_TO_EMAIL  … 採用応募の送信先（未設定なら会社のメールアドレス）
 *
 * ■ 重要
 * 設定が未完了のときは NOT_CONFIGURED を返す。
 * 呼び出し側は、この場合に「送信成功」を表示してはならない。
 * （届いていないのに成功と見せるのは、問い合わせを失うことと同じ）
 *
 * SDKを追加せず fetch で Resend の API を直接呼んでいる（依存を増やさないため）。
 * 別のサービスに変える場合は、この関数の中だけを差し替えればよい。
 */

export type MailResult =
  | { ok: true }
  | { ok: false; code: 'NOT_CONFIGURED' | 'SEND_FAILED'; message: string }

const FALLBACK_CONTACT = `お手数ですが、お電話（${COMPANY.phone}／受付 ${COMPANY.hours}）またはメール（${COMPANY.email}）にてご連絡ください。`

export function getContactRecipient(): string {
  return process.env.CONTACT_TO_EMAIL || COMPANY.email
}

export function getRecruitRecipient(): string {
  return process.env.RECRUIT_TO_EMAIL || COMPANY.email
}

export async function sendMail({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string
  subject: string
  text: string
  replyTo?: string
}): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM_EMAIL

  if (!apiKey || !from) {
    return {
      ok: false,
      code: 'NOT_CONFIGURED',
      message: `現在、フォームからの送信を受け付けられません。${FALLBACK_CONTACT}`,
    }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[mail] 送信失敗', res.status, detail)
      return {
        ok: false,
        code: 'SEND_FAILED',
        message: `送信処理に失敗しました。${FALLBACK_CONTACT}`,
      }
    }

    return { ok: true }
  } catch (err) {
    console.error('[mail] 送信時に例外が発生', err)
    return {
      ok: false,
      code: 'SEND_FAILED',
      message: `送信処理に失敗しました。${FALLBACK_CONTACT}`,
    }
  }
}
