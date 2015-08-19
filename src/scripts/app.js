import instagram from "./instagram";

function loadPhotos() {
    instagram((err, res) => {
        let stream = document.getElementById("instagram-stream");

        if (err) {
            stream.textContent = "An error occurred while loading photos :(";

            return;
        }

        if (res.data.length === 0) {
            stream.textContent = "No photos found :(";

            return;
        }

        let fragment = document.createDocumentFragment();

        res.data.forEach(p => {
            let div = document.createElement("div"),
                link = document.createElement("a"),
                image = document.createElement("img");

            div.className = "col small-12 medium-6 large-4";

            link.className = "photo";
            link.target = "_blank";
            link.href = p.link;

            image.src = p.images.standard_resolution.url;

            link.appendChild(image);
            div.appendChild(link);

            fragment.appendChild(div);
        });

        stream.innerHTML = "";
        stream.appendChild(fragment);
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
