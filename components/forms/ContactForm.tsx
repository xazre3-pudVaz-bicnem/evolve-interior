'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  TextField,
  TextAreaField,
  RadioField,
  SelectField,
  CheckboxGroupField,
  ConsentField,
  Honeypot,
} from './Fields'
import MailtoPanel from './MailtoPanel'
import LineButton from '@/components/ui/LineButton'
import {
  validateContact,
  hasErrors,
  focusFirstError,
  type ContactInput,
  type Errors,
} from '@/lib/validate'
import { buildContactMail, mailtoHref } from '@/lib/formMail'
import { COMPANY, FORM_MODE } from '@/lib/constants'
import { SERVICES } from '@/lib/services'

const WORK_OPTIONS = [...SERVICES.map((s) => s.name), 'その他'] as const
const TIMING_OPTIONS = [
  'できるだけ早く',
  '1ヶ月以内',
  '2〜3ヶ月以内',
  '3ヶ月より先',
  '未定・相談したい',
] as const
const DOCS_OPTIONS = ['図面がある', '写真がある', '図面・写真の両方がある', 'どちらもない'] as const
const ENTITY_OPTIONS = ['法人', '個人'] as const

type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error'

const EMPTY: ContactInput = {
  name: '',
  company: '',
  entityType: '',
  email: '',
  phone: '',
  site: '',
  works: [],
  message: '',
  timing: '',
  hasDocs: '',
  consent: false,
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY)
  const [errors, setErrors] = useState<Errors<ContactInput>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  // スパム対策：フォーム表示からの経過時間（ボットは即座に送信する）。
  // Date.now() はレンダー中に呼ばず、マウント後に記録する。
  const mountedAt = useRef<number | null>(null)
  const errorBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  const set = <K extends keyof ContactInput>(key: K, v: ContactInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }))
    setErrors((prev) => {
      const next = { ...prev, [key]: undefined }
      // 会社名の必須判定は「個人／法人」に連動する。
      // 法人→個人 に切り替えたとき、会社名のエラーが残ったままになるため一緒に消す。
      if (key === 'entityType' && v !== '法人') next.company = undefined
      return next
    })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError('')

    const found = validateContact(values)
    setErrors(found)

    if (hasErrors(found)) {
      // 最初のエラー項目へフォーカスを移す（スクロールだけでは不十分）
      focusFirstError()
      return
    }

    /* ── mailto方式（既定）：訪問者のメールソフトを開く ── */
    if (FORM_MODE === 'mailto') {
      const { subject, body } = buildContactMail(values)
      window.location.href = mailtoHref(subject, body)
      setStatus('mailto')
      // ここでは値を消さない（「内容をコピー」で使うため）
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    /* ── api方式：サーバーからメールを送る（Resendの設定が必要） ── */
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
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
        // 送信できていないのに成功表示は絶対にしない
        setStatus('error')
        setServerError(
          data?.error ??
            '送信に失敗しました。時間をおいて再度お試しいただくか、お電話・メールにてご連絡ください。',
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
    const { subject, body } = buildContactMail(values)
    return (
      <MailtoPanel
        title="メールソフトを開きました"
        subject={subject}
        body={body}
        backHref="/"
        backLabel="トップページへ戻る"
      />
    )
  }

  /* ── api方式：送信完了 ── */
  if (status === 'success') {
    return (
      <div
        role="status"
        className="border-l-4 border-brand-700 bg-brand-50 p-8 sm:p-10"
      >
        <h2 className="text-xl font-bold text-ink-900">
          お問い合わせを送信しました
        </h2>
        <p className="mt-4 text-[15px] leading-[1.95] text-ink-700">
          お問い合わせいただき、ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。
        </p>
        <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
          お急ぎの場合は、お電話でもご連絡いただけます（受付時間 {COMPANY.hours}）。
        </p>
        <a
          href={`tel:${COMPANY.phoneHref}`}
          className="mt-5 inline-block text-2xl font-bold text-ink-900 hover:text-brand-700"
        >
          {COMPANY.phone}
        </a>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-mist-300 bg-white px-6 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-8">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {status === 'error' && (
        <div
          ref={errorBoxRef}
          role="alert"
          className="border-l-4 border-red-600 bg-red-50 p-6"
        >
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

      <RadioField
        legend="個人・法人の別"
        name="entityType"
        value={values.entityType}
        onChange={(v) => set('entityType', v)}
        options={ENTITY_OPTIONS}
        error={errors.entityType}
        required
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          label="お名前"
          name="name"
          value={values.name}
          onChange={(v) => set('name', v)}
          error={errors.name}
          required
          autoComplete="name"
          placeholder="山田 太郎"
        />
        <TextField
          label="会社名または屋号"
          name="company"
          value={values.company}
          onChange={(v) => set('company', v)}
          error={errors.company}
          required={values.entityType === '法人'}
          autoComplete="organization"
          placeholder="株式会社〇〇"
          hint="個人のお客様は空欄で構いません。"
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
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
      </div>

      <TextField
        label="工事場所"
        name="site"
        value={values.site}
        onChange={(v) => set('site', v)}
        error={errors.site}
        required
        placeholder="兵庫県尼崎市〇〇"
        hint="市区町村までで構いません。"
      />

      <CheckboxGroupField
        legend="希望する工事（複数選択できます）"
        name="works"
        values={values.works}
        onChange={(v) => set('works', v)}
        options={WORK_OPTIONS}
        error={errors.works}
        required
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <SelectField
          label="希望時期"
          name="timing"
          value={values.timing}
          onChange={(v) => set('timing', v)}
          options={TIMING_OPTIONS}
          error={errors.timing}
        />
        <SelectField
          label="図面や写真の有無"
          name="hasDocs"
          value={values.hasDocs}
          onChange={(v) => set('hasDocs', v)}
          options={DOCS_OPTIONS}
          error={errors.hasDocs}
          hint="お持ちの場合、送信後にメールでお送りいただけます。"
        />
      </div>

      <TextAreaField
        label="お問い合わせ内容"
        name="message"
        value={values.message}
        onChange={(v) => set('message', v)}
        error={errors.message}
        required
        rows={7}
        placeholder="工事の内容、面積や範囲、現在の状況など、分かる範囲でお聞かせください。"
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
              {FORM_MODE === 'mailto' ? 'メールソフトで送信する' : 'この内容で送信する'}
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
              ／受付 {COMPANY.hours}）でも承っています。
            </>
          ) : (
            <>
              送信内容を確認のうえ、担当者よりご連絡いたします。お問い合わせの受付時間は {COMPANY.hours} です。
            </>
          )}
        </p>
      </div>
    </form>
  )
}
