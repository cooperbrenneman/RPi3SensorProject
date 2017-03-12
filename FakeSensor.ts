import * as sensor from './index';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class FakeSensor{

    private intervalDuration: number;
    private interval: NodeJS.Timer;
    private sensorSubject: Subject<sensor.SensorReading>;


    constructor(intervalDuration: number = 1000){
        this.intervalDuration = intervalDuration;
    }

    public start(): Observable<sensor.SensorReading>{
        this.sensorSubject = new Subject<sensor.SensorReading>();

        this.interval = setInterval(() => {
            let reading = this.read();

            this.sensorSubject.next(reading);

        }, this.intervalDuration);

        console.log('Starting sensor.');

        return this.sensorSubject.asObservable();
    }

    public stop(){

        clearInterval(this.interval);

        this.sensorSubject.complete(); // Let subscribers know that this is done

        console.log('Shutting down sensor.');
    }

    public read(): sensor.SensorReading{

        let reading : sensor.SensorReading = new sensor.SensorReading();
        reading.timestamp = moment();
        reading.metrics = [];
        reading.metrics.push({
            name: 'humidity',
            value: 89.5
        });

        return reading;
    }
}