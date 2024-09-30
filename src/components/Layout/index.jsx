import Header from '../Header';
import SearchList from '../Search/SearchList';
import './styles.css';

function Layout ({children}) {

    return(
        <div className='layout_div'>
            <Header/>
            <main>
                <SearchList/>
                {children}
            </main>
        </div>
    )
};

export default Layout;