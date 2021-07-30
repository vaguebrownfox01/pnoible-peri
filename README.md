#Pnoi BLE

# Pnoi-phone BLE pheripheral interface

## Update and upgrade
```
> sudo apt-get update
> sudo apt-get upgrade
```

## Get NodeJS : v8.17.0 | link is for arm6l
```
> curl https://unofficial-builds.nodejs.org/download/release/v8.17.0/node-v8.17.0-linux-armv6l.tar.gz -o node-v8.17.0-linux-armv6l.tar.gz
```
```
> tar -xvf node-v8.17.0-linux-armv6l.tar.gz
```
```
> cp /node-v8.17.0-linux-armv6l/* /usr/local/
```
```
> reboot
```

## Get BlueZ

- ### json-c
```
> cd ~
```
```
> wget https://s3.amazonaws.com/json-c_releases/releases/json-c-0.13.tar.gz 
```
```
> tar -xvf json-c-0.13.tar.gz
```
```
> cd json-c-0.13/
```
```
> ./configure --prefix=/usr --disable-static && make
```
```
> sudo make install
```

- ### bluez v5.54
```
> cd ~
```
```
> wget http://www.kernel.org/pub/linux/bluetooth/bluez-5.54.tar.xz 
```
```
> tar -xvf bluez-5.54.tar.xz
```
```
> cd bluez-5.54/
```
```
> ./configure --enable-mesh --enable-testing --enable-tools --prefix=/usr --mandir=/usr/share/man --sysconfdir=/etc --localstatedir=/var
```
```
> sudo make
```
```
> sudo make install
```

- Open bluetooth.service
  - Make sure the `ExecStart` line points to your new daemon in `/usr/libexec/bluetooth/bluetoothd` 
```
> sudo vi /lib/systemd/system/bluetooth.service
```
  
  
- Create a symlink from the old bluetoothd to the new one
```
> sudo cp /usr/lib/bluetooth/bluetoothd /usr/lib/bluetooth/bluetoothd-550.orig
```
```
> sudo ln -sf /usr/libexec/bluetooth/bluetoothd /usr/lib/bluetooth/bluetoothd
```
```
> sudo systemctl daemon-reload
```


## Inside /pnoi-ble
```
> npm install
```

## Run : /pnoi-ble
```
> npm start
```

