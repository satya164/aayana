import fetch from "./fetch";

const CLIENT_ID = "a93dfcee57b64124adc5fbc10181a7d0";
const TAG = "IAmAyana";

export default function instagram(cb) {
    fetch(`https://api.instagram.com/v1/tags/${TAG}/media/recent?client_id=${CLIENT_ID}`, function(err, res) {
        if (err) {
            return cb(err);
        }

        try {
            cb(null, JSON.parse(res));
        } catch(e) {
            cb(e);
        }
    });
}
