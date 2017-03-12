var wpi = require('wiring-pi');
var Q = require('q');

// Read Sensor interval in ms
var INTERVAL = 15000;
// Total reads to be sent
var MAX_MESSAGE_COUNT = 5;
var sentMessageCount = 0;

// GPIO pin of the LED
var CONFIG_PIN = 7;

// Prepare for GPIO operations
wpi.setup('wpi');
wpi.pinMode(CONFIG_PIN, wpi.OUTPUT);

//setup sensor
var sensor = require('node-dht-sensor');

//Read sensor value
function getTemperatureAndHumidity(){
  return new Promise(function(resolve, reject){
  var temp;
  var hum;
  var time;
  sensor.read(22, 17, function(err, temperature, humidity) {
        if (!err) {
            temp = temperature.toFixed(1);
            hum = humidity.toFixed(1);
            time =  new Date();
            console.log(
                'time: ' + time +
                ', temp: ' + temp + '°C, ' +
                'humidity: ' + hum + '%'
            );
            resolve([time,temp,hum]);
        }
        else{
            reject(err);
        }

        });

    });
}

function readTempAndHum(){
    return getTemperatureAndHumidity().then(function (data){
      sentMessageCount++;
      var message = new Message(JSON.stringify({ deviceId: deviceId, time: data[0], temperature: data[1], humidity: data[2] }));
      console.log("[Device] Sending message #" + sentMessageCount + ": " + message.getData());
      client.sendEvent(message, sendMessageCallback);
  }).catch(error => {console.log(error);});
}


function printValueToConsole(a) {
      console.log(a);
      var message = new Message(JSON.stringify({ deviceId: deviceId, time: temp[0], temperature: temp[1], humidity: temp[2] }));
      console.log("[Device] Creating message #" + sentMessageCount + ": " + message.getData());
      return message;
  }


function blinkLED() {
  // Light up LED for 100 ms
  wpi.digitalWrite(CONFIG_PIN, 1);
  setTimeout(function () {
    wpi.digitalWrite(CONFIG_PIN, 0);
  }, 100);
}

function readValues(err) {
  if (err) {
    console.log('[Device] Message error: ' + err.toString());
  } else {
    // Blink once if no error
    blinkLED();
    if (sentMessageCount < MAX_MESSAGE_COUNT) {
        setTimeout(readTempAndHum, INTERVAL);
    }  
  }
}

readValues();