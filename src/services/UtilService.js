const util = require("util");
const bleno = require("bleno");

const { StaticReadOnly } = require("../characteristics/StaticReadOnly");
const { NotifyRSSI } = require("../characteristics/NotifyRSSI");

const BlenoPrimaryService = bleno.PrimaryService;

function UtilService() {
  UtilService.super_.call(this, {
    uuid: "fad0",
    characteristics: [new StaticReadOnly(), new NotifyRSSI()],
  });
}
util.inherits(UtilService, BlenoPrimaryService);

module.exports = { UtilService };
