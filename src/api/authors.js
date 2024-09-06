import axios from "axios";

export async function getAuthors () {
    try {
        const authors = await axios.get(
            `http://localhost:3002/authors`
        );

        if (authors.status === 200) {
            return authors.data.authors
        }

        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}