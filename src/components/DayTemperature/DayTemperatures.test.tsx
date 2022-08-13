import {render, screen} from "@testing-library/react";
import React from "react";
import {DayTemperature} from "./DayTemperature";
import {DateTime} from "luxon";

describe('DayTemperature', function () {
    test('displays the minimum and maximum temperature', function () {
        // GIVEN
        const min = 21
        const otherValue1 = 25
        const otherValue2 = 30
        const otherValue3 = 40
        const otherValue4 = 36
        const max = 45

        // WHEN
        render(<DayTemperature date={'2022-08-15T03:00:00+00:00'}
                               temperatures={[min, max, otherValue1, otherValue2, otherValue4, otherValue3]}/>);

        // THEN
        expect(screen.getByText(new RegExp(min.toString()))).toBeInTheDocument();
        expect(screen.queryByText(new RegExp(otherValue1.toString()))).not.toBeInTheDocument();
        expect(screen.queryByText(new RegExp(otherValue2.toString()))).not.toBeInTheDocument();
        expect(screen.queryByText(new RegExp(otherValue3.toString()))).not.toBeInTheDocument();
        expect(screen.queryByText(new RegExp(otherValue4.toString()))).not.toBeInTheDocument();
        expect(screen.getByText(new RegExp(max.toString()))).toBeInTheDocument();
    })
    test('displays the date', function () {
        // GIVEN
        const isoDate = '2022-08-15T03:00:00+00:00'

        // WHEN
        render(<DayTemperature date={isoDate} temperatures={[10]}/>);

        // THEN
        const date = DateTime.fromISO(isoDate)
        expect(screen.getByText(new RegExp(date.day.toString()))).toBeInTheDocument();
    })
})