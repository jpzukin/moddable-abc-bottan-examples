# moddable-abc-bottan-examples
M5Stack Core2で無くなった３つの物理ボタンをエミュレートする実装例。

>
> 画面回転時の処理には未対応（調査中）
>

# 構成

## m5stack-core1-abc-button
M5Stack Core2より前の物理ボタンの状態を表示する実装例。

## m5stack-core2-legacy-abc-button
m5stack-core1-abc-buttonと同じ処理で、物理ボタンをエミュレートした実装例。

## m5stack-core2-abc-button
m5stack-core1-abc-buttonと同じ処理で、Piuフレームワークっぽくした実装例。

# 概要

M5Stack Core2では物理ボタンの代わりに、タッチパネルの領域が液晶の表示範囲外まで伸びていて、その領域でのタッチされた場合に、M5Stackライブラリで物理ボタンとしてエミュレートしています。

ModdableSDKのPiuフレームワークを利用する場合も、これと似たような処理が必要になります。

方法は、描画やタッチ処理を領域内に制限するクリップ処理を切ったコンテナ上に、領域外に配置したコンテンツでタッチイベントを受け取り、物理ボタンのイベントとして振り分けを行っています。

