import {} from "piu/MC";

// ModdableSDK内部で行われていたボタンに対する初期設定相当 
// 主にonChengedイベントの発行と、ボタン押下状態を提供する。
class Button {
    #state;

    constructor() {
        this.#state = false;
        this.onChanged = this.nop();
    }
    read() {
        return this.#state;
    }
    delegate(state) {
        this.#state = state;
        this.onChanged();
    }
    nop() {}
}

global.button = {
    a: new Button(), 
    b: new Button(), 
    c: new Button(), 
};

// 液晶の表示範囲外に配置するボタンのテンプレート 
const WithButton = Content.template($ => ({
    left: $.no*106+1, bottom: -40, height: 40, width: 106,
    active: true,
    Behavior: class extends Behavior {
        onCreate(content, data) {
            this.data = data;
        }
        onTouchBegan(content, id, x, y) {
            const data = this.data;
            data.button.delegate(false);
        }
        onTouchEnded(content, id, x, y) {
            const data = this.data;
            data.button.delegate(true);
        }
    }
}));

// 画面範囲外ボタンを配置するコンテナ
export const WithLegacyABCButton = Container.template($ => ({
    top: 0, left: 0, bottom: 0, right: 0,
    clip: false,
    contents: [
        new WithButton({button: global.button.a, no:0}),
        new WithButton({button: global.button.b, no:1}),
        new WithButton({button: global.button.c, no:2}),
    ]
}));
