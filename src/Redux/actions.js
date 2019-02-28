
export function switchLang(lang) {
    localStorage.setItem("lang", lang);
    return ({
        type: "SWITCH_LANGUAGE",
        lang
    });
}