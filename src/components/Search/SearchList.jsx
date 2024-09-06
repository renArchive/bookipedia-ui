import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './styles.css';

export default function SearchList () {
    const navigate = useNavigate();
    
    const books = useSelector((state) => state.books.books.book);
    const searchTerm = useSelector((state) => state.books.searchTerm);
    const [searchResults, setSearchResults] = useState([]);
    const [showCover, setShowCover] = useState({
        title : '',
        cover: ''
    });

    useEffect(() => {
    
        if (!!searchTerm) {
            filterBooks();
            setShowCover({
                title: '',
                cover: ''
            });
        }
    }, [searchTerm]);

    function filterBooks () {
        const filteredList = books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(filteredList);
    }

    function handleEvent (e) {
        const book = searchResults.find(book => book.title === e.target.innerText);
        if (!!book) {
            setShowCover({
                title: book.title,
                cover: book.cover
            });
        }
    }

    return (
        <>{searchTerm && 
        (
            <div className='searchResults_div'>
                <p>{searchResults.length} Results</p>
                <div className='searchResults_list'>
                    <ul>
                        {searchResults.map(item => {
                            return <li key={item.id} onClick={() => navigate(`book/${item.id}`)} onMouseOver={(e) => handleEvent(e)}>{item.title}</li>
                        })}
                    </ul>
                </div>
                <div className='searchResults_cover_div'>
                    {showCover.title && (
                        <img className='searchResults_cover' src={showCover.cover} alt={showCover.title}/>
                    )}
                </div>
            </div>
        )}
        </>

    )
}