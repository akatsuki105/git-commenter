export function fetchTemplate(key) {
    let template = JSON.parse(localStorage.getItem(key));
    if (!template) {
        template = [];
    }
    return template
}