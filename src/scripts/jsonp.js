export default function jsonp(url, cb) {
    let callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

    window[callbackName] = function(data) {
        delete window[callbackName];

        document.body.removeChild(script);

        cb(null, data);
    };

    let script = document.createElement("script");

    script.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callbackName;

    document.body.appendChild(script);
}
