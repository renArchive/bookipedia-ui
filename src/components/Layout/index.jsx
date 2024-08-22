
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';
import Header from '../../components/Header';

function Layout ({children}) {
    const books = useSelector((state) => state.books.books.book);
    const searchTerm = useSelector((state) => state.books.searchTerm);
    const [searchResults, setSearchResults] = useState([]);
    const [showCover, setShowCover] = useState({
        title : '',
        cover: ''
    });

    useEffect(() => {
        if (!!searchTerm) {
            console.log('Change in search term', searchTerm);
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

    return(
        <div className='layout_div'>
            <Header/>
            <main>
            {searchTerm && (
                <div className='searchResults_div'>
                    <p>{searchResults.length} Results</p>
                    <div className='searchResults_list'>
                        <ul>
                            {searchResults.map(item => {
                                return <li key={item.id} onMouseOver={(e) => handleEvent(e)}>{item.title}</li>
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
                {children}
            </main>
        </div>
    )
};

export default Layout;