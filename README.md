winpluscorp-co2
===

# Development

OSX can be strange sometimes:)

## Install `vagrant-dotenv`

```
vagrant plugin install vagrant-env
```

## Get bluetooth usb device parameters

```
VBoxManage list usbhost
```

## Find the device, for example:

```
UUID:               b30573d7-d485-49b8-a8a5-d47b357c853d
VendorId:           0x0a5c (0A5C)
ProductId:          0x21e8 (21E8)
Revision:           1.18 (0118)
Port:               2
USB version/speed:  0/Full
Manufacturer:       Broadcom Corp
Product:            BCM20702A0
SerialNumber:       5CF3706E5058
Address:            p=0x21e8;v=0x0a5c;s=0x000000d87000750e;l=0xfd120000
Current State:      Available
```

## Create an `.env` file with content of (based on the output above)

```
BLE_VENDORID=0x0a5c
BLE_PRODUCTID=0x21e8
BLE_NAME=BCM20702A0
```

There are steps are mostly found in:

* https://gist.github.com/dscape/7d829c0c116ef419f963
* https://groups.google.com/forum/#!topic/vagrant-up/lGU32nN0iFE

Thank you for finding these steps out!

# LICENSE

MIT
