import useSWR from "swr";
import { fetcher } from "./axios";

const useAlphaVantage = (params) => {

    const seriesData = useSWR(
        ["/query", params],
        fetcher,
        {
            refreshInterval: 20000
        }
    );

    if (seriesData.error) return null;

    console.log(seriesData.data);

    if (seriesData.data) {
        const data = seriesData.data["Time Series (Daily)"];

        if (!data) return null;

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