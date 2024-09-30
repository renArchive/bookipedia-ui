import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Tags from '../../components/Tags';
import Layout from '../../components/Layout';
import Paginator from '../../components/Paginator';
import Catalogue from '../../components/Catalogue';
import { useBookState } from '../../hooks/useBookState';
import { Select, SortSelect } from '../../components/Select';
import './styles.css';

function Books () {
    const {
        state,
        handleFilter,
        handleGenres,
        handleNewPage,
        handleNextPage,
        handlePrevPage,
        handleSortDirection,
        handleSort,
        handleShowFilters
    } = useBookState();

    const {
        showFilters,
        sort,
        sortProperty,
        filterByAuthor,
        filterByGenre,
        filterBySeries,
        authors,
        series,
        genres,
        isLoading,
        catalogue,
        totalBooks,
        currentPage,
        totalPages
    } = state;


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
                                disabled={filterBySeries !== 'All' ? true : false}
                            />
                            <Select
                                type="Series"
                                options={series}
                                handleFilter={handleFilter}
                                filter={filterBySeries}
                                disabled={filterByAuthor !== 'All' ? false : true}
                            />
                          <Tags
                            genres={genres}
                            currentFilters={filterByGenre}
                            clickableTags={filterByAuthor === 'All' && filterBySeries === 'All'? true : false}
                            handleGenres={handleGenres}
                          />
                        </div>
                    </div>
                    <div className='filters_buttons' onClick={() => handleShowFilters()}>
                        Filters
                        <ExpandLessIcon/>
                    </div>
                </section>
            ): (
                <div className='filters_buttons filters_background' onClick={() => handleShowFilters()}>
                    Filters
                    <ExpandMoreIcon/>
                </div>
            )}
            {!isLoading && catalogue.length !== 0 && (
                <Paginator
                    totalBooks={totalBooks}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    handleNewPage={handleNewPage}
                >
                  <Catalogue catalogue={catalogue} />
                </Paginator>
            )}
            {!isLoading && catalogue.length === 0 && <div>No Books Found :C</div> }
        </Layout>
    )
}

export default Books;