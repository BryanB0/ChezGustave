//Import
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { BandeauChoix } from "../../components/BandeauChoix/BandeauChoix";
import { FormRecherche } from "../../components/ExampleComponent/FormRecherche/FormRecherche";
import { Footer } from "../../components/Footer/Footer";
import logo from "./../../../public/logo.png";
import logoMini from "./../../../public/icon/logo-mini.png";
import iconUser from "./../../../public/icon/utilisateur.png";
import iconBurger from "./../../../public/icon/burger-bar.png";
import Carousel from "../../components/CarouselMobile/CarousselMobile";
import useWindowSize from "../../components/useWindowResize";

//home component
export default function Home() {

  // Using useWindowSize hook to get window size
  const [width, height] = useWindowSize();
  // State to determine if device is mobile based on window width
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 700px)").matches)

  // Effect triggered on each window width change
  useEffect(() => {
    // Update isMobile state based on window width 
    setIsMobile(window.matchMedia("(max-width: 700px)").matches)
  }, [width])

  return (
    <div>
      <nav className={styles['navbar']}>

        {/* Logo */}
        <img className={styles['logo']} src={logo} alt="logo" />
        <img id={styles['logoMini']} src={logoMini} alt="logo version mobile"/>

        {/* Title */}
        <h1 id={styles['title']}>Les vacances chez Gustave</h1>

        {/* User and burger icons */}
        <div id={styles ['containerIcon']}>
          <img id={styles['iconUser']} src={iconUser} alt="Logo de l'utilisateur/acces compte"/>
          <img id={styles['iconBurger']} src={iconBurger} alt="Logo du menu burger de recherche"/>
        </div>

        {/* Navigation buttons */}
        <ul className={styles['bouton']}>

          <li id={styles['btnCompte']}>
            <a href="/moncompte">Mon compte</a>
          </li>
          <li id={styles['btnConnecter']}>
            <a href="/seconnecter">Se connecter</a>
          </li>
          
        </ul>
      </nav>
      {/* Search form */}
      <FormRecherche />

      {/* Display choice banner if not mobile */}
      {!isMobile && <BandeauChoix/>}

      {/* Display carousel if mobile */}
      {isMobile && <Carousel />}
      
      <Footer/>
    </div>
  );
}