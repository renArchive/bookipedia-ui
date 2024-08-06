import axios from "axios";

export async function getBooks({ filterByAuthor, filterBySeries, genreFilter, sortBy, currentPage }) {
    try {
        const books = await axios.get(
            `http://localhost:3002/books?author=${filterByAuthor}&series=${filterBySeries}&genres=${JSON.stringify(genreFilter)}&sortBy=${JSON.stringify(sortBy)}&page=${currentPage}`
        );

        if (books.status === 200) {
            return books.data
        }

        return null
    } catch (e) {
        console.log(e);
    }
}