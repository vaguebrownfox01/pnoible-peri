const util = require("util");
const bleno = require("bleno");

const { StaticReadOnly } = require("../characteristics/StaticReadOnly");
const { NotifyRSSI } = require("../characteristics/NotifyRSSI");
const { WriteOnly } = require("../characteristics/WriteOnly");

const BlenoPrimaryService = bleno.PrimaryService;

function PnoiService() {
  PnoiService.super_.call(this, {
    uuid: "fff0",
    characteristics: [new StaticReadOnly(), new NotifyRSSI(), new WriteOnly()],
  });
}
util.inherits(PnoiService, BlenoPrimaryService);

module.exports = { PnoiService };
