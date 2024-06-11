//Importation
import { useState } from "react";
import styles from "./CarousselMobile.module.css";

//Importation img
import campagne from "/campagne.png";
import bordMer from "/bordMer.png";
import montagne from "/montagne.png";
import ville from "/ville.png";
import arrowR from "/icon/fleche-droite.png";
import arrowL from "/icon/fleche-gauche.png";

//caroussel
const Carousel = () => {
  // Declaration of state for current carousel index and function to update it
  const [currentIndex, setCurrentIndex] = useState(0);

  // Arrays for image paths, captions, and links
  const images=[campagne, bordMer, montagne, ville];
  const captions=["A la campagne", "En bord de mer", "A la montagne", "En ville"];
  const links = ["/selection-campagne", "/selection-bord-de-mer", "/selection-montagne", "/selection-ville"];

// Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

// Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Rendering the Carousel component
  return (
    <div className={styles['container']}>
      <div className={styles['texte']}>
        <p className={styles['p1']}>Voyager en France</p>
        <p className={styles['p2']}>Pourquoi pas ici ?</p>
      </div>
      <div className={ styles['carousel']}>
        <button className={styles['btnArrowL']} onClick={prevSlide}>
          <img className={styles['arrowL']} src={arrowL} alt="bouton flecher pour le caroussel"/>
        </button>
        <div className={ styles['slide'] }>
          <img className={ styles['slideActive'] } src={images[currentIndex]} />
          <a href={links[currentIndex]} className={styles['caption']}>{captions[currentIndex]}</a>
        </div>
        <button className={styles['btnArrowR']} onClick={nextSlide}>
        <img className={styles['arrowR']} src={arrowR} alt="bouton flecher pour le caroussel"/>
        </button>
      </div>
    </div>
  );
};
  
  export default Carousel;