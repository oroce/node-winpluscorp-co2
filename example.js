var WinPlusCorpCO2 = require('./');
var async = require('async');
var json = require('circular-json');
WinPlusCorpCO2.discover(function(device) {
  device.on('disconnect', function() {
    console.log('disconnected! (%s)', new Date());
    process.exit(0);
  });

  async.series([
    function(callback) {
      console.log('connectAndSetup');
      device.connectAndSetup(function(err, res) {
        console.log('cas',err, res);
        callback(err,res);
      });
    },
    function(callback) {
      //return callback();
      /*device.writeDataCharacteristic('ffe0', 'ffe1',new Buffer(0x2092), function(err, val) {
        console.log('uint8written', err, val);
      });*/
      console.log('wat', json.stringify(device._characteristics['ffe0']['ffe1'],null,2)
);
      device.notifyCharacteristic('ffe0', 'ffe1', true, function notify(val1, val2, val3) {
        console.log('ich bin notified', val1, val2, val3);
      }, function(err, res) {
        console.log('we will be notified', err, res);
      });
    },
    /*function(callback) {
      device.writeUInt8Characteristic('ffe0', 'ffe1', 0x01, callback);
    },*/
    function(callback) {
      //console.log(device);
      //console.log(json.stringify(device._characteristics, null, 2))
      var c = device._characteristics;
      var arr = [];
      for (var i in c) {
        for (var j in c[i]) {
          console.log('service is %s, characteristics is %s', i,j);
          (function(i,j){
            arr.push({
              char: j,
              service: i
            });
          })(i,j);
        }
      }
      async.mapSeries(arr, function(row, cb) {
        device.readDataCharacteristic(row.service, row.char, function(err, val) {
          var reads = {
            str: '' + val,
            len: val.length
          };
          try {reads['readUInt8'] = val.readUInt8(0);} catch(x) {}
          try {reads['readUInt16LE'] = val.readUInt16LE(0);} catch(x) {}
          try {reads['readUInt32LE'] = val.readUInt32LE(0);} catch(x) {}
          try {reads['readFloatLE'] = val.readFloatLE(0);} catch(x) {}
          row.val = val + '';
          row.reads = reads;
          cb(err, row);
        });
      }, function(err, res) {
        if (err) console.error(err);
        console.log(res);
        device.notifyCharacteristic('ffe0', 'ffe1', true, function notify(val1, val2, val3) {
          console.log('ich bin notified', val1, val2, val3);
        }, function(err, res) {
          console.log('we will be notified', err, res);
        });
        //device.disconnect();
      });
      // device.readDataCharacteristic('ffe0', 'ffe1', function(err, val) {
      //   if (err) {
      //     console.error(val);
      //   }
      //   else {
      //     console.log('val is =' + val.length);
      //   }
      //   device.disconnect();
      // });

    },
    function(callback) {
      console.log('readModelNumber');
      device.readModelNumber(function(err, modelNumber) {
        console.log('\tmodel name = ' + modelNumber);
        callback();
      });
     },
    function(callback) {
      console.log('readSerialNumber');
      device.readSerialNumber(function(err, serialNumber) {
       console.log('\tserial name = ' + serialNumber);
       callback();
      });
    },
    function(callback) {
      console.log('readFirmwareRevision');
      device.readFirmwareRevision(function(err, firmwareRevision) {
       console.log('\tfirmware revision = ' + firmwareRevision);
       callback();
      });
    },
    function(callback) {
      console.log('readHardwareRevision');
      device.readHardwareRevision(function(err, hardwareRevision) {
       console.log('\thardware revision = ' + hardwareRevision);
       callback();
      });
    },
    function(callback) {
      console.log('readSoftwareRevision');
      device.readSoftwareRevision(function(err, softwareRevision) {
       console.log('\tsoftware revision = ' + softwareRevision);
       callback();
      });
    },
    function(callback) {
      console.log('readManufacturerName');
      device.readManufacturerName(function(err, manufacturerName) {
       console.log('\tmanufacturer name = ' + manufacturerName);
       callback();
      });
    }
  ], function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    process.exit(0);
  });

});
