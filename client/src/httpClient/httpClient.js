let base_url = 'http://localhost:3030';

export const httpPost = function httpPost(url, data) {
    
    url = base_url + url;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify(data) || {}
    }).then(res => res.json()).then(
        (result) => {
            return result;
        }).catch(e => {
            return e;
        });
};


export const httpGet = function httpGet(url) {
    url = base_url + url;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            "access-control-allow-credentials": "true",
        },
    }).then(res => res.json()).then(
        (result) => {
            return result;
        }).catch(e => {
            return e;
        });
};