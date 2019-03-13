const AWS_API_URL = process.env.REACT_APP_AWS_API_URL;

export default class Aws {

    static async fetchTmpls(category, limit) {
        const url = AWS_API_URL + `/tmpls?category=${category}&limit=${limit}`;
        const response = await fetch(url, { method: "GET", mode: "cors", headers: { "Content-Type": "application/json; charset=utf-8" } });
        const tmpls = await response.json();
        console.log(tmpls);
        return tmpls;
    }

    static async addTmplCtr(category, word) {
        const api_url = AWS_API_URL + "/tmpls";
        const payload = {
            "name": "addTmplCtr",
            "category": category,
            "word": word
        };

        const req = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payload)
        };

        const response = await fetch(api_url, req);
        return response;
    }

    static async requestTmpl(category, word, ja="") {
        const api_url = AWS_API_URL + "/reqs";
        const payload = {
            "name": "requestTmpl",
            "category": category,
            "word": word,
            "ja": ja
        };

        const req = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payload)
        };

        const response = await fetch(api_url, req);
        return response;
    }
}