import React, {createContext, useEffect, useState} from "react";

export enum ApiState {
    INIT = 'INIT',
    FETCHING = 'FETCHING',
    OK = 'OK',
    ERROR = 'ERROR'
}

export type RecordField = {
    temperature: number
    forecast: string
}
const noop = () => {/*default noop value*/
}
export const MeteoContext = createContext<{ recordState: ApiState, setRecords: (records: RecordField[]) => void, records: RecordField[], location: string, setLocation: (loc: string) => void }>({
    setRecords: noop,
    records: [],
    setLocation: noop,
    location: '',
    recordState: ApiState.INIT
})


export function MeteoContextProvider(props: React.PropsWithChildren<{}>) {
    const [records, setRecords] = useState<RecordField[]>([]);
    const [recordState, setRecordState] = useState(ApiState.INIT);
    const [location, setLocation] = useState("")

    useEffect(() => {
        const fetchMeteo = async () => {
            setRecordState(ApiState.FETCHING)
            setRecords(await fetchMeteoFromLocation(location))
            setRecordState(ApiState.OK)
        }

        fetchMeteo().catch((e) => {
            setRecordState(ApiState.ERROR)
            console.error(e)
        });
    }, [location]);

    return (
        <MeteoContext.Provider value={{records, setRecords, location, setLocation, recordState}}>
            {props.children}
        </MeteoContext.Provider>
    )
}

async function fetchMeteoFromLocation(location: string): Promise<RecordField[]> {
    if (!location) {
        return []
    }

    const peliasResponse = await (await fetch(`http://pelias.smappen.com:4000/v1/search?text=${location}`)).json()
    if (!!peliasResponse.features && peliasResponse.features[0]) {
        const coordinates = peliasResponse.features[0].geometry.coordinates
        const latitude = Math.round(coordinates[1] * 2) / 2
        const longitude = Math.round(coordinates[0] * 2) / 2
        const meteoResponse = await (await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=arpege-05-sp1_sp2&q=&sort=-forecast&facet=forecast&geofilter.distance=${latitude}%2C${longitude}%2C1000&fields=forecast,temperature&rows=40`)).json()
        return meteoResponse.records.map((rec: any) => rec.fields)
    }
    return []
}
