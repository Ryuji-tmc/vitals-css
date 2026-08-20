# vitals.css

CSSのみ・依存ゼロの軽量モーションライブラリ、兼デザイン実験のギャラリー。

会社で「BIやKPIの表示をもっと派手にできない?」と言われたことがきっかけで生まれた。
汎用アニメーションライブラリ(GSAP, Framer Motion, anime.js等)は既に強い競合が多いため、
**「KPI/BIダッシュボードの見せ方」という一点に絞った**コアライブラリと、そこから派生した
ロゴ・ブランドモーションの実験(`logo/`)を1つのリポジトリにまとめている。

**→ ギャラリーは [`index.html`](index.html) を開くと一覧できる。**
(ローカルでは `python3 -m http.server` 等で配信して閲覧する。GitHub Pagesを有効にすれば
そのまま公開ポートフォリオとして使える。)

## 特徴

- **CSSのみで動く。** JSは数値カウントアップ・表示検知(IntersectionObserver)・並び替え(FLIP)
  など「CSSだけでは不可能な部分」のみを担当する薄いオプション層(`vitals.js`, 約80行)。
- **依存ゼロ。** npm installも不要。`vitals.css`(1ファイル)をコピーするだけで導入できる。
- **監査5分。** 社内で使う前にセキュリティレビューが必要でも、コード量が少なく外部通信も
  一切ないため、読み切るのに5分もかからない。
- **`prefers-reduced-motion` 対応。** アクセシビリティ設定を尊重し、アニメーションを自動で止める。

## 収録コンポーネント

| クラス | 用途 |
|---|---|
| `.vt-counter` | 数値カウントアップ(更新時にほのかな発光) |
| `.vt-gauge` | ドーナツ型の達成率ゲージ |
| `.vt-bar-grow` | 棒グラフの生成アニメーション |
| `.vt-sparkline` | SVGスパークラインの描画アニメーション |
| `.vt-trend` | 上昇/下降トレンド矢印 |
| `.vt-alert` | しきい値超過時のアラートリング |
| `[data-vt-stagger]` | カード群のスクロール連動・段階表示 |
| `.vt-heat-cell` | ヒートマップセルの更新パルス |
| `.vt-rank-row` | ランキング並び替え時のスムーズな移動(FLIP) |
| `.vt-live-dot` | リアルタイム更新中を示すライブドット |

## 使い方

```html
<link rel="stylesheet" href="vitals.css">
<script src="vitals.js"></script>

<div class="big-number vt-counter" id="sales">0</div>
<script>
  Vitals.animateCounter(document.getElementById('sales'), { to: 4820000 });
</script>
```

デモ一式は `demo/index.html` を参照。

## ディレクトリ構成

```
vitals-css/
├── index.html        # ギャラリー(ポートフォリオ)トップページ
├── vitals.css/.js     # コアライブラリ本体
├── demo/              # vitals.cssのKPI/BIダッシュボードデモ
├── logo/              # ロゴ・ブランドモーションの実験一式
└── fonts/             # 埋め込み用に同梱しているサブセットフォント(OFL)
```

## 使われている再利用可能なテクニック

`logo/` 以下の各ファイルで使っている技法は、単体でも他のプロジェクトに転用しやすい:

- **SVGの手書き風描画**: `pathLength="100"` + `stroke-dasharray/dashoffset` で
  JS不要のドローインアニメーションを作る(`logo/index.html`)。
- **手書き"定着"アニメーション**: `filter:blur()` + `transform:translate/rotate` を
  数ステップのキーフレームで揺らしてから収束させると、手書きが定まる質感になる。
- **アウトライン→塗りつぶし**: `paint-order: stroke fill` で白地+黒枠の文字を作り、
  `fill` プロパティを直接キーフレームでアニメーションさせるだけで色が付く
  (`stroke-dashoffset`によるパスモーフィングより遥かに軽量・堅牢)。
- **ネオン管グロー**: `text-shadow` を3〜4層重ねるだけで発光文字になる(`logo/neon-factory-flow.html`)。
- **収束パースグリッド**: CSSの`transform: rotateX()`は歪みやすいので、
  消失点座標を明示計算したSVGの`<line>`で描く方が確実(`logo/neon-factory-flow.html`)。
- **本物のフォントを`@font-face` + data URIで埋め込む**: 外部CDNに頼らず、
  `fonttools`でサブセット化してから埋め込むと数十KBに収まる。

## 実行環境

- コンソールエラーなし、`prefers-reduced-motion` 対応済み。
- アイコンは [Lucide](https://lucide.dev)(ISC License)を使用。
- フォントは Google Fonts(すべてOFLライセンス)からサブセット取得して同梱。

## License

MIT License. 詳細は [`LICENSE`](LICENSE) を参照。
