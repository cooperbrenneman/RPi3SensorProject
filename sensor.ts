import * as sensor from './index';

let fakeSensor = new sensor.FakeSensor();

fakeSensor.start().subscribe((reading: sensor.SensorReading) => {
    console.log(`Reading from sensor... ${JSON.stringify(reading)}`);
});