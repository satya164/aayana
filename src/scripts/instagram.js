import jsonp from "./jsonp";

const CLIENT_ID = "a93dfcee57b64124adc5fbc10181a7d0";
const TAG = "iamaayana";

export default function instagram(cb) {
    function getPhotos(callback) {
        jsonp(`https://api.instagram.com/v1/tags/${TAG}/media/recent?client_id=${CLIENT_ID}&count=12`, function(err, res) {
            if (err) {
                return callback(err);
            }

            callback(null, res);

            if (res && res.data && res.data.length) {
                // Cache the response
                try {
                    window.localStorage.setItem("instagram-photos", JSON.stringify({
                        response: res,
                        timestamp: Date.now()
                    }));
                } catch(e) {
                    // Failed to cache data
                }
            }
        });
    }

    let cached;

    try {
        cached = JSON.parse(window.localStorage.getItem("instagram-photos"));
    } catch(e) {
        // We don't have any cached data
    }

    if (cached) {
        let timestamp = parseInt(cached.timestamp, 10);

        if (cached.response && cached.response.data && cached.response.data.length) {
            // Return cached data
            cb(null, cached.response);

            if (isNaN(timestamp) || Date.now() - timestamp > 3600000) {
                // It's been over an hour
                try {
                    window.localStorage.deleteItem("instagram-photos");
                } catch(e) {
                    // Failed to clear data
                }

                // Fetch data again
                getPhotos(() => {});
            }

            return;
        }
    }

    getPhotos(cb);
}
