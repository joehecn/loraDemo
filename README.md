confirmed: true
data: "AjQAAAAAAAAAAAA="
devEUI: "00137a100000cf22"
fPort: 7

``` bash
# 垃圾筒
npx mqtt sub -v -t "application/2/device/00137a100000cf22/#" -h '120.78.85.4' -p 1883
# application/2/device/00137a100000cf22/event/up
# {"applicationID":"2","applicationName":"mege-application","deviceName":"binsensor-001","devEUI":"00137a100000cf22","txInfo":{"frequency":924400000,"dr":0},"adr":true,"fCnt":401,"fPort":6,"data":"ATQBJAAAygENXxI="}
npx mqtt pub -t 'application/2/device/00137a100000cf22/command/down' -h '120.78.85.4' -p '1883' -m '{"confirmed":true,"fPort":7,"data":"AjQAAAAAAAAAAAA="}'
```

``` bash
01 4A 00 0A 02 20200706 0000
01 34 00 0A 03 20200710 0000

# 电表
npx mqtt sub -v -t "application/#" -h '120.78.85.4' -p 1883

npx mqtt sub -v -t "application/2/device/00137a100000b341/#" -h '120.78.85.4' -p 1883
npx mqtt sub -v -t "application/2/device/00137a100000cf22/#" -h '120.78.85.4' -p 1883

npx mqtt pub -t 'application/2/device/00137a100000b341/command/down' -h '120.78.85.4' -p '1883' -m '{"confirmed":true,"fPort":7,"data":"AkoAAAAAAAAAAAA="}'
```

``` bash
scp -i /Users/hemiao/pem/me.pem /Users/hemiao/lora/demo/dist/index.html root@47.75.171.49:/root/bigproject/public/lora/
scp -i /Users/hemiao/pem/me.pem /Users/hemiao/lora/demo/dist/main.js root@47.75.171.49:/root/bigproject/public/lora/

ssh -i /Users/hemiao/pem/me.pem root@47.75.171.49

http://fusquareserver.cloud-building.fun:3000/lora/index.html
```
ssh -i /Users/hemiao/pem/me.pem root@47.112.207.25