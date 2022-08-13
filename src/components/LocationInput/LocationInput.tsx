import React, {ChangeEvent, useContext, useState} from "react";
import {MeteoContext} from "../../context/MeteoContext";

export function LocationInput() {
    const [stateLoc, setStateLoc] = useState('')
    const {setLocation} = useContext(MeteoContext)

    const updateLocation = (event: ChangeEvent<HTMLInputElement>) => {
        setStateLoc(event.target.value)
        debounce(() => setLocation(event.target.value), 250)
    }

    return <input value={stateLoc} onChange={updateLocation} placeholder={'Location'}/>
}

let debounceTimer: any;
const debounce = (callback: () => void, time: number) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, time);
};