//Import
import React, { useState } from "react";
import styles from "./FormRecherche.module.css";

// Component FormRecherche that allows users to input search data
export const FormRecherche = () => {
  // Declaring a state to store the user input value
  const [inputValue, setInputValue] = useState('');

  // Function to update the input value when it changes
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevents the default form submission behavior (page reload)
    e.preventDefault();
    // Logs the input value to the console
    console.log('Recherche:', inputValue);
  };

  return (
    <div id={ styles['form'] }>
        <form onSubmit={handleSubmit}> 
            <label className={ styles['label'] }>
                <div>
                    Où allez-vous ?
                    <input type="text" value={inputValue} onChange={handleChange} />
                </div>
                <div>
                    Départ
                    <input type="text" value={inputValue} onChange={handleChange} />
                </div>
                <div>
                    Arrivée
                    <input type="text" value={inputValue} onChange={handleChange} />
                </div>
                <div>
                    Chambres
                    <input type="text" value={inputValue} onChange={handleChange} />
                </div>
                    <button type="submit">Rechercher</button>
            </label>   
        </form>
    </div>
  );
};