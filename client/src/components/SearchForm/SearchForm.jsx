import styles from './SearchForm.module.css';
import { API_URL } from '../../consts';
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const SearchForm = ({setResultsToDisplay}) => {
    const navigate = useNavigate();
    const location = useLocation();  

    // Save the value of filters into local storage 
    const saveFiltersToLocalStorage = (filtres) => {
        localStorage.setItem('filtres', JSON.stringify(filtres));
    };
  
    // Load the value of filters saved from local storage if this is the results page. Else, load blank filters values.
    const loadFiltersFromLocalStorage = () => { 
      let filtres = {
          secteur: '',
          chambre: '',
          categorie: '',
          types: {
            Manoir: false,
            Villa: false,
            Chalet: false,
            Atypique: false,
            Appartement: false,
            Maison: false
          }
        }
      if (location.pathname === '/results') {
        const storedFilters = localStorage.getItem('filtres');
        return storedFilters ? JSON.parse(storedFilters) : filtres;
      } else {
        return filtres 
      } 
    };
    //Initialize the constant with the loadFilters function
    const [filtres, setFiltres] = useState(loadFiltersFromLocalStorage());

    // Fetch request function to retrieve all housing from the database
    const getLogements = async () => {
        try {
            const response = await fetch(`/logements.json`);
            const data = await response.json();
            if (response.status === 200) {
                return data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Search submit function to retrieve all housing and filter them.
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        let resultsToFilter = await getLogements()
        let resultsToDisplay = filterLogements(resultsToFilter);
        // If it's not the results page, filter the results, then navigate to the results page with the filtered results in the state of the page
        if (location.pathname !== '/results') {
            navigate('/results', {state:{results : resultsToDisplay}}) 
        } else {
        // else store the results into a constant with the component props (setter)
            setResultsToDisplay(resultsToDisplay);
        }
    }

    // Manage filters values
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          setFiltres({
            ...filtres,
            types: {
              ...filtres.types,
              [name]: checked
            }
          });
        } else {
          setFiltres({
            ...filtres,
            [name]: value
          });
        }
    };

    // Filter function
    const filterLogements = (resultsToFilter) => {
        let filteredLogements = resultsToFilter;
        // Sector filtering
        if (filtres.secteur) {
        filteredLogements = filteredLogements.filter(logement => logement.secteur.toLowerCase().includes(filtres.secteur.toLowerCase()));
        }
        // category filter
        if (filtres.categorie) {
            filteredLogements = filteredLogements.filter(logement => logement.categorie === filtres.categorie);
        }
        // type filter
        if (Object.values(filtres.types).some(type => type)) {
            filteredLogements = filteredLogements.filter(logement => Object.keys(filtres.types).some(type => filtres.types[type] && logement.type === type));
        }
        // room number filter
        if (filtres.chambre) {
            filteredLogements = filteredLogements.filter(logement => filtres.chambre == logement.chambre);
        }
        // If no filter, return all the housing
        if (!filtres.secteur && !filtres.chambre && !filtres.categorie && !Object.values(filtres.types).some(type => type)) {
            filteredLogements = resultsToFilter;
        }
        return filteredLogements;
    };
    
    useEffect(() => {
      // Save all filters in the local storage, with each filter change 
      saveFiltersToLocalStorage(filtres);
    }, [filtres]);
    

    return (
        <>
        {filtres &&
        <section className={styles.searchFormSection}>
            <form method="get" id={ styles.searchForm } onSubmit={handleSearchSubmit}>
                <span className={ `${styles.champs} ${styles.secteur}` }>
                    <label htmlFor="secteur">Où allez-vous ?</label>
                    <input type="text" name="secteur" id="secteur" value={filtres.secteur} onChange={handleChange}/>
                </span>
                <span className={ `${styles.champs} ${styles.categorie}` }>
                    <label htmlFor="categorie">Catégories</label>
                    <div>
                        <select name="categorie" id="categorie" value={filtres.categorie} onChange={handleChange}>
                            <option value="">- Sélectionner la catégorie -</option>
                            <option value="Bord de mer">Bord de mer</option>
                            <option value="Campagne">Campagne</option>
                            <option value="Montagne">Montagne</option>
                            <option value="Ville">Ville</option>
                        </select>
                    </div>
                </span>
                <span className={ `${styles.champs} ${styles.type}` }>
                    <label>Type</label>
                    <ul>
                    {Object.keys(filtres.types).map(type => (
                        <li key={type}>
                            <input type="checkbox" name={type} id={type} checked={filtres.types[type]} onChange={handleChange} />
                            <label htmlFor={type} > {type} </label>
                        </li>   
                    ))}
                    </ul>
                </span>
                <span className={ `${styles.champs} ${styles.chambre}` }>
                    <label htmlFor="chambre">Chambres</label>
                    <input type='number' name="chambre" id="chambre" value={filtres.chambre} onChange={handleChange}/>
                </span>

                <button type="submit" className={ styles.submitBtn }>Rechercher</button>
            </form>
        </section>
        }
        </>
    )
}