import { useState, useEffect } from "react";
import { getGenres } from "api/genres";
import { getAuthors } from "api/authors";
import { getSeries } from "api/series";
import { getBooks } from "api/books";

export const useBookState = () => {
    const [state, setState] = useState({
        catalogue: [],
        authors: [],
        genres: [],
        series: [],
        totalBooks: 0,
        totalPages: 0,
        currentPage: 1,
        filterByAuthor: 'All',
        filterBySeries: 'All',
        filterByGenre: [],
        sortProperty: 'title',
        sort: 'asc',
        shouldFetchData: false,
        showFilters: false,
        isLoading: true
    })


    useEffect(() => {
        getInitialData();
    }, []);

    useEffect(() => {
        if (state.shouldFetchData) {
            getData();
        }
    }, [state.shouldFetchData])

    const getInitialData = async () => {
        const {
            sortProperty,
            sort,
            filterByAuthor,
            filterBySeries,
            currentPage
        } = state;

        let sortBy = [sortProperty, sort];
        const genresList = await getGenres();
        const authorsList = await getAuthors();
        const seriesList = await getSeries();

        if (!!genresList) {
            let genreFilter = genresList.map(e => e.id);
    
            const books = await getBooks({ filterByAuthor, filterBySeries, genreFilter, sortBy, currentPage });
    
            if (!!books) {
                const pagesToDisplay = books.total < 12 ? 1 : Math.ceil(books.total / 12);
                setState({
                    ...state,
                    catalogue: books.books,
                    authors: authorsList,
                    series: seriesList,
                    genres: genresList,
                    totalBooks: books.total,
                    filterByGenre: books.bookGenres,
                    totalPages: pagesToDisplay,
                    isLoading: false,
                    shouldFetchData: false
                });
            }
        }
    }

    const getData = async () => {
        const {
            filterByGenre,
            sortProperty,
            sort,
            filterByAuthor,
            filterBySeries,
            currentPage
        } = state;

        let genreFilter = filterByGenre.map(e => e.id);
        let sortBy = [sortProperty, sort];

        const books = await getBooks({ filterByAuthor, filterBySeries, genreFilter, sortBy, currentPage });

        if (!!books) {
            const pagesToDisplay = books.total < 12 ? 1 : Math.ceil(books.total / 12);

            setState({
                ...state,
                catalogue: books.books,
                totalBooks: books.total,
                filterByGenre: books.bookGenres,
                totalPages: pagesToDisplay,
                shouldFetchData: false
            });
        }
    }

    const handleGenres = (genre) => {
        const { filterByGenre } = state;
        const checkGenre = filterByGenre.findIndex(e => e.id === genre.id);
        if (checkGenre !== -1) {
            const genres = filterByGenre.filter(e => e.id !== genre.id);
            setState({
                ...state,
                filterByGenre: genres,
                shouldFetchData: true
            });
        } else {
            setState({
                ...state,
                filterByGenre: [...filterByGenre, genre],
                shouldFetchData: true
            });
        }
    }

    const handleAuthorFilterReset = () => {
        setState({
            ...state,
            filterByAuthor: 'All',
            filterBySeries: 'All',
            filterByGenre: state.genres,
            shouldFetchData: true
        });
    }

    const handleAuthorFilter = (optionIndex) => {
        setState({
            ...state,
            filterByAuthor: state.authors[optionIndex].id,
            filterBySeries: 'All',
            shouldFetchData: true
        });
    }

    const handleSeriesFilter = (optionIndex) => {
        setState({
            ...state,
            filterBySeries: state.series[optionIndex].id,
            sortProperty: 'order',
            shouldFetchData: true
        });
    }

    const handleSeriesFilterReset = () => {
        setState({
            ...state,
            filterBySeries: 'All',
            filterByGenre: state.genres,
            sortProperty: 'title',
            shouldFetchData: true
        });
    }

    const handleFilter = (e, type) => {
        const optionIndex = e.target.value;
        switch(type) {
            case 'Author':
                optionIndex !== '999' ?  handleAuthorFilter(optionIndex) : handleAuthorFilterReset();
                break;
            default:
                optionIndex !== '999' ? handleSeriesFilter(optionIndex) : handleSeriesFilterReset();
                break;
        }
    }

    const handleSort = (e) => {
        setState({
            ...state,
            sortProperty: e.target.value,
            shouldFetchData: true
        });
    }

    const handleSortDirection = (e) => {
        setState({
            ...state,
            sort: e.target.value,
            shouldFetchData: true
        });
    }

    const handleNextPage = () => {
        const { currentPage, totalPages } = state;

        if (currentPage < totalPages) {
            setState({
                ...state,
                currentPage: currentPage + 1,
                shouldFetchData: true
            });
        }
    }

    const handlePrevPage = () => {
        const { currentPage } = state;
        if (currentPage > 1) {
            setState({
                ...state,
                currentPage: currentPage - 1,
                shouldFetchData: true
            });
        } 
    }

    const handleNewPage = (e) => {
        setState({
            ...state,
            currentPage: parseInt(e.target.value),
            shouldFetchData: true
        });
    }

    const handleShowFilters = () => {
        setState({
            ...state,
            showFilters: !state.showFilters
        });
    }

    return {
        state,
        handleNewPage,
        handlePrevPage,
        handleNextPage,
        handleSort,
        handleSortDirection,
        handleFilter,
        handleSeriesFilterReset,
        handleSeriesFilter,
        handleGenres,
        getData,
        getInitialData,
        handleShowFilters
    }
}