import StarIcon from '@mui/icons-material/Star';
import './styles.css';

function Catalogue ({ catalogue }) {
    return (
        <div className="catalogue_container">
            {
                catalogue.map(book => {
                    return(
                        <div key={book.id} className='catalogue_card'>
                            <img src={book.cover} alt={book.name}/>
                            <div className='catalogue_overlay'>
                                <div className='catalogue_rate'>
                                    <div>{book.rate}</div>
                                    <StarIcon color="warning" fontSize='large'/>
                                </div>
                                <label><a href={`/books/${book.id}`}>View details</a></label>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default Catalogue;