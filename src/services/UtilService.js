const util = require("util");
const bleno = require("bleno");

const { StaticInfo } = require("../characteristics/StaticInfo");
const { NotifyRSSI } = require("../characteristics/NotifyRSSI");

const BlenoPrimaryService = bleno.PrimaryService;

function UtilService() {
  UtilService.super_.call(this, {
    uuid: "fad0",
    characteristics: [new StaticInfo(), new NotifyRSSI()],
  });
}
util.inherits(UtilService, BlenoPrimaryService);

module.exports = { UtilService };
