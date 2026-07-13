/**
 * 構造化データ（JSON-LD）を出力する。
 *
 * JSON.stringify は "<" をエスケープしないため、
 * 文字列の中に "</script>" が含まれると script タグが途中で閉じてしまう。
 * 現状のデータはすべて自分たちで書いた静的な文字列だが、
 * 将来FAQなどに記号が入る可能性があるので、念のため無害化しておく。
 */
function safeJson(value: object): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(item) }}
        />
      ))}
    </>
  )
}
