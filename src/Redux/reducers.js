import { combineReducers } from "redux";

export function message(state = {
    emoji: "",
    verb: "",
    adjective: "",
    object: "",
    adverb: ""
}, action) {
    switch (action.type) {
        case "ADD_ELEMENT":
            return Object.assign({}, state, {
                [action.key] : action.value
            });
        case "OVERWRITE":
            return Object.assign({}, state, {
                emoji: action.emoji,
                verb: action.verb,
                adjective: action.adjective,
                object: action.object,
                adverb: action.adverb
            });
        default:
            return state;
    }
}

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
    message,
    lang
});