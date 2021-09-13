const util = require("util");
const bleno = require("bleno");

const { RecordControl } = require("../characteristics/RecordControl");

const BlenoPrimaryService = bleno.PrimaryService;

const PNOI_SERVICE_UUID = "ace0";

const PNOI_RECORD_CONTROL_UUID = "ace1";
const PNOI_RECORD_CONTROL_DES_UUID = "ac11";

function PnoiService() {
  PnoiService.super_.call(this, {
    uuid: PNOI_SERVICE_UUID,
    characteristics: [
      new RecordControl({
        uuid: PNOI_RECORD_CONTROL_UUID,
        uuid_des: PNOI_RECORD_CONTROL_DES_UUID,
      }),
    ],
  });
}
util.inherits(PnoiService, BlenoPrimaryService);

module.exports = { PnoiService };
