import axios from "axios";

export async function getGenres () {
    try {
        const genres = await axios.get(
            `http://localhost:3002/genres`
        );

        if (genres.status === 200) {
            return genres.data.genres
        }

        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
}