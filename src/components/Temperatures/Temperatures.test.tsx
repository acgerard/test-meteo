import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import {Temperatures} from './Temperatures';
import {ApiState, MeteoContext, RecordField} from "../../context/MeteoContext";

describe('Temperatures', () => {
    test('with fetch state = error displays the error', () => {
        // GIVEN
        const state = ApiState.ERROR

        // WHEN
        render(<TemperaturesWithTestContext state={state} location={'location'}/>);

        // THEN
        const errorElement = screen.getByText(/Error fetching forecasts/i);
        expect(errorElement).toBeInTheDocument();
    });
    test('with fetch state = FETCHING displays Fetching', () => {
        // GIVEN
        const state = ApiState.FETCHING

        // WHEN
        render(<TemperaturesWithTestContext state={state} location={'location'}/>);

        // THEN
        const element = screen.getByText(/Fetching/i);
        expect(element).toBeInTheDocument();
    });
    test('with no location, displays Enter a location', () => {
        // GIVEN
        const state = ApiState.INIT
        const location = ""

        // WHEN
        render(<TemperaturesWithTestContext state={state} location={location}/>);

        // THEN
        const element = screen.getByText(/Enter a location/i);
        expect(element).toBeInTheDocument();
    });

})

const TemperaturesWithTestContext = (props: {state: ApiState, location: string}) => {
    const [records, setRecords] = useState<RecordField[]>([]);
    const [recordState, setRecordState] = useState(props.state);
    const [location, setLocation] = useState(props.location)

    return <MeteoContext.Provider value={{records, setRecords, location, setLocation, recordState}}><Temperatures/></MeteoContext.Provider>
}