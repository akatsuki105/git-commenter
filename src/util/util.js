export function fetchTemplate(key) {
    let template = JSON.parse(localStorage.getItem(key));
    if (!template) {
        template = [];
    }
    return template
}

// 要素を受け取ってメッセージを組み立てる
export function constructMessage({ emoji = "", verb = "", adjective = "", object = "", modifier = "", reason = ""}) {
    let result = ""
    if (emoji !== "") {
        result += `${emoji} : `;
    }
    if (verb !== "") {
        result += verb
    }
    if (adjective !== "") {
        result += ` ${adjective}`
    }
    if (object !== "") {
        result += ` ${object}`
    }
    if (modifier !== "") {
        result += ` ${modifier}`
    }
    if (reason !== "") {
        result += `\n\n${reason}`
    }
    return result;
}