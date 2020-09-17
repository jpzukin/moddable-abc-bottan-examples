import { } from "piu/MC";
import {WithLegacyABCButton} from "withLegacyABCButton";

//
//  メインコンテンツの準備
//
const FONTS = {
	MESSAGE: "OpenSans-Semibold-28"
};

const simpleButton = new Label(null, {
	left: 0, right: 0, height: 60,
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
	string: "touch me"
});

const mainContainer = new Container(null, {
	left: 0, right: 0, top: 0, bottom: 0,
	skin: new Skin({ fill: "#222222" }),
});

const application = new Application();
const withLegacyABCButton = new WithLegacyABCButton();

//
// コンテンツの組合せ
// application
//      |
//      +-- withABCButton (<=ここへ一層追加)
//				|
//				+-- mainContainer
//						|
//						+-- simpleButton
mainContainer.add(simpleButton);
withLegacyABCButton.add(mainContainer);
application.add(withLegacyABCButton);

//
// ABCボタンのイベントハンドラ
//
global.button.a.onChanged = function () {
	if (!this.read()) {
		simpleButton.string = "Push A Button";
	} else {
		simpleButton.string = "Release A Button";
	}
};

global.button.b.onChanged = function () {
	if (!this.read()) {
		simpleButton.string = "Push B Button";
	} else {
		simpleButton.string = "Release B Button";
	}
};

global.button.c.onChanged = function () {
	if (!this.read()) {
		simpleButton.string = "Push C Button";
	} else {
		simpleButton.string = "Release C Button";
	}
};
