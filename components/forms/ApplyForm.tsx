'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  TextField,
  TextAreaField,
  RadioField,
  SelectField,
  ConsentField,
  Honeypot,
} from './Fields'
import MailtoPanel from './MailtoPanel'
import LineButton from '@/components/ui/LineButton'
import {
  validateApply,
  hasErrors,
  focusFirstError,
  type ApplyInput,
  type Errors,
} from '@/lib/validate'
import { buildApplyMail, mailtoHref } from '@/lib/formMail'
import { COMPANY, FORM_MODE } from '@/lib/constants'

/**
 * 希望する働き方。
 *
 * 給与・休日・待遇は募集要項に掲載済みだが、実際の条件のすり合わせは人によって
 * 異なるため、「相談したい」「詳細を聞きたい」といった柔軟な選択肢を残しておく。
 */
const WORK_STYLE_OPTIONS = [
  '正社員として長く働きたい',
  'まずは詳細を聞きたい',
  '働き方や条件について相談したい',
  'その他（下の欄に記入）',
] as const

const EXPERIENCE_OPTIONS = ['未経験', '経験あり'] as const
const CONTACT_METHOD_OPTIONS = ['電話', 'メール', 'どちらでも可'] as const

type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error'

const EMPTY: ApplyInput = {
  name: '',
  kana: '',
  age: '',
  phone: '',
  email: '',
  area: '',
  workStyle: '',
  experience: '',
  years: '',
  licenses: '',
  contactMethod: '',
  message: '',
  consent: false,
}

