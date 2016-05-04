var NobleDevice = require('noble-device');

var AUTHORIZATION_UUID = 'fff6';
var EXPECTED_MANUFACTURER_DATA_LENGTH = 25;
var APPLE_COMPANY_IDENTIFIER = 0x004c; // https://www.bluetooth.org/en-us/specification/assigned-numbers/company-identifiers
var IBEACON_TYPE = 0x02;
var EXPECTED_IBEACON_DATA_LENGTH = 0x15;

function WinPlusCorpCO2(peripheral) {
  return NobleDevice.call(this, peripheral);
};

WinPlusCorpCO2.is = function is(peripheral) {
  console.log('name=', peripheral.advertisement.localName);
  return peripheral.advertisement.localName === 'WINPLUS-SPP';
};

// inherit noble device
NobleDevice.Util.inherits(WinPlusCorpCO2, NobleDevice);

// you can mixin other existing service classes here too,
// noble device provides battery and device information,
// add the ones your device provides
NobleDevice.Util.mixin(WinPlusCorpCO2, NobleDevice.DeviceInformationService);

// WinPlusCorpCO2.prototype.writeServiceDataCharacteristic = function(uuid, data, callback) {
//   this.writeDataCharacteristic('fff0', uuid, data, callback);
// };
//
// WinPlusCorpCO2.prototype.authorize = function(pin, callback) {
//   this.writeServiceDataCharacteristic(AUTHORIZATION_UUID, new Buffer(pin, 'hex'), callback);
// };

// export your device
module.exports = WinPlusCorpCO2;
