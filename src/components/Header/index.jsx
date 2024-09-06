import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Search from '../Search/SearchInput';
import { setSearchTerm } from '../../redux/bookSlice';
import './styles.css';

function Header () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLinks (href) {
        navigate(href);
        dispatch(setSearchTerm(""));
    }

    return (
        <header className='header'>
            <ul>
                <li><Search/></li>
                <li onClick={() => handleLinks('/')}>Home</li>
                <li onClick={() => handleLinks('/books')}>Books</li>
                <li onClick={() => handleLinks('/login')}>Login</li>
            </ul>
        </header>
    )
}

export default Header;