import * as moment from 'moment';

export interface Metric{
    name: string;
    value: number;
}


export class SensorReading{
    public metrics: Metric[];
    timestamp: moment.Moment;

    /// Finds the first instance of a metric that matches this name
    public FindMetric(name: string): Metric{
        return this.metrics.filter((d) => {
            return d.name == name;
        })[0];
    }
}