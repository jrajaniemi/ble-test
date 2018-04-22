const CronJob = require("cron").CronJob;
var ruuvi = require("node-ruuvitag");
var http = require("http");

const callback = (tag: any) => {
  console.log("Found RuuviTag, id: " + tag.id);
  tag.on("updated", (data: any) => {
    console.log(
      "Got data from RuuviTag " +
        tag.id +
        ":\n" +
        JSON.stringify(data, null, "\t")
    );
  });
};

new CronJob(
  "0 * * * * *",
  function() {
    console.log(Date());
    ruuvi.once("found", callback);
  },
  null,
  true,
  "Europe/Helsinki"
);
