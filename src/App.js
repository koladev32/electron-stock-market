import { useState } from 'react';

import Chart from 'react-apexcharts'
import useAlphaVantage from './useAlphaVantage';

import { symbols } from './api';

import './App.css';

function App() {


  const [symbol, setSymbol] = useState("MSFT");

  const dataAlpha = useAlphaVantage(`?symbol=${symbol}`);

  if (!dataAlpha) return <div>Loading...</div>;

  const state = {
          
    series: [{
      data: dataAlpha
    }],
    options: {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    },  
  };

  return (
    <div>
      <div>
        <select className="select" value={symbol} onChange={e => {setSymbol(e.target.value)}}>
          {symbols.map(symbol => <option key={symbol} value={symbol}>{symbol}</option>)}
        </select>
      </div>
      <Chart options={state.options} series={state.series} type="candlestick" height={350} />
    </div>
  );
}

export default App;
