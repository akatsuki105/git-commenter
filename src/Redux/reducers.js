import { combineReducers } from "redux";

// 言語設定
export function lang(state={
    lang: (localStorage.getItem("lang") ? localStorage.getItem("lang") : "en")
}, action) {
    switch (action.type) {
        case "SWITCH_LANGUAGE":
            return Object.assign({}, state, {
                lang: action.lang
            });
        default:
            return state;
    }
}

export default combineReducers({
    lang
});