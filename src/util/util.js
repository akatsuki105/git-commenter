// ローカルストレージからkeyで指定したテンプレートの取得を行う
export function fetchTemplate(key) {
    let template = JSON.parse(localStorage.getItem(key));
    if (!template) {
        template = [];
    }
    return template;
}

// 要素を受け取ってメッセージを組み立て、文字数のカウントを行う
export function constructMessage({ emoji = "", verb = "", adjective = "", object = "", modifier = "", reason = "" }) {
    let message = "";
    let subjectCount = 0;
    let reasonCount = 0;

    // subject
    if (emoji !== "") {
        message += `${emoji} : `;
    }
    if (verb !== "") {
        message += verb;
    }
    if (adjective !== "") {
        message += ` ${adjective}`;
    }
    if (object !== "") {
        message += ` ${object}`;
    }
    if (modifier !== "") {
        message += ` ${modifier}`;
    }
    subjectCount = message.length;

    if (reason !== "") {
        reasonCount = reason.length;
        message += `\n\n${reason}`;
    }
    const result = {
        message,
        subjectCount,
        reasonCount
    };
    return result;
}