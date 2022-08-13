import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {LocationInput} from "./components/LocationInput/LocationInput";
import {Temperatures} from "./components/Temperatures/Temperatures";
import {MeteoContextProvider} from "./context/MeteoContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MeteoContextProvider>
          <div className="App">
              <LocationInput/>
              <Temperatures/>
          </div>
      </MeteoContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
