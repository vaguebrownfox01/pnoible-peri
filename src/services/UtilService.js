import { NotifyScan } from "../characteristics/NotifyScan";

const util = require("util");
const bleno = require("bleno");

const { StaticInfo } = require("../characteristics/StaticInfo");
const { NotifyRSSI } = require("../characteristics/NotifyRSSI");

const BlenoPrimaryService = bleno.PrimaryService;

const UTIL_SERVICE_UUID = "fad0";

const UTIL_STATIC_INFO_UUID = "fad1";
const UTIL_STATIC_INFO_DES_UUID = "fa11";

const UTIL_NOTIFY_RSSI_UUID = "fad2";
const UTIL_NOTIFY_RSSI_DES_UUID = "fa22";

const UTIL_NOTIFY_SCAN_UUID = "fad3";
const UTIL_NOTIFY_SCAN_DES_UUID = "fa33";

function UtilService() {
  UtilService.super_.call(this, {
    uuid: UTIL_SERVICE_UUID,
    characteristics: [
      new StaticInfo({
        uuid: UTIL_STATIC_INFO_UUID,
        uuid_des: UTIL_STATIC_INFO_DES_UUID,
      }),
      new NotifyRSSI({
        uuid: UTIL_NOTIFY_RSSI_UUID,
        uuid_des: UTIL_NOTIFY_RSSI_DES_UUID,
      }),
      new NotifyScan({
        uuid: UTIL_NOTIFY_SCAN_UUID,
        uuid_des: UTIL_NOTIFY_SCAN_DES_UUID,
      }),
    ],
  });
}
util.inherits(UtilService, BlenoPrimaryService);

module.exports = { UtilService };
