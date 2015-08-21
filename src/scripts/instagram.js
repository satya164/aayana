import jsonp from "./jsonp";

const CLIENT_ID = "a93dfcee57b64124adc5fbc10181a7d0";
const TAG = "iamaayana";

export default function instagram(cb) {
    let cached;

    try {
        cached = JSON.parse(window.localStorage.getItem("instagram-photos"))
    } catch(e) {
        // We don't have any cached data
    }

    if (cached) {
        let timestamp = parseInt(cached.timestamp);

        if (timestamp && Date.now() - timestamp < 3600000) {
            if (cached.response && cached.response.data && cached.response.data.length) {
                // Return cached data
                return cb(null, cached.response);
            }
        } else {
            // It's been a long time
            try {
                window.localStorage.deleteItem("instagram-photos");
            } catch(e) {
                // Failed to delete cache
            }
        }
    }

    jsonp(`https://api.instagram.com/v1/tags/${TAG}/media/recent?client_id=${CLIENT_ID}&count=12`, function(err, res) {
        if (err) {
            return cb(err);
        }

        if (res && res.data && res.data.length) {
            // Cache the response for 1 hour
            try {
                window.localStorage.setItem("instagram-photos", JSON.stringify({
                    response: res,
                    timestamp: Date.now()
                }));
            } catch(e) {
                // Failed to cache data
            }
        }

        cb(null, res);
    });
}
