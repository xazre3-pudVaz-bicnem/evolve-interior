import Reveal from './Reveal'

type Step = {
  readonly title: string
  readonly body: string
}

type Props = {
  steps: readonly Step[]
  /** ラベル（STEP / 工程 など） */
  label?: string
  className?: string
}

/**
 * 工程・流れの表示。
 * 縦のラインに沿って番号を並べる。カードは使わない。
 */
export default function ProcessSteps({ steps, label = 'STEP', className = '' }: Props) {
  return (
    <ol className={`relative ${className}`}>
      {/* 縦のライン */}
      <div
        className="absolute left-[19px] top-2 bottom-2 w-px bg-mist-200 sm:left-[27px]"
        aria-hidden="true"
      />

      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 60} className="relative flex gap-5 pb-9 last:pb-0 sm:gap-7">
          {/* 番号 */}
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-ink-900 sm:h-14 sm:w-14">
            <span className="font-display text-sm font-bold text-white sm:text-lg">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="absolute -bottom-1 -right-1 h-2 w-2 bg-brand-500"
              aria-hidden="true"
            />
          </div>

          <div className="flex-1 pt-1 sm:pt-2">
            <p className="text-[10px] font-medium tracking-[0.2em] text-brand-700">
              {label} {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-base font-bold text-ink-900 sm:text-lg">{step.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.9] text-ink-600">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