export default function ApplyForm() {
  const [values, setValues] = useState<ApplyInput>(EMPTY)
  const [errors, setErrors] = useState<Errors<ApplyInput>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  // スパム対策：フォーム表示からの経過時間。
  // Date.now() はレンダー中に呼ばず、マウント後に記録する。
  const mountedAt = useRef<number | null>(null)
  const errorBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  const set = <K extends keyof ApplyInput>(key: K, v: ApplyInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const found = validateApply(values)
    setErrors(found)

    if (hasErrors(found)) {
      // 最初のエラー項目へフォーカスを移す（スクロールだけでは不十分）
      focusFirstError()
      return
    }

    /* ── mailto方式（既定）：応募者のメールソフトを開く ── */
    if (FORM_MODE === 'mailto') {
      const { subject, body } = buildApplyMail(values)
      window.location.href = mailtoHref(subject, body)
      setStatus('mailto')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    /* ── api方式：サーバーからメールを送る（Resendの設定が必要） ── */
    setStatus('submitting')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          'website-url': honeypot,
          // マウント時刻が未記録なら送らない（サーバー側は数値のときだけ判定する）
          elapsedMs:
            mountedAt.current === null ? null : Date.now() - mountedAt.current,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data?.ok) {
        setStatus('error')
        setServerError(
          data?.error ??
            '送信に失敗しました。時間をおいて再度お試しいただくか、お電話にてご連絡ください。',
        )
        requestAnimationFrame(() =>
          errorBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        )
        return
      }

      setStatus('success')
      setValues(EMPTY)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
      setServerError(
        'ネットワークエラーが発生しました。通信環境をご確認のうえ、再度お試しください。',
      )
      requestAnimationFrame(() =>
        errorBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    }
  }

  /* ── mailto方式：メールソフトを開いたあと ── */
  if (status === 'mailto') {
    const { subject, body } = buildApplyMail(values)
    return (
      <MailtoPanel
        title="メールソフトを開きました"
        subject={subject}
        body={body}
        backHref="/recruit"
        backLabel="採用情報へ戻る"
      />
    )
  }

  /* ── api方式：送信完了 ── */
  if (status === 'success') {
    return (
      <div role="status" className="border-l-4 border-brand-700 bg-brand-50 p-8 sm:p-10">
        <h2 className="text-xl font-bold text-ink-900">ご応募を受け付けました</h2>
        <p className="mt-4 text-[15px] leading-[1.95] text-ink-700">
          ご応募いただき、ありがとうございます。内容を確認のうえ、ご希望の連絡方法でご連絡いたします。
        </p>
        <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
          お急ぎの場合や、先に質問したいことがある場合は、お電話でもご連絡いただけます（受付時間 {COMPANY.hours}）。
        </p>
        <a
          href={`tel:${COMPANY.phoneHref}`}
          className="mt-5 inline-block text-2xl font-bold text-ink-900 hover:text-brand-700"
        >
          {COMPANY.phone}
        </a>
        <div className="mt-8">
          <Link
            href="/recruit"
            className="inline-flex items-center gap-2 border border-mist-300 bg-white px-6 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900"
          >
            採用情報へ戻る
          </Link>
        </div>
      </div>
    )
  }

  const submitting = status === 'submitting'
  const isExperienced = values.experience === '経験あり'

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-8">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {status === 'error' && (
        <div ref={errorBoxRef} role="alert" className="border-l-4 border-red-600 bg-red-50 p-6">
          <p className="font-bold text-red-800">送信できませんでした</p>
          <p className="mt-2 text-[14px] leading-relaxed text-red-800">{serverError}</p>
          <div className="mt-4 flex flex-col gap-1 text-[14px] text-ink-700">
            <a href={`tel:${COMPANY.phoneHref}`} className="font-bold hover:text-brand-700">
              お電話：{COMPANY.phone}（受付 {COMPANY.hours}）
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="break-all underline underline-offset-4 hover:text-brand-700"
            >
              メール：{COMPANY.email}
            </a>
          </div>

          {/* 送信できなかったときの受け皿としてLINEを出す */}
          <LineButton variant="outline" className="mt-5 w-full sm:w-auto">
            LINEで送る
          </LineButton>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          label="氏名"
          name="name"
          value={values.name}
          onChange={(v) => set('name', v)}
          error={errors.name}
          required
          autoComplete="name"
          placeholder="山田 太郎"
        />
        <TextField
          label="ふりがな"
          name="kana"
          value={values.kana}
          onChange={(v) => set('kana', v)}
          error={errors.kana}
          required
          placeholder="やまだ たろう"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          label="年齢"
          name="age"
          type="number"
          inputMode="numeric"
          value={values.age}
          onChange={(v) => set('age', v)}
          error={errors.age}
          required
          placeholder="25"
        />
        <TextField
          label="居住エリア"
          name="area"
          value={values.area}
          onChange={(v) => set('area', v)}
          error={errors.area}
          required
          placeholder="兵庫県尼崎市"
          hint="市区町村までで構いません。"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          label="電話番号"
          name="phone"
          type="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(v) => set('phone', v)}
          error={errors.phone}
          required
          autoComplete="tel"
          placeholder="080-1234-5678"
        />
        <TextField
          label="メールアドレス"
          name="email"
          type="email"
          inputMode="email"
          value={values.email}
          onChange={(v) => set('email', v)}
          error={errors.email}
          required
          autoComplete="email"
          placeholder="example@example.com"
        />
      </div>

      <RadioField
        legend="内装工事の経験"
        name="experience"
        value={values.experience}
        onChange={(v) => set('experience', v)}
        options={EXPERIENCE_OPTIONS}
        error={errors.experience}
        required
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          label="経験年数"
          name="years"
          value={values.years}
          onChange={(v) => set('years', v)}
          error={errors.years}
          placeholder="例：3年"
          hint={
            isExperienced
              ? 'おおよそで構いません。'
              : '未経験の方は空欄で構いません。'
          }
        />
        <TextField
          label="保有資格"
          name="licenses"
          value={values.licenses}
          onChange={(v) => set('licenses', v)}
          error={errors.licenses}
          placeholder="例：普通自動車運転免許"
          hint="お持ちでない場合は空欄で構いません。"
        />
      </div>

      <RadioField
        legend="希望する働き方"
        name="workStyle"
        value={values.workStyle}
        onChange={(v) => set('workStyle', v)}
        options={WORK_STYLE_OPTIONS}
        error={errors.workStyle}
        required
        hint="働き方や条件については、面談の際にすり合わせさせてください。現時点で決まっていなくても構いません。"
      />

      <SelectField
        label="希望する連絡方法"
        name="contactMethod"
        value={values.contactMethod}
        onChange={(v) => set('contactMethod', v)}
        options={CONTACT_METHOD_OPTIONS}
        error={errors.contactMethod}
        required
      />

      <TextAreaField
        label="応募理由・ご質問"
        name="message"
        value={values.message}
        onChange={(v) => set('message', v)}
        error={errors.message}
        rows={6}
        placeholder="志望のきっかけや、仕事内容・働き方について聞いてみたいことがあれば、ご記入ください。質問だけでも構いません。"
      />

      <ConsentField
        checked={values.consent}
        onChange={(v) => set('consent', v)}
        error={errors.consent}
      />

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2.5 bg-brand-700 px-10 py-5 text-[15px] font-medium text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-hidden="true"
              />
              送信中...
            </>
          ) : (
            <>
              {FORM_MODE === 'mailto' ? 'メールソフトで応募する' : 'この内容で応募する'}
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>

        <p className="mt-4 text-[12.5px] leading-relaxed text-ink-500">
          {FORM_MODE === 'mailto' ? (
            <>
              ボタンを押すと、入力内容を読み込んだ状態でメールソフトが開きます。内容をご確認のうえ、そのまま送信してください。
              <br />
              お電話（
              <a href={`tel:${COMPANY.phoneHref}`} className="font-medium text-ink-700 underline underline-offset-2">
                {COMPANY.phone}
              </a>
              ／受付 {COMPANY.hours}）でも承っています。ご記入いただいた内容は採用選考のみに使用します。
            </>
          ) : (
            <>
              ご記入いただいた内容は採用選考のみに使用します。お問い合わせの受付時間は {COMPANY.hours} です。
            </>
          )}
        </p>
      </div>
    </form>
  )
}
