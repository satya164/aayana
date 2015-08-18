/* eslint-env browser */

import instagram from "./instagram";

function loadPhotos() {
    instagram((err, res) => {
        if (err) {
            return console.error(err);
        }

        let images = res.data.map(p => p.images.standard_resolution.url);

        let stream = document.getElementById("instagram-stream");

        stream.innerHTML = images.map(url => `<div class="col small-12 medium-6 large-4"><img class="photo" src="${url}"></div>`).join("\n");
    });
}

if (document.readyState === "complete") {
    loadPhotos();
} else {
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            loadPhotos();
        }
    };
}
