import jsonp from "./jsonp";

const CLIENT_ID = "a93dfcee57b64124adc5fbc10181a7d0";
const TAG = "iamaayana";

export default function instagram(cb) {
    jsonp(`https://api.instagram.com/v1/tags/${TAG}/media/recent?client_id=${CLIENT_ID}&count=12`, function(err, res) {
        if (err) {
            return cb(err);
        }

        cb(null, res);
    });
}
