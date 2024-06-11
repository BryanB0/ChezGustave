//Import
import react, {useState} from "react";
import styles from "./BandeauChoix.module.css";
import campagne from "/campagne.png";
import bordMer from "/bordMer.png";
import montagne from "/montagne.png";
import ville from "/ville.png";

import annonceMer from "/photodeLannonceMer.png";
import annonceHaute from "/photodeLannonceHaute.png";
import annonceBois from "/photodeLannonceBois.png";

//Component BandeauChoix for displaying choices and featured listings
export const BandeauChoix = () => {

    return (
        <div id={ styles['environChoix'] }>
            {/* Text section */}
            <div className={styles['texte']}>
                <p className={styles['p1']}>Voyager en France</p>
                <p className={styles['p2']}>Pourquoi pas ici ?</p>
            </div>

            {/* Choices section */}
            <div className={styles['lignCard']}>
                {/* Choice cards */}
                <div className={ styles['cardChoix'] }>
                    <img className={ styles['imgChoix']} src={campagne} alt="Image représentant la campagne"/>
                    <a href="*">A la campagne</a>
                </div>

                <div className={ styles['cardChoix'] }>
                    <img className={ styles['imgChoix']} src={bordMer} alt="Image représentant le bord de mer"/>
                    <a href="*">En bord de Mer</a>
                </div>

                <div className={ styles['cardChoix'] }>
                    <img className={ styles['imgChoix']} src={montagne} alt="Image représentant la montagne"/>
                    <a href="*">A la montagne</a>
                </div>

                <div className={ styles['cardChoix'] }>
                    <img className={ styles['imgChoix']} src={ville} alt="Image représentant la ville"/>
                    <a href="*">En ville</a>
                </div>

            </div>
            {/* Text section for featured listings */}
            <div className={styles['texte']}>
                <p className={styles['p1']}>Laisser-vous tenter par nos coups de coeur</p>
                <p className={styles['p2']}>Nos locations les mieux notées</p>
            </div>

            {/* Featured listings section */}
            <div className={styles['lignCard']}>
                {/* Featured listing cards */}
                <div className={ styles['cardLocation'] }>
                    <img className={ styles['imgLocation']} src={annonceMer} alt="Image représentant une location de villa en bord de mer"/>
                    <a href="*">Voir les détails</a>
                </div>

                <div className={ styles['cardLocation'] }>
                    <img className={ styles['imgLocation']} src={annonceHaute} alt="Image représentant une location de villa haute avec piscine"/>
                    <a href="*">Voir les détails</a>
                </div>

                <div className={ styles['cardLocation'] }>
                    <img className={ styles['imgLocation']} src={annonceBois} alt="Image représentant une location de villa avec piscine et sous-bois"/>
                    <a href="*">Voir les détails</a>
                </div>

            </div>

        </div>
    )

}

