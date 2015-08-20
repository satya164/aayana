import instagram from "./instagram";

function loadPhotos(err, res) {
    let stream = document.getElementById("instagram-stream");

    if (err) {
        stream.innerHTML = '<div class="col small-12">An error occurred while loading photos :(</div>';

        return;
    }

    if (res.data.length === 0) {
        stream.innerHTML = '<div class="col small-12">No photos found :(</div>';

        return;
    }

    let fragment = document.createDocumentFragment();

    res.data.forEach(p => {
        let div = document.createElement("div"),
            link = document.createElement("a"),
            image = document.createElement("img"),
            caption = document.createElement("figcaption");

        div.className = "col small-12 medium-6 large-4";

        link.className = "photo";
        link.target = "_blank";
        link.href = p.link;

        if (window.screen.width <= 360 && window.devicePixelRatio === 1) {
            image.src = p.images.low_resolution.url;
        } else {
            image.src = p.images.standard_resolution.url;
        }

        for (let i = 0, l = p.tags.length; i < l; i++) {
            const tag = p.tags[i];

            if (i < (l - 1) && (tag === "iamaayana" || tag.length > 15)) {
                continue;
            }

            caption.setAttribute("data-title", tag);

            break;
        }

        link.appendChild(image);
        link.appendChild(caption);

        div.appendChild(link);

        fragment.appendChild(div);
    });

    stream.innerHTML = "";
    stream.appendChild(fragment);
}

instagram((err, res) => {
    if (document.readyState === "complete") {
        loadPhotos(err, res);
    } else {
        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                loadPhotos(err, res);
            }
        };
    }
});
