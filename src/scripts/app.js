import instagram from "./instagram";

function loadPhotos() {
    instagram((err, res) => {
        let stream = document.getElementById("instagram-stream");

        if (err) {
            stream.textContent = "An error occurred while loading images :(";

            return;
        }

        if (res.data.length === 0) {
            stream.textContent = "No images found :(";

            return;
        }

        stream.innerHTML = res.data.map(p => {
            return `<div class="col small-12 medium-6 large-4">
                        <a class="photo" target="_blank" href="${p.link}"><img src="${p.images.standard_resolution.url}"></a>
                    </div>`;
        }).join("\n");
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
