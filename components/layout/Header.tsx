import Logo from '@/components/ui/Logo'
import HeaderShell from './HeaderShell'

/**
 * ヘッダー（サーバーコンポーネント）。
 *
 * ロゴは public/ のファイルの有無をビルド時に判定する必要があるため
 * サーバー側で描画し、透過／白背景の切り替えを行う HeaderShell（クライアント）へ渡す。
 */
export default function Header() {
  return (
    <HeaderShell
      logoLight={<Logo tone="light" priority />}
      logoDark={<Logo tone="dark" priority />}
    />
  )
}
