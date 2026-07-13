import { NextResponse } from 'next/server'
import { validateApply, hasErrors, type ApplyInput } from '@/lib/validate'
import { sendMail, getRecruitRecipient } from '@/lib/mail'
import { checkRateLimit, getClientIp, looksLikeBot } from '@/lib/rateLimit'
import { SITE_NAME } from '@/lib/constants'

/** 採用応募フォームの受信（工事のご相談とは送信先・件名・項目を明確に分ける） */
export async function POST(req: Request) {
  const ip = getClientIp(req)
  if (!checkRateLimit(`apply:${ip}`).ok) {
    return NextResponse.json(
      { ok: false, error: '送信回数が上限に達しました。しばらく時間をおいてからお試しください。' },
      { status: 429 },
    )
  }

  let body: Partial<ApplyInput> & { 'website-url'?: string; elapsedMs?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: '不正なリクエストです。' }, { status: 400 })
  }

  if (looksLikeBot(body)) {
    return NextResponse.json(
      { ok: false, error: '送信を受け付けられませんでした。' },
      { status: 400 },
    )
  }

  const errors = validateApply(body)
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, error: '入力内容に不備があります。', fields: errors },
      { status: 400 },
    )
  }

  const text = [
    `【${SITE_NAME} ウェブサイト】採用応募が届きました。`,
    '',
    `■ 氏名： ${body.name ?? ''}`,
    `■ ふりがな： ${body.kana ?? ''}`,
    `■ 年齢： ${body.age ?? ''}`,
    `■ 居住エリア： ${body.area ?? ''}`,
    `■ 電話番号： ${body.phone ?? ''}`,
    `■ メールアドレス： ${body.email ?? ''}`,
    `■ 希望する連絡方法： ${body.contactMethod ?? ''}`,
    '',
    `■ 内装工事の経験： ${body.experience ?? ''}`,
    `■ 経験年数： ${body.years || '（未記入）'}`,
    `■ 保有資格： ${body.licenses || '（未記入）'}`,
    `■ 希望する働き方： ${body.workStyle ?? ''}`,
    '',
    '■ 応募理由・ご質問：',
    body.message || '（未記入）',
    '',
    '----------------------------------------',
    `送信元IP： ${ip}`,
  ].join('\n')

  const result = await sendMail({
    to: getRecruitRecipient(),
    subject: `【採用応募】${body.name ?? ''}様（${body.experience ?? ''}）`,
    text,
    replyTo: body.email,
  })

  if (!result.ok) {
    console.error('[apply] 送信できませんでした', result.code)
    return NextResponse.json(
      { ok: false, error: result.message },
      { status: result.code === 'NOT_CONFIGURED' ? 503 : 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
