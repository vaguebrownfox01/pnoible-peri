const bleno = require("bleno");

const { PnoiService } = require("./services/PnoiService");
const { UtilService } = require("./services/UtilService");

process.env["BLENO_DEVICE_NAME"] = "Pnoi";

bleno.on("stateChange", function (state) {
  console.log("on -> stateChange: " + state + ", address = " + bleno.address);

  if (state === "poweredOn") {
    bleno.startAdvertising("LE_Pnoi", ["cafe"]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on("advertisingStart", function (error) {
  console.log(
    "on -> advertisingStart: " + (error ? "error " + error : "success")
  );

  if (!error) {
    bleno.setServices([new PnoiService(), new UtilService()]);
  }
});

bleno.on("servicesSet", function (error) {
  console.log("on -> servicesSet: " + (error ? "error " + error : "success"));
});

bleno.on("advertisingStop", function () {
  console.log("on -> advertisingStop");
});

bleno.on("accept", function (clientAddress) {
  console.log("on -> accept, client: " + clientAddress);

  bleno.updateRssi();
});

bleno.on("rssiUpdate", function (rssi) {
  console.log("on -> rssiUpdate: " + rssi);
});

bleno.on("disconnect", function (clientAddress) {
  console.log("on -> disconnect, client: " + clientAddress);
});
