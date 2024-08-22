import Search from '../Search';
import './styles.css';

function Header () {
    return (
        <header className='header'>
            <ul>
                <li><Search/></li>
                <li><a href='/'>Home</a></li>
                <li><a href='/books'>Books</a></li>
                <li><a href='/login'>Login</a></li>
            </ul>
        </header>
    )
}

export default Header;