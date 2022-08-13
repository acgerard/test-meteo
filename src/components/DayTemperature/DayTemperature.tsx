import {DateTime} from "luxon";
import React from "react";

import './DayTemperature.css'

export type DayTemperatures = {
    date: string; temperatures: number[]
}

export function DayTemperature(props: DayTemperatures) {
    const min = props.temperatures.reduce((acc:number, current: number) => current < acc ? current : acc , 1000)
    const max = props.temperatures.reduce((acc:number, current: number) => current > acc ? current : acc , -1000)

    return <>
        <span>{DateTime.fromISO(props.date).toFormat('EEEE dd LLLL')}</span>
        <div className={'temperature'}>
            <span className={'min-temperature'}>{`${Math.round(min)}°`}</span>
            <span> / </span>
            <span className={'max-temperature'}>{`${Math.round(max)}°`}</span>
        </div>
    </>
}