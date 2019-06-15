# node-red-contrib-ui-thermostat
A Node-RED widget node to show a Nest-like thermostat in the dashboard

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-ui-thermostat
```

## Node Usage
The following example flow demonstrates all the input messages that can be used to setup the look-and-feel of this widget:

![image](https://user-images.githubusercontent.com/14224149/59548092-dd517b00-8f49-11e9-98b4-51ece9deef0d.png)

```
[{"id":"5e206f12.b0fa","type":"ui_thermostat","z":"a5cefc68.4776f","group":"2e442781.0c5608","order":2,"width":"6","height":"7","name":"","x":490,"y":300,"wires":[["fafa4d9e.6f092"]]},{"id":"60e8d076.ec458","type":"inject","z":"a5cefc68.4776f","name":"Set current temperature (17°C)","topic":"current","payload":"17","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":210,"y":180,"wires":[["5e206f12.b0fa"]]},{"id":"aa5ac359.4ecb3","type":"inject","z":"a5cefc68.4776f","name":"Set target temperature (23°C)","topic":"target","payload":"17","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":200,"y":220,"wires":[["5e206f12.b0fa"]]},{"id":"6070eddb.191304","type":"inject","z":"a5cefc68.4776f","name":"Set HVAC state (???)","topic":"hvac_state","payload":"17","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":260,"wires":[["5e206f12.b0fa"]]},{"id":"7afec6fd.ab6bc8","type":"inject","z":"a5cefc68.4776f","name":"Has leaf","topic":"has_leaf","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":140,"y":300,"wires":[["5e206f12.b0fa"]]},{"id":"f64671a0.1ddf6","type":"inject","z":"a5cefc68.4776f","name":"Away","topic":"away","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":340,"wires":[["5e206f12.b0fa"]]},{"id":"289769dc.f584a6","type":"inject","z":"a5cefc68.4776f","name":"Eco","topic":"eco","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":380,"wires":[["5e206f12.b0fa"]]},{"id":"7610a796.8c5b48","type":"inject","z":"a5cefc68.4776f","name":"Off","topic":"off","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":420,"wires":[["5e206f12.b0fa"]]},{"id":"fafa4d9e.6f092","type":"debug","z":"a5cefc68.4776f","name":"Thermostat output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":690,"y":300,"wires":[]},{"id":"2e442781.0c5608","type":"ui_group","z":"","name":"Hikvision","tab":"4779176.99cd2e8","disp":true,"width":"6","collapse":false},{"id":"4779176.99cd2e8","type":"ui_tab","z":"","name":"Camera","icon":"dashboard","disabled":false,"hidden":false}]
```
