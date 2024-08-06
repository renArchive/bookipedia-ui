import { useState } from "react";
import { images } from '../../mockData/carousel';
import './styles.css';

function Carousel () {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImg, setSelectedImg] = useState(images[0]);

    const previousImg = () => {
        const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
        setSelectedImg(images[prevIndex]);
        setSelectedIndex(prevIndex);
    }

    const nextImg = () => {
        const nextIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
        setSelectedImg(images[nextIndex]);
        setSelectedIndex(nextIndex);
    }

  return (
    <div className="carousel" style={{backgroundImage: `url(${selectedImg.src})`}}>
        <div >
          <button className="carousel_buttons" onClick={previousImg}>{'<'}</button>
        </div>
        <div className="carousel_description">
            {selectedImg.description}
        </div>
        <div>
          <button className="carousel_buttons" onClick={nextImg}>{'>'}</button>
        </div>
    </div>
  )
}

export default Carousel;