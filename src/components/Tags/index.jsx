import CloseIcon from '@mui/icons-material/Close';

function renderClickableTags ({genres, currentFilters, handleGenres}) {
    return (
        <ul>
        {genres.map(option => {
            const checkFilter = currentFilters.findIndex(e => e.id === option.id);
            if (checkFilter !== -1) {
                return (
                    <li key={option.id}>
                        <div 
                            className='filters_genres_selected'
                            onClick={() => handleGenres(option)}
                        >
                          {option.name}
                          <CloseIcon fontSize='small'/>
                        </div>
                    </li>
                )
            } 
            return (
                <li key={option.id} >
                    <div
                        className='filters_genres'
                        onClick={() => handleGenres(option)}
                    >
                        {option.name}
                    </div>
                </li>
            )
        })}
      </ul>
    )
}

function renderLabelTag ({genres, currentFilters}) {
    return (
        <ul>
        {genres.map(option => {
            const checkFilter = currentFilters.findIndex(e => e.id === option.id);
            if (checkFilter !== -1) {
                return (
                    <li key={option.id}>
                        <div className='filters_label_selected'>
                          {option.name}
                        </div>
                    </li>
                )
            } 
            return (
                <li key={option.id} >
                    <div className='filters_label'>
                        {option.name}
                    </div>
                </li>
            )
        })}
      </ul>
    )
}

function Tags ({genres, currentFilters, clickableTags, handleGenres}) {
    return (
        <>
            <div className='filter_tagLbl'>Genres: </div>
            <div className='filters'>
                {clickableTags
                    ? renderClickableTags({genres, currentFilters, handleGenres})
                    : renderLabelTag({genres, currentFilters})
                }
            </div>
        </>
    )
}

export default Tags;