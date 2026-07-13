'use client'

import { useId } from 'react'

/* ──────────────── 共通パーツ ──────────────── */

const FIELD_BASE =
  // ・枠線は入力欄を識別する唯一の手がかりなので、3:1 以上が必要（WCAG 1.4.11）。
  //   mist-300 は白背景で 1.36:1 しかないため ink-400（3.2:1）を使う。
  // ・プレースホルダも文字なので 4.5:1 を満たす ink-500 を使う。
  'w-full border border-ink-400 bg-white px-4 py-3.5 text-ink-900 placeholder:text-ink-500 transition-colors focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600'

/**
 * 選択肢のチップ（ラジオ／チェックボックス）。
 *
 * ラジオの input は sr-only（画面から隠す）なので、
 * そのままだとキーボードでフォーカスしても何も見えない。
 * has-[:focus-visible] でチップ自体にフォーカスリングを出す。
 */
const CHIP_BASE =
  'cursor-pointer border transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-700 has-[:focus-visible]:ring-offset-2'
const CHIP_ON = 'border-brand-700 bg-brand-50 font-medium text-brand-800'
const CHIP_OFF = 'border-ink-400 bg-white text-ink-700 hover:border-ink-900'

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium text-ink-900">
      {children}
      {required ? (
        <span className="bg-brand-700 px-1.5 py-0.5 text-[10px] font-medium text-white">必須</span>
      ) : (
        <span className="border border-mist-300 px-1.5 py-0.5 text-[10px] text-ink-500">任意</span>
      )}
    </label>
  )
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-[13px] font-medium text-red-700">
      {message}
    </p>
  )
}

function Hint({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null
  return (
    <p id={id} className="mt-2 text-[12.5px] leading-relaxed text-ink-500">
      {children}
    </p>
  )
}

/* ──────────────── テキスト入力 ──────────────── */

type TextFieldProps = {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'number'
  placeholder?: string
  hint?: React.ReactNode
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
}

export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = 'text',
  placeholder,
  hint,
  autoComplete,
  inputMode,
}: TextFieldProps) {
  const id = useId()
  const errId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={`${error ? errId : ''} ${hint ? hintId : ''}`.trim() || undefined}
        className={`mt-2.5 ${FIELD_BASE}`}
      />
      <Hint id={hintId}>{hint}</Hint>
      <ErrorText id={errId} message={error} />
    </div>
  )
}

/* ──────────────── テキストエリア ──────────────── */

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  hint,
  rows = 6,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  hint?: React.ReactNode
  rows?: number
}) {
  const id = useId()
  const errId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={`${error ? errId : ''} ${hint ? hintId : ''}`.trim() || undefined}
        className={`mt-2.5 resize-y ${FIELD_BASE}`}
      />
      <Hint id={hintId}>{hint}</Hint>
      <ErrorText id={errId} message={error} />
    </div>
  )
}

/* ──────────────── セレクト ──────────────── */

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  hint,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  error?: string
  required?: boolean
  hint?: React.ReactNode
}) {
  const id = useId()
  const errId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={`${error ? errId : ''} ${hint ? hintId : ''}`.trim() || undefined}
        className={`mt-2.5 ${FIELD_BASE}`}
      >
        <option value="">選択してください</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Hint id={hintId}>{hint}</Hint>
      <ErrorText id={errId} message={error} />
    </div>
  )
}

/* ──────────────── ラジオ ──────────────── */

export function RadioField({
  legend,
  name,
  value,
  onChange,
  options,
  error,
  required,
  hint,
}: {
  legend: string
  name: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  error?: string
  required?: boolean
  hint?: React.ReactNode
}) {
  const id = useId()
  const errId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    // role="radiogroup" にする。<fieldset> の既定ロール group は
    // aria-invalid をサポートしておらず、エラー状態が支援技術に伝わらない。
    <fieldset
      role="radiogroup"
      aria-describedby={`${error ? errId : ''} ${hint ? hintId : ''}`.trim() || undefined}
      aria-invalid={Boolean(error)}
    >
      <legend className="flex items-center gap-2 text-sm font-medium text-ink-900">
        {legend}
        {required ? (
          <span className="bg-brand-700 px-1.5 py-0.5 text-[10px] font-medium text-white">必須</span>
        ) : (
          <span className="border border-ink-400 px-1.5 py-0.5 text-[10px] text-ink-500">任意</span>
        )}
      </legend>

      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((o) => {
          const checked = value === o
          return (
            <label
              key={o}
              className={`${CHIP_BASE} px-4 py-3 text-[14px] ${checked ? CHIP_ON : CHIP_OFF}`}
            >
              <input
                type="radio"
                name={name}
                value={o}
                checked={checked}
                onChange={() => onChange(o)}
                className="sr-only"
              />
              {o}
            </label>
          )
        })}
      </div>

      <Hint id={hintId}>{hint}</Hint>
      <ErrorText id={errId} message={error} />
    </fieldset>
  )
}

/* ──────────────── チェックボックス（複数選択） ──────────────── */

export function CheckboxGroupField({
  legend,
  name,
  values,
  onChange,
  options,
  error,
  required,
  hint,
}: {
  legend: string
  name: string
  values: string[]
  onChange: (v: string[]) => void
  options: readonly string[]
  error?: string
  required?: boolean
  hint?: React.ReactNode
}) {
  const id = useId()
  const errId = `${id}-error`
  const hintId = `${id}-hint`

  const toggle = (o: string) => {
    onChange(values.includes(o) ? values.filter((v) => v !== o) : [...values, o])
  }

  return (
    // <fieldset> の既定ロール group は aria-invalid をサポートしないため、
    // グループではなく各チェックボックスに aria-invalid を付ける。
    <fieldset
      aria-describedby={`${error ? errId : ''} ${hint ? hintId : ''}`.trim() || undefined}
    >
      <legend className="flex items-center gap-2 text-sm font-medium text-ink-900">
        {legend}
        {required ? (
          <span className="bg-brand-700 px-1.5 py-0.5 text-[10px] font-medium text-white">必須</span>
        ) : (
          <span className="border border-ink-400 px-1.5 py-0.5 text-[10px] text-ink-500">任意</span>
        )}
      </legend>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {options.map((o) => {
          const checked = values.includes(o)
          return (
            <label
              key={o}
              className={`flex items-center gap-3 ${CHIP_BASE} px-4 py-3 text-[14px] ${
                checked ? CHIP_ON : CHIP_OFF
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={o}
                checked={checked}
                onChange={() => toggle(o)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errId : undefined}
                className="h-4 w-4 shrink-0 accent-[#0b6e3a]"
              />
              {o}
            </label>
          )
        })}
      </div>

      <Hint id={hintId}>{hint}</Hint>
      <ErrorText id={errId} message={error} />
    </fieldset>
  )
}

/* ──────────────── 同意チェック ──────────────── */

export function ConsentField({
  checked,
  onChange,
  error,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  error?: string
}) {
  const id = useId()
  const errId = `${id}-error`

  return (
    <div className="border border-mist-200 bg-mist-50 p-5">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#0b6e3a]"
        />
        <span className="text-[13.5px] leading-relaxed text-ink-700">
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-4"
          >
            個人情報保護方針
          </a>
          に同意します。
        </span>
      </label>
      <ErrorText id={errId} message={error} />
    </div>
  )
}

/* ──────────────── ハニーポット（スパム対策） ──────────────── */

/**
 * 人間には見えず、ボットだけが入力してしまう罠のフィールド。
 * ここに値が入っていたらサーバー側で送信を破棄する。
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-url">この項目は入力しないでください</label>
      <input
        id="website-url"
        name="website-url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
