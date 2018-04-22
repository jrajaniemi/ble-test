var CronJob = require("cron").CronJob;
var ruuvi = require("node-ruuvitag");
var http = require("http");
var callback = function (tag) {
    console.log("Found RuuviTag, id: " + tag.id);
    tag.on("updated", function (data) {
        console.log("Got data from RuuviTag " +
            tag.id +
            ":\n" +
            JSON.stringify(data, null, "\t"));
    });
};
new CronJob("0 * * * * *", function () {
    console.log(Date());
    ruuvi.once("found", callback);
}, null, true, "Europe/Helsinki");
//# sourceMappingURL=alfa-ruuvi.js.map