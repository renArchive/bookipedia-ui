import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import './styles.css';
import Layout from "../../components/Layout";
import Tags from '../../components/Tags';
import { getBooks } from '../../api/books';
import { getGenres } from '../../api/genres';
import { getAuthors } from '../../api/authors';
import { getSeries } from '../../api/series';
import Paginator from '../../components/Paginator';
import { Select, SortSelect } from '../../components/Select';

function Catalogue () {
    const [catalogue, setCatalogue] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [series, setSeries] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [filterByAuthor, setFilterByAuthor] = useState('All');
    const [filterBySeries, setFilterBySeries] = useState('All');
    const [filterByGenre, setFilterByGenre] = useState([]);
    const [filterUpdate, setFilterUpdate] = useState(false);
    const [sortProperty, setSortProperty] = useState('title');
    const [sort, setSort] = useState('asc');

    useEffect(() => {
        getInitialData();
    }, []);

    useEffect(() => {
        if (filterUpdate) {
            getData();
        }
    }, [filterUpdate])

    const getInitialData = async () => {
        let sortBy = [sortProperty, sort];
        const genresList = await getGenres();
        const authorsList = await getAuthors();
        const seriesList = await getSeries();
        let genreFilter = genresList.map(e => e.id);
        const books = await getBooks({ filterByAuthor, filterBySeries, genreFilter, sortBy, currentPage });

        if (!!books) {
            setCatalogue(books.books);
            setAuthors(authorsList);
            setSeries(seriesList);
            setGenres(genresList);
            setTotalBooks(books.total);
            setFilterByGenre(books.bookGenres);
            setTotalPages(Math.round(books.total / 12));
        }
    }

    const getData = async () => {
        let genreFilter = filterByGenre.map(e => e.id);
        let sortBy = [sortProperty, sort];

        const books = await getBooks({ filterByAuthor, filterBySeries, genreFilter, sortBy, currentPage });

        if (!!books) {
            setCatalogue(books.books);
            setTotalBooks(books.total);
            setFilterByGenre(books.bookGenres);
            setTotalPages(Math.round(books.total / 12));

            if(filterUpdate) setFilterUpdate(false);
        }
    }

    const handleGenres = (genre) => {
        const checkGenre = filterByGenre.findIndex(e => e.id === genre.id);
        if (checkGenre !== -1) {
            const genres = filterByGenre.filter(e => e.id !== genre.id);
            setFilterByGenre(genres);
        } else {
            setFilterByGenre([...filterByGenre, genre]);
        }
        setFilterUpdate(true);
    }

    const handleAuthorFilterReset = () => {
        setFilterByAuthor('All');
        setFilterBySeries('All');
        setFilterByGenre(genres);
    }

    const handleAuthorFilter = (optionIndex) => {
        setFilterByAuthor(authors[optionIndex].id);
        setFilterBySeries('All');
    }

    const handleSeriesFilter = (optionIndex) => {
        setFilterBySeries(series[optionIndex].id)
        setSortProperty('order');
    }

    const handleSeriesFilterReset = () => {
        setFilterBySeries('All');
        setFilterByGenre(genres);
        setSortProperty('title');
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
        setFilterUpdate(true);
    }

    const handleSort = (e) => {
        setSortProperty(e.target.value);
        setFilterUpdate(true);
    }

    const handleSortDirection = (e) => {
        setSort(e.target.value);
        setFilterUpdate(true);
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setFilterUpdate(true);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setFilterUpdate(true);
        } 
    }

    const handleNewPage = (e) => {
        setCurrentPage(parseInt(e.target.value));
        setFilterUpdate(true);
    }

    return (
        <Layout>
            {showFilters ? (
                <section className='filters_section filters_background'>
                    <div className='filters_sort'>
                        <h3>Sorts</h3>
                        <SortSelect
                            sort={sort}
                            sortProperty={sortProperty}
                            filterBySeries={filterBySeries}
                            handleSort={handleSort}
                            handleSortDirection={handleSortDirection}
                        />
                    </div>
                    <div className='filters_container'>
                        <h3>Filters</h3>
                        <div>
                            <Select
                                type="Author"
                                options={authors}
                                handleFilter={handleFilter}
                                filter={filterByAuthor}
                            />
                            <Select
                                type="Series"
                                options={series}
                                handleFilter={handleFilter}
                                filter={filterBySeries}
                            />
                          <Tags
                            genres={genres}
                            currentFilters={filterByGenre}
                            clickableTags={filterByAuthor === 'All' && filterBySeries === 'All'? true : false}
                            handleGenres={handleGenres}
                          />
                        </div>
                    </div>
                    <div className='filters_buttons' onClick={() => setShowFilters(false)}>
                        Filters
                        <ExpandLessIcon/>
                    </div>
                </section>
            ): (
                <div className='filters_buttons filters_background' onClick={() => setShowFilters(true)}>
                    Filters
                    <ExpandMoreIcon/>
                </div>
            )}
            <Paginator
                totalBooks={totalBooks}
                currentPage={currentPage}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleNewPage={handleNewPage}
            >
                <div className="catalogue_container">
                    {
                        catalogue.map(book => {
                            return(
                                <div key={book.id} className='catalogue_card'>
                                    <img src={book.cover} alt={book.name}/>
                                    <div className='catalogue_overlay'>
                                        <div className='catalogue_rate'>
                                            <div>{book.rate}</div>
                                            <StarIcon color="warning" fontSize='large'/>
                                        </div>
                                        <label><a href={`/books/${book.id}`}>See details</a></label>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </Paginator>
        </Layout>
    )
}

export default Catalogue;