UF scss framework はユーティリティファーストな css フレームワークです。  
Javascript には依存していないため、sass コンパイルだけで利用することが可能です。

# ユーティリティの構成

utility ディレクトリ内部で配列によって各スタイルを定義しています。

## 基本形

`$utilities` という名前の配列直下に分かりやすいキー名で配列を作成し、最後に `utilityMap()` mixin に配列の情報を渡してあげます。

```scss
$utilities: (
  layout: (
    〜,
  ),
);

//@include utilityMap($utilities, "layout");
```

# ユーティリティクラスの作成

上記の配列の中に作成したい class を定義していきます。

## 最小要素

最低限必要な要素としては以下のような形になります。
ただし、`values`と`increment`はどちらか片方のみあれば問題ありません。

```scss
$utilities: (
  配列名: (
    クラス名プレフィックス: (
      property: プロパティ名,
      values: (
        クラス名サフィックス: 値,
      ),
      increment: (
        min: 最小値(数値),
        max: 最大値(数値),
        step: カウントアップ量(数値),
      ),
    ),
  ),
);
//@include utilityMap($utilities, "配列名");
```

例えば、

```css
.d-b {
  display: block;
}
.d-n {
  display: none;
}
```

というユーティリティクラスを作成したい場合は以下のように実現できます。

```scss
$utilities: (
  layout: (
    d: (
      property: display,
      values: (
        b: block,
        n: none,
      ),
    ),
  ),
);

//@include utilityMap($utilities, "layout");
```

クラス名はそれぞれハイフン(-)で接続されて css 出力されます。

また、数値による連番のクラスを作成する場合は以下のように書きます。

```scss
$utilities: (
  layout: (
    zi: (
      property: z-index,
      increment: (
        min: 0,
        max: 3,
        step: 1,
      ),
    ),
  ),
);

//@include utilityMap($utilities, "layout");
```

上記をコンパイルすると、

```css
.zi-0 {
  z-index: 0;
}
.zi-1 {
  z-index: 1;
}
.zi-2 {
  z-index: 2;
}
.zi-3 {
  z-index: 3;
}
```

このように出力されます。

## オプション要素

柔軟なユーティリティクラスを生成するために、いくつかのオプションを用意しています。

### values オプション

---

#### ■ 複数プロパティを指定する場合

1 つのユーティリティクラス内に複数プロパティを設定する場合、property キーに追加したいプロパティを追加し、同じ数だけ values のクラス名サフィックスの値として追加します。

```scss
pos-x: (
  property: (
    left,
    right,
    margin,
  ),
  values: (
    a: (
      0,
      0,
      auto,
    ),
  )
);
```

上記のコードは以下のように css 出力されます。

```css
.pos-x-a {
  left: 0;
  right: 0;
  margin: auto;
}
```

#### ■ css の値が複数ある場合

例えば以下のような css 値の場合は、値を（）で囲む必要があります。

```css
.tf-o-t-r {
  transform-origin: top right;
}
```

scss では値が半角で分かれていると配列として認識されるためです。

```scss
tf-o: (
  property: transform-origin,
  values: (
    c: center,
    t: top,
    t-r: (
      top right,
    ),
  )
);
```

### increment オプション

---
