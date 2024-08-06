
import './styles.css';
import Header from '../../components/Header';

function Layout ({children}) {
    return(
        <div className='layout_div'>
            <Header/>
            <main>{children}</main>
        </div>
    )
};

export default Layout;