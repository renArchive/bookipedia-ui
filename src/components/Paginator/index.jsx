import './styles.css'
export default function Paginator (props) {

    const renderControls = () => {
        const {
            totalBooks,
            currentPage,
            totalPages,

        } = props;

        const renderOptions = () => {
            const options = [];
            for (let i = 1; i <= totalPages; i++) {
                options.push(<option selected={currentPage === i ? true : false} key={i} value={i}>Page {i}</option>);
            }

            return options
        }

        return (
            <div className='paginator'>
                <div>
                    <label>Page {currentPage} of {totalPages} - {totalBooks} Books</label>
                </div>
                <div>
                    <button
                        title='Previous Page'
                        disabled={currentPage === 1 ? true : false}
                        onClick={() => props.handlePrevPage()}
                    >
                        {'<'}
                    </button>
                    <select name="page_selector" onChange={(e) => props.handleNewPage(e)}>
                        {renderOptions()}
                    </select>
                    <button
                        title='Next Page'
                        disabled={currentPage === totalPages ? true : false}
                        onClick={() => props.handleNextPage()}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {renderControls()}
            {props.children}
            {renderControls()}
        </>
    )
}