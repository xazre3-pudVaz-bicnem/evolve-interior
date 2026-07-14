# 株式会社EVOLVE｜コーポレートサイト兼求人サイト

軽鉄・ボード工事を中心とした内装工事会社のサイト。
**工事の問い合わせ獲得**と**採用応募獲得**の2つを同時に達成することを目的としている。

- 本番想定ドメイン: `https://evolve-interior.com`
- 技術構成: Next.js 16（App Router）/ TypeScript / Tailwind CSS v4 / Vercel想定

---

## セットアップ

```bash
npm install
cp .env.example .env.local   # 値を入れる
npm run dev                  # http://localhost:3000
npm run build                # 本番ビルド
npx eslint .                 # 0 problems であること
```

---

## 連絡導線（LINE・電話・メール）

| 手段 | 用途 |
| --- | --- |
| **LINE** | 現場の写真をそのまま送れるため、この業種で最も使われる。採用の質問・応募にも有効 |
| 電話 | 080-2523-6928（受付 08:30〜18:30） |
| メール／フォーム | 下記 `mailto` 方式 |

LINEは次の場所に置いています。

ヘッダー / モバイル固定バー / モバイルメニュー / フッター / 共通CTA /
お問い合わせページ / 応募フォーム / 採用ページ /
**フォーム送信後のパネル**（メールソフトが開かない環境の受け皿）/ フォームのエラーパネル

> ⚠ **LINEボタンに白文字を使わないこと。**
> LINE緑 `#06C755` は白文字だと 2.26:1 しかなく読めません。
> 濃色文字（`ink-900`）を乗せて 8.4:1 にしています（`components/ui/LineButton.tsx`）。

URLを変更する場合は `lib/constants.ts` の `LINE_URL` を直すだけです。

---

## フォーム（設定不要）

**既定は `mailto` 方式**です。既存プロジェクト（染 YUI COLORS）と同じ方式で、
**サーバーの設定も外部サービスの契約も必要ありません。デプロイした時点で使えます。**

動き:

1. 訪問者がフォームを入力して送信ボタンを押す
2. 入力内容を読み込んだ状態で、訪問者のメールソフトが開く
3. 訪問者がそのまま送信 → `evolve.see0906@ymail.ne.jp` に届く

そのため、画面には「送信しました」とは書いていません。
実際に送るのは訪問者自身なので、**「メールソフトを開きました。内容を確認して送信してください」**
と表示しています。

メールソフトが開かない環境（メールソフト未設定のPCなど）に備えて、
完了画面には必ず次を用意しています。

- 送信先アドレス（クリックでメール作成）
- **入力内容をコピーするボタン**（コピーして手動で送れる）
- 電話番号（受付 08:30〜18:30）

### 本文の長さについて（注意）

日本語は1文字が `%XX%XX%XX`（9文字）に展開されるため、`mailto:` のURLは長くなりやすい。
一部のメールソフト（Outlook等）はURLが約2000文字を超えると本文を切り落とす。

標準的な問い合わせ（本文100文字程度）なら 1900〜2000文字に収まる。
それを超える長文が入力された場合は、完了画面に
**「本文が途中で切れる場合があります。切れていたらコピーをお使いください」**
という注意書きが自動で表示される（`lib/formMail.ts` の `MAILTO_SAFE_LENGTH`）。

> **`lib/formMail.ts` の本文に、全角スペースや区切り線などの装飾を入れないこと。**
> 見た目を揃えるための全角スペース1つが9文字ぶん膨らむため、
> それだけで数百文字ぶんURLが伸び、本文が切れる原因になる。

### サーバー送信に切り替えたい場合（任意）

「メールソフトを開かず、フォームから直接送信させたい」場合は、Resend を設定する。

