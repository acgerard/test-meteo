import {useContext, useMemo} from "react";
import {ApiState, MeteoContext} from "../../context/MeteoContext";
import {DayTemperature, DayTemperatures} from "../DayTemperature/DayTemperature";
import {DateTime} from "luxon";

import './Temperatures.css'

export function Temperatures() {
    const {records, location, recordState} = useContext(MeteoContext)

    const recordsByDate = useMemo(() => {
        const recordsByDate: { [date: string]: DayTemperatures } = {}
        records.forEach(rec => {
            const day = DateTime.fromISO(rec.forecast).day
            if (!recordsByDate[day]) {
                recordsByDate[day] = {date: rec.forecast, temperatures: []}
            }
            recordsByDate[day].temperatures.push(rec.temperature)
        })
        return recordsByDate
    }, [records])

    return location ? <>
        {recordState === ApiState.FETCHING && <div>Fetching...</div>}
        {recordState === ApiState.ERROR && <div>Error fetching forecasts...</div>}
        {recordState === ApiState.OK && (records.length === 0 ?
                <div>No results, try another location...</div> :
                <div className={'temperatures'}>{Object.values(recordsByDate).map(dayTemp => (
                    <DayTemperature key={dayTemp.date} date={dayTemp.date} temperatures={dayTemp.temperatures}/>
                ))
                }
                </div>
        )}
    </> : <div>Enter a location to get it's weather forecast!</div>
}