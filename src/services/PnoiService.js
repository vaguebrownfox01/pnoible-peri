const util = require("util");
const bleno = require("bleno");

const { RecordControl } = require("../characteristics/RecordControl");

const BlenoPrimaryService = bleno.PrimaryService;

function PnoiService() {
  PnoiService.super_.call(this, {
    uuid: "ace0",
    characteristics: [new RecordControl()],
  });
}
util.inherits(PnoiService, BlenoPrimaryService);

module.exports = { PnoiService };