1. [Resend](https://resend.com) でアカウント作成 → `evolve-interior.com` をDNS認証 → APIキー発行
2. `lib/constants.ts` の `FORM_MODE` を `'api'` に変更
3. 環境変数を設定（Vercelなら Project Settings → Environment Variables）

```
RESEND_API_KEY=re_xxxxxxxxxx
MAIL_FROM_EMAIL=noreply@evolve-interior.com
CONTACT_TO_EMAIL=evolve.see0906@ymail.ne.jp
RECRUIT_TO_EMAIL=evolve.see0906@ymail.ne.jp
```

送信処理は `app/api/contact/route.ts` / `app/api/apply/route.ts` に実装済み。
Resend以外を使う場合は `lib/mail.ts` の `sendMail()` の中だけを差し替えればよい。

> `FORM_MODE` を `'api'` にしたまま環境変数を設定しないと、フォームはエラーを返す。
> 届いていないのに「送信完了」と表示しないための仕様。

---

## 画像について

### ロゴ

支給された `design/logo.pdf` から生成している。

| ファイル | 用途 |
| --- | --- |
| `public/logo.png` | 通常のロゴ（白背景のヘッダー・フッター） |
| `public/logo-white.png` | 白抜きロゴ（ヒーロー上の透過ヘッダー用。緑のマークは残し、文字だけ白） |
| `public/logo-mark.svg` | マーク単体（稲妻）。`logo.pdf` をベクター化したもの |
| `app/icon.svg` | ファビコン |

差し替える場合は `public/logo.png` / `public/logo-white.png` を置き換えるだけでよい。

### 写真（置くだけ差し替え）

**`public/images/` に、下記のファイル名で画像を置いて再ビルドするだけ**で反映される。
ファイルが無い箇所は自動的に仮枠（`PhotoFrame`）が表示される。
判定は `lib/media.ts` がビルド時に行っている。

支給された写真は EXIF（GPS位置情報を含む）を除去したうえで配置済み。
元ファイルは `design/originals/` に保管してある（publicには置いていない）。

**現在、仮枠は1枚も残っていません（全スロット設置済み）。**

**設置済み**

| ファイル名 | 使われる場所 |
| --- | --- |
| `hero.jpg` | トップ ヒーロー（全画面） |
| `about.jpg` | トップ「EVOLVEについて」 |
| `strength-lgs.jpg` / `strength-finishing.jpg` / `strength-team.jpg` | トップ 強み①②③ |
| `customer.jpg` / `corporate.jpg` | 一般のお客様向け／法人向けパネル（※AI生成画像） |
| `recruit-staff-1.jpg` / `recruit-site.jpg` | トップ 採用セクション |
| `recruit-hero-1.jpg` / `recruit-hero-2.jpg` | 採用ページ ヒーロー |
| `company.jpg` | 会社概要 |
| `banner-services.jpg`（※AI生成）/ `banner-works.jpg` / `banner-company.jpg` / `banner-contact.jpg` / `banner-requirements.jpg` / `banner-day.jpg` | 各下層ページのバナー |
| `service-light-gauge-steel.jpg` ほか工事別9点 | 事業内容の各ページ |
| `day-morning.jpg` / `day-work.jpg` / `day-break.jpg`（※AI生成）/ `day-afternoon.jpg` / `day-end.jpg` | 一日の流れ |
| `instagram-1.jpg` 〜 `instagram-6.jpg` | Instagram欄 |
| `images/works/*.jpg` | 施工実績 |

> **AI生成画像について（計7点）**
>
> `customer.jpg` / `corporate.jpg` / `banner-services.jpg` /
> `service-kitchen-panel.jpg` / `service-wallpaper.jpg` / `service-painting.jpg` /
> `day-break.jpg` の7点はAIで生成された画像です。
>
> 実際のEVOLVEの現場・スタッフではないため、**「その工事の説明用イメージ」としてのみ**配置し、
> **施工実績（`/works`）には一切使っていません。** 施工実績はすべて支給された実写です。
> 実写に差し替える場合は、同じファイル名で上書きしてください（コード変更不要）。

> **altテキストについて**
>
> alt は「写真に実際に写っているもの」を書くこと。見出しから機械的に生成しない。
> 工事別は `lib/services.ts` の `imageAlt`、一日の流れは `lib/recruit.ts` の `alt` に持たせている。

---

## 施工実績（CMS不要）

`lib/works.ts` に7件を登録済み。すべて支給写真から確認できる内容のみを記載している。

**⚠ 施工場所・施工時期・対象区分は「写真から判断できない」ため、意図的に空にしてある。**
推測で「兵庫県尼崎市」「2026年5月」などと書いてはいけない。
確認できたら、各項目に追記するだけで画面に表示される。

```ts
{
  id: 'round-ceiling',
  title: '円形天井の軽鉄下地からボード・仕上げまで',
  type: '軽鉄工事・ボード工事・内装仕上げ',
  categories: ['light-gauge-steel', 'board', 'finishing'],
  description: '……',
  points: ['……'],
  photos: { before: '…', during: '…', after: '…' },

  // ↓ 確認できたら追記する（未記入なら画面に出ない）
  place: '兵庫県尼崎市',
  period: '2026年5月',
  target: '店舗',            // 一般住宅 / 店舗 / オフィス / 施設 / その他
}
```

新しい実績を追加する場合は、写真を `public/images/works/` に置いて配列に追加する。

---

## 採用条件が決まったら

`lib/recruit.ts` に集約されている。

### 募集要項

`REQUIREMENTS` 配列の `value` が `null` の項目は、画面上に
「詳細は面談時にご案内します」と自動表示される。
条件が決まったら `value` に文字列を入れるだけで反映される。

現在 `null`（＝未確定）: **雇用形態 / 給与 / 休日・休暇 / 待遇・福利厚生 / 選考の流れ**

### JobPosting 構造化データ（求人リッチリザルト）

給与・雇用形態などが未確定のため、**現在は意図的に出力していない**
（不完全な JobPosting は Google のガイドライン違反になるため）。

条件が確定したら `JOB_POSTING_DATA` を埋めると、`buildJobPostingSchema()` が
スキーマを返すようになる。あとは `app/recruit/page.tsx` の `<JsonLd>` に渡すだけ。

---

## 会社情報の変更

**`lib/constants.ts` の `COMPANY` が唯一の情報源。**
電話番号・メール・住所は全ページと構造化データがここを参照しているため、
ここを直せばサイト全体とJSON-LDが同時に更新される。
ページ側に直書きしないこと（表記ゆれの原因になる）。

---

## 演出（アニメーション）

すべて `prefers-reduced-motion` を尊重し、**JavaScriptが無効でも内容は必ず表示される**。

| 演出 | 実装 |
| --- | --- |
| ローディング画面 | `components/layout/Loader.tsx`。初回訪問のみ（sessionStorage）。約1.3秒で上へ切り上がって退場 |
| ヒーロー | 写真がゆっくり寄る（Ken Burns）＋ 文字が順に立ち上がる ＋ SCROLLインジケーター |
| ヘッダー | トップ最上部では透過（白抜きロゴ）、スクロールで白背景（通常ロゴ）へクロスフェード |
| スクロール表示 | `Reveal` コンポーネント。`anim` で `up` / `fade` / `left` / `right` / `zoom` / `clip`（幕がめくれる）を切り替え |
| 工事名の帯 | `Marquee`。CSSのみで横に流れる |
| 写真のホバー | `zoom-parent` クラスで軽く拡大 |

### 触るときの注意（実際に踏んだ不具合）

- **`.reveal` の初期状態 `opacity: 0` は `.js` が付いているときだけ適用すること。**
  無条件に効かせると、JS無効時に本文が永久に見えなくなる。
- **`clip` 演出で、監視対象の要素自体を `clip-path` で隠してはいけない。**
  完全にクリップされた要素は IntersectionObserver が「見えていない」と判断し、
  `.is-visible` が永久に付かず、写真が出てこなくなる（画像の遅延読み込みも走らない）。
  そのため「幕」（`::after`）だけを動かす実装にしてある。
- **`main` の `overflow-x` は `clip` にすること（`hidden` は不可）。**
  左右にずらすスクロール演出が画面幅をわずかに超えるため封じ込めが必要だが、
  `hidden` はスクロールコンテナを作ってしまい、中の `position: sticky` が効かなくなる。
- **ヘッダーには `backdrop-blur` が掛かっている。**
  `backdrop-filter` は `position: fixed` の包含ブロックを作るため、
  ヘッダー内に `fixed` 要素を置いてはいけない
  （モバイルメニューは `createPortal` で `<body>` 直下に出している）。

---

## ページ一覧（全20ページ）

`/` `/services`（+ 工事詳細9ページ）`/works` `/company` `/contact`
`/recruit` `/recruit/requirements` `/recruit/day` `/recruit/apply`
`/privacy` `/sitemap`

自動生成: `/sitemap.xml` `/robots.txt` `/opengraph-image` `/icon.svg` `/404`

---

## 設計上の約束（変更時の注意）

- **提供されていない情報は書かない。** 実績年数・施工件数・資格・保証・
  給与・休日・福利厚生・設立年・従業員数などは支給されていないため記載しない。
- **「業界最安」「地域No.1」「必ず」「最短」「無料」「アットホーム」等の
  根拠のない表現は使わない。**
- **「すべて自社施工」とは書かない。**
- 緑は要所のみ。文字色・ボタンの緑は `brand-700`（白文字とのコントラスト6.4:1）を使う。
  ロゴ色の `brand-500` は白文字だと3.2:1しかないため、図形・罫線専用。
- Googleマップの埋め込みは、住所と位置情報の一致が未確認のため保留中。
  現在は住所検索リンクのみ設置している。
- 営業曜日が不明なため、構造化データに営業時間は含めていない。
