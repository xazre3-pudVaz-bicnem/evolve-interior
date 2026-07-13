import { NextResponse } from 'next/server'
import { validateContact, hasErrors, type ContactInput } from '@/lib/validate'
import { sendMail, getContactRecipient } from '@/lib/mail'
import { checkRateLimit, getClientIp, looksLikeBot } from '@/lib/rateLimit'
import { SITE_NAME } from '@/lib/constants'

/** 工事のご相談フォームの受信 */
export async function POST(req: Request) {
  // 1. スパム・連投対策
  const ip = getClientIp(req)
  if (!checkRateLimit(`contact:${ip}`).ok) {
    return NextResponse.json(
      { ok: false, error: '送信回数が上限に達しました。しばらく時間をおいてからお試しください。' },
      { status: 429 },
    )
  }

  let body: Partial<ContactInput> & { 'website-url'?: string; elapsedMs?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: '不正なリクエストです。' }, { status: 400 })
  }

  // ボットは受信したふりをせず、明確に拒否する
  if (looksLikeBot(body)) {
    return NextResponse.json(
      { ok: false, error: '送信を受け付けられませんでした。' },
      { status: 400 },
    )
  }

  // 2. サーバー側バリデーション（クライアント側の検証は迂回できるため必須）
  const errors = validateContact(body)
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, error: '入力内容に不備があります。', fields: errors },
      { status: 400 },
    )
  }

  // 3. メール送信
  const works = Array.isArray(body.works) ? body.works.join('、') : ''

  const text = [
    `【${SITE_NAME} ウェブサイト】工事のご相談が届きました。`,
    '',
    `■ 個人／法人： ${body.entityType ?? ''}`,
    `■ お名前： ${body.name ?? ''}`,
    `■ 会社名・屋号： ${body.company || '（未記入）'}`,
    `■ メールアドレス： ${body.email ?? ''}`,
    `■ 電話番号： ${body.phone ?? ''}`,
    `■ 工事場所： ${body.site ?? ''}`,
    `■ 希望する工事： ${works}`,
    `■ 希望時期： ${body.timing || '（未選択）'}`,
    `■ 図面や写真の有無： ${body.hasDocs || '（未選択）'}`,
    '',
    '■ お問い合わせ内容：',
    body.message ?? '',
    '',
    '----------------------------------------',
    `送信元IP： ${ip}`,
  ].join('\n')

  const result = await sendMail({
    to: getContactRecipient(),
    subject: `【工事のご相談】${body.name ?? ''}様（${body.entityType ?? ''}）`,
    text,
    replyTo: body.email,
  })

  // 4. 送信できていない場合は、絶対に成功として返さない
  if (!result.ok) {
    console.error('[contact] 送信できませんでした', result.code)
    return NextResponse.json(
      { ok: false, error: result.message },
      { status: result.code === 'NOT_CONFIGURED' ? 503 : 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
