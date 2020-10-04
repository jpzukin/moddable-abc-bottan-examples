import {} from "piu/MC";

// タッチボタンクラス
class TouchButton {
    #state;
    #x;
    #y;
    #width;
    #height;

    constructor({x, y, width, height}) {
        this.#state = false;
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.onChanged = this.nop();
    }
    read() {
        return this.#state;
    }
    delegate(state) {
        this.#state = state;
        this.onChanged();
    }
    hit(x, y) {
        if (241 <= y) {
            if ((this.#x <= x) && (x <= (this.#x + this.#width))) {
                return true;
            }
        }
        return false;
    }
    nop() {}
}

// 各ボタンの範囲はM5Core2ライブラリに合わせる
global.button = {
    a: new TouchButton({x:10,  y:241, width:110, height:40}),
    b: new TouchButton({x:130, y:241, width:70,  height:40}),
    c: new TouchButton({x:230, y:241, width:80,  height:40}),
};

// 画面範囲外のタッチをボタンイベントへ繋ぐコンテナテンプレート
export const WithLegacyABCButton = Container.template($ => ({
    top: -40, left: -40, bottom: -40, right: -40,
    clip: false,
    active: true,
    Behavior: class extends Behavior {
        onTouchBegan(content, id, x, y) {

            // 無回転時の座標でボタンを判定するために回転された座標を戻す
            const value = application.rotation;
            let tx = x;
            let ty = y;
            switch (value) {
                case 90:
                    tx = application.height - y;
                    ty = x;
                    break;
                case 180:
                    tx = application.width - x;
                    ty = application.height - y;
                    break;
                case 270:
                    tx = y;
                    ty = application.width - x;
                    break;
            }

            trace(`(${x}, ${y}) => (${tx},${ty})\n`);
            for (const touchButton of Object.values(global.button)) {
                if (touchButton.hit(tx,ty)) {
                    this.touchButton = touchButton;
                    this.touchButton.delegate(false);
                    break;
                }
            }
        }
        onTouchEnded(content, id, x, y) {
            if (this.touchButton) {
                this.touchButton.delegate(true);
                delete this.touchButton;
            }
        }
    }
}));
