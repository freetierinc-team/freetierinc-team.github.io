# freetierinc-team.github.io

組織 freetierinc-team の GitHub Pages トップ（https://freetierinc-team.github.io/）です。
画像ツール群の入口ページ（`index.html`）と、各ツール共通のナビゲーション（`nav.js`）を置いています。

## ツールを追加する手順

1. `nav.js` 冒頭の `SITE_TOOLS_DEF` 配列に1件追加する（`name` / `path` / `desc`）。トップページのカードとナビ両方に反映されます。
   `path` は `/リポジトリ名/` の形式（現在ページ強調は先頭セグメントで判定）。
2. 新しいツールの `index.html` の `</body>` 直前に次の1行を追加する。

```html
<script src="https://freetierinc-team.github.io/nav.js"></script>
```

ナビは高さ固定（CSS変数 `--ftn-h`、既定44px）。全画面レイアウトのツールは `calc(100vh - var(--ftn-h, 0px))` で高さを計算してください。
