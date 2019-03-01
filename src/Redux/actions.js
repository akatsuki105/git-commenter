export function addElement(key, value) {
    return ({
        type: "WRITE_ELEMENT",
        key,
        value
    });
}

export function overwrite({emoji, verb, adjective, object, adverb}) {
    return ({
        type: "OVERWRITE",
        emoji, verb, adjective, object, adverb
    });
}

export function switchLang(lang) {
    localStorage.setItem("lang", lang);
    return ({
        type: "SWITCH_LANGUAGE",
        lang
    });
}