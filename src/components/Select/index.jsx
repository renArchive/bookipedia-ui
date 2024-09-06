export function Select ({type, options, handleFilter, filter, disabled}) {
    return (
        <div className='filters'>
            <div className='filter_inputLbl'>{`${type}: `}</div>
            <select 
                className='filter_select'
                onChange={(e) => handleFilter(e, type)}
                name={type}
                id={type}
                disabled={disabled}
            >
                <option value={999} defaultValue={filter === 'All' ? true : false}>All</option>
                {options.map((option, index) => 
                  <option defaultValue={filter === option.id ? true : false} key={index} value={index}>{option.name}</option>
                )}
            </select>
        </div>
    )
}

export function SortSelect ({sort, sortProperty, filterBySeries, handleSort, handleSortDirection}) {
    return (
        <>
            <div className='sort_container'>
                <div className='filter_inputLbl'>Sort by:</div>
                <select name='sortType' id='sort' onChange={(e) => {handleSortDirection(e)}}>
                    <option defaultValue={sort === 'asc' ? true : false} value={'asc'} key={'asc'}>asc</option>
                    <option defaultValue={sort === 'desc' ? true : false} value={'desc'} key={'desc'}>desc</option>
                </select>
            </div>
            <div className='radioBtn_container'>
                <div className='sort_label'>Property:</div>
                <div>
                    <input
                        name="sortOpts"
                        type="radio"
                        id="title"
                        value="title"
                        checked={sortProperty === 'title'}
                        onChange={(e) => handleSort(e)}
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div>
                    <input
                        name="sortOpts"
                        type="radio"
                        id="rate"
                        value="rate"
                        checked={sortProperty === 'rate'}
                        onChange={(e) => handleSort(e)}
                    />
                    <label htmlFor="rate">Rate</label>
                </div>
                {filterBySeries !== 'All' && (
                    <div>
                        <input
                            name="sortOpts"
                            type="radio"
                            id="order"
                            value="order"
                            checked={sortProperty === 'order'}
                            onChange={(e) => handleSort(e)}
                        />
                        <label htmlFor="rate">Series Order</label>
                    </div>
                )}
            </div>
        </>
    )
}