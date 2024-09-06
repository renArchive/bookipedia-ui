import Header from 'components/Header';
import SearchList from 'components/Search/SearchList';
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