'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COMPANY } from '@/lib/constants'
import { isMailtoTooLong } from '@/lib/formMail'
import PhoneIcon from '@/components/ui/PhoneIcon'
import LineButton from '@/components/ui/LineButton'

type Props = {
  /** 見出し（例: メールソフトを開きました） */
  title: string
  /** 送信内容（コピー用・確認用） */
  subject: string
  body: string
  /** 戻り先 */
  backHref: string
  backLabel: string
}

/**
 * mailto: 方式で送信したあとに表示するパネル。
 *
 * ■ 重要
 * mailto: は「メールソフトを開く」だけで、送信そのものは訪問者が行う。
 * したがって「送信完了しました」とは書かない。
 *
 * また、次の場合は mailto: が機能しないことがある。
 *   ・パソコンにメールソフトが設定されていない
 *   ・日本語の本文が長く、メールソフト側でURLが途中で切れる
 * そのため、内容をコピーして手動で送れる手段を必ず併記する。
 */
export default function MailtoPanel({ title, subject, body, backHref, backLabel }: Props) {
  const [copied, setCopied] = useState(false)

  const fullText = `件名: ${subject}\n\n${body}`
  // 本文が長いと、メールソフト側で途中が切り落とされることがある
  const mayBeTruncated = isMailtoTooLong(subject, body)

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      // クリップボードが使えない環境では、下のテキスト欄から手動でコピーしてもらう
      setCopied(false)
    }
  }

  return (
    <div role="status" className="border-l-4 border-brand-700 bg-brand-50 p-8 sm:p-10">
      <h2 className="text-xl font-bold text-ink-900">{title}</h2>

      <p className="mt-4 text-[15px] leading-[1.95] text-ink-700">
        ご入力いただいた内容を、メールソフトに読み込みました。
        <br />
        <strong className="font-bold">内容をご確認のうえ、そのまま送信してください。</strong>
      </p>
      <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
        メールが送信されるまでは、こちらに届きません。ご注意ください。
      </p>

      {mayBeTruncated && (
        <p className="mt-4 border-l-2 border-ink-900 bg-white p-4 text-[13.5px] leading-[1.9] text-ink-700">
          入力いただいた内容が長いため、お使いのメールソフトによっては
          <strong className="font-bold">本文が途中で切れる場合があります。</strong>
          開いたメールの本文が最後まで入っているかご確認ください。切れていた場合は、下の「入力内容をコピーする」をお使いください。
        </p>
      )}

      {/* メールソフトが開かない場合の手段 */}
      <div className="mt-8 border-t border-brand-200 pt-8">
        <h3 className="text-[15px] font-bold text-ink-900">
          メールソフトが開かない場合
        </h3>
        <p className="mt-3 text-[14px] leading-[1.95] text-ink-600">
          お使いの環境によっては、メールソフトが開かないことがあります。
          <strong className="font-bold">LINEでも同じ内容を受け付けています。</strong>
          そのままLINEでご連絡いただくのが確実です。
        </p>

        {/* メールソフトが無い環境ではここが唯一の受け皿になるので、目立たせる */}
        <LineButton variant="filled" className="mt-5 w-full sm:w-auto">
          LINEで送る
        </LineButton>

        <p className="mt-6 text-[14px] leading-[1.95] text-ink-600">
          メールで送る場合は、下のボタンで内容をコピーして、次のアドレス宛にお送りください。
        </p>

        <a
          href={`mailto:${COMPANY.email}`}
          className="mt-4 inline-block break-all text-[15px] font-bold text-ink-900 underline decoration-brand-300 underline-offset-4 hover:text-brand-700"
        >
          {COMPANY.email}
        </a>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 border border-ink-900 bg-white px-6 py-3 text-[14px] font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
          >
            {copied ? 'コピーしました' : '入力内容をコピーする'}
          </button>

          <a
            href={`tel:${COMPANY.phoneHref}`}
            className="inline-flex items-center gap-2 text-[14px] font-bold text-ink-900 hover:text-brand-700"
          >
            <PhoneIcon className="h-[18px] w-[18px] text-brand-700" />
            {COMPANY.phone}
            <span className="font-normal text-ink-500">（受付 {COMPANY.hours}）</span>
          </a>
        </div>

        <details className="mt-5">
          <summary className="cursor-pointer text-[13px] text-ink-600 underline underline-offset-4">
            入力内容を表示する
          </summary>
          <textarea
            readOnly
            value={fullText}
            rows={12}
            aria-label="入力内容"
            className="mt-3 w-full resize-y border border-mist-300 bg-white p-4 font-mono text-[12.5px] leading-relaxed text-ink-700"
          />
        </details>
      </div>

      <div className="mt-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 border border-mist-300 bg-white px-6 py-3.5 text-sm font-medium text-ink-900 transition-colors hover:border-ink-900"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  )
}
