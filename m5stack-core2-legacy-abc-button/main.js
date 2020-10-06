import { } from "piu/MC";
import { WithLegacyABCButton } from "withLegacyABCButton";

//
//  メインコンテンツの準備
//
const FONTS = {
	MESSAGE: "OpenSans-Semibold-28"
};

const simpleButton = new Label(null, {
	left: 20, right: 20, height: 60,
	active: true,
	skin: new Skin({
		fill: "#35a16b",
		stroke: "#eeeeee",
		borders: { left: 2, top: 2, right: 2, bottom: 2 },
	}),
	style: new Style({
		font: FONTS.MESSAGE,
		color: "#eeeeee"
	}),
	string: "Touch me",
	Behavior: class extends Behavior {
		onTouchBegan(content, id, x, y) {
			content.string = "Good!";
		}
		onTouchEnded(content, id, x, y) {
			content.string = "Touch me";
		}
	}
});

const mainContainer = new Container(null, {
	left: 10, right: 10, top: 10, bottom: 10,
	skin: new Skin({ fill: "#222222" }),
});

const application = new Application();
const withLegacyABCButton = new WithLegacyABCButton();

//
// コンテンツの組合せ
// application
//      |
//      +-- withLegacyABCButton (<=ここへ一層追加)
//				|
//				+-- mainContainer
//						|
//						+-- simpleButton
mainContainer.add(simpleButton);
// ※ 負の値を打ち消すために内部コンテナに追加する。
withLegacyABCButton.first.add(mainContainer);
application.add(withLegacyABCButton);

//
// ABCボタンのイベントハンドラ
//
global.button.a.onChanged = function () {
	if (!this.read()) {
		simpleButton.string = "Touch A";
	} else {
		simpleButton.string = "Release A";
	}
};

global.button.b.onChanged = function () {
	if (!this.read()) {
		simpleButton.string = "Touch B";
	} else {
		simpleButton.string = "Release B";
	}
};

global.button.c.onChanged = function () {
	if (!this.read()) {
		simpleButton.string = "Touch C";
	} else {
		simpleButton.string = "Release C";
	}
};
