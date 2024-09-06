import axios from "axios";

export async function getSeries () {
    try {
        const series = await axios.get(
            `http://localhost:3002/series`
        );

        if (series.status === 200) {
            return series.data.series
        }

        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
}