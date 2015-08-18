export default function fetch(url, cb) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = () => {
        if (ajax.readyState == XMLHttpRequest.DONE) {
            if (ajax.status == 200) {
                cb(null, ajax.responseText);
            } else {
                cb(new Error(ajax.status));
            }
        }
    }

    ajax.open("GET", url, true);
    ajax.send();
}
