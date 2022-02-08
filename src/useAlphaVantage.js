import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { API_URL } from "./api";

const useAlphaVantage = (symbol, vantageFunction="TIME_SERIES_DAILY") => {
    
    const [apiParams] = useState({
        function: vantageFunction,
        symbol: symbol,
        outputsize: "compact",
        apikey: "9PRDFA9QWXCAP88V"
    });

    const seriesData = useSWR(
        `${API_URL}?${new URLSearchParams(apiParams).toString()}`,
        axios
    );

    if (seriesData.error) return null;

    if (seriesData.data) {
        const data = seriesData.data.data["Time Series (Daily)"];

        const series = Object.keys(data).map(key => {

            const values = Object.values(data[key]);
            values.pop();
            return {
                x: key,
                y: values
            };
        });
        
        return series;
    }

}


export default useAlphaVantage;