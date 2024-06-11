import react, {useState} from "react";
import styles from "./Footer.module.css";
import logo from "./../../../public/logo.png";


export const Footer = () => {

    return(
        <div>
            <footer className={ styles['footer'] }>
            <img className={ styles['logo'] } src={logo} alt="logo" />
            <a id={ styles ['propriety']} href="/propriety">© Les vacances chez Gustave . Tous droits réservés.</a>
            <div className={ styles['legalLink']}>
                <a href="/mentionslegales">Mentions légales</a>
                <a href="/gestioncookies">Gestion des cookies</a>
                <a href="/societeetassociees">Qui sommes-nous ?</a>
            </div>
            </footer>
        </div>
    )
}