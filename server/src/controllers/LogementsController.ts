import { Request, Response } from 'express';
import Logements from "../entities/Logements";
import Equipements from '../entities/Equipements';

// Création de la fonction getLogements qui récupère tous les logements.
export async function getLogements (req: Request, res: Response){
    res.send(await Logements.find());
}

// Création de la fonction createLogement qui crée un logement.
export async function createLogement (req: Request, res: Response){
    /* Si 'images' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants:
       secteur, description, tarif_bas, tarif_moyen ect.*/
    if(!('images' in req.body)) return res.status(400).send('Missing "images" field');
    if(!('secteur' in req.body)) return res.status(400).send('Missing "secteur" field');
    if(!('description' in req.body)) return res.status(400).send('Missing "description" field');
    if(!('tarif_bas' in req.body)) return res.status(400).send('Missing "tarif_bas" field');
    if(!('tarif_moyen' in req.body)) return res.status(400).send('Missing "tarif_moyen" field');
    if(!('tarif_haut' in req.body)) return res.status(400).send('Missing "tarif_haut" field');
    if(!('m_carre' in req.body)) return res.status(400).send('Missing "m_carre" field');
    if(!('chambre' in req.body)) return res.status(400).send('Missing "chambre" field');
    if(!('salle_de_bain' in req.body)) return res.status(400).send('Missing "salle_de_bain" field');
    if(!('categorie' in req.body)) return res.status(400).send('Missing "categorie" field');
    if(!('type' in req.body)) return res.status(400).send('Missing "type" field');
    if(!('equipements' in req.body)) return res.status(400).send('Missing "equipements" field');

    const { images, secteur, description, tarif_bas, tarif_moyen, tarif_haut, m_carre, chambre, salle_de_bain, categorie, type, equipements } = req.body;

    const logement = new Logements();

    logement.images = images;
    logement.secteur = secteur;
    logement.description = description;
    logement.tarif_bas = tarif_bas;
    logement.tarif_moyen = tarif_moyen;
    logement.tarif_haut = tarif_haut;
    logement.m_carre = m_carre;
    logement.chambre = chambre;
    logement.salle_de_bain = salle_de_bain;
    logement.categorie = categorie;
    logement.type = type;

    /**
     * equipements: number[] // les equipements sont passer sous la forme d'une liste de nombre, les id des équipements a ajouter
     * Ensuite faut boucler dessus avec un `for(const equipement of equipements)`
     * Ensuite pour chaque `equipement` faut le récup avec le model Equipement
     * Ensuite l'equipement récup faut le push dans logement.equipements
     * 
     * Voila voila, bisous et la bonne chance
     */

    // logement.equipements = equipements;
    // equipements.forEach((equipement: string[]) => {
    // }); 

    /*let i =0;
    logement.equipements.forEach(equipement =>{
        equipements[i] = equipement;
        i++;
    })*/


    //let number = equipements.map((equipement: Equipements)=> equipement.id);

for (const equipementId of equipements.id) {
    const equipement = await Equipements.findOne(equipementId);
    
    if (equipement) {
        logement.equipements.push(equipement.name);
    } else {
        console.error(`Equipement with ID ${equipementId} not found`);
    }
}

    


    // Sauvegarde un logement.
    await logement.save();

    // Renvoie le statut (201) Created qui signifie qu'un logement a bien été créer.
    res.sendStatus(201);
}

// Création de la fonction getLogement qui récupère un logement.
export async function getLogement (req: Request, res: Response){
    // Récupère un logement avec sont id (dans le body).
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!logement) return res.sendStatus(404);
    // Renvoie le logement.
    res.send(logement);
}

// Création de la fonction updateLogement qui met à jour les détails d'un logement.
export async function updateLogement (req: Request, res: Response){
    /* Si 'images' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants:
       secteur, description, tarif_bas, tarif_moyen ect.*/
       if(!('images' in req.body)) return res.status(400).send('Missing "images" field');
       if(!('secteur' in req.body)) return res.status(400).send('Missing "secteur" field');
       if(!('description' in req.body)) return res.status(400).send('Missing "description" field');
       if(!('tarif_bas' in req.body)) return res.status(400).send('Missing "tarif_bas" field');
       if(!('tarif_moyen' in req.body)) return res.status(400).send('Missing "tarif_moyen" field');
       if(!('tarif_haut' in req.body)) return res.status(400).send('Missing "tarif_haut" field');
       if(!('m_carre' in req.body)) return res.status(400).send('Missing "m_carre" field');
       if(!('chambre' in req.body)) return res.status(400).send('Missing "chambre" field');
       if(!('salle_de_bain' in req.body)) return res.status(400).send('Missing "salle_de_bain" field');
       if(!('categorie' in req.body)) return res.status(400).send('Missing "categorie" field');
       if(!('type' in req.body)) return res.status(400).send('Missing "type" field');
       if(!('equipements' in req.body)) return res.status(400).send('Missing "equipements" field');

    // Récupère un logement par sont id.
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!logement) return res.sendStatus(404);
  
    logement.images = req.body.images;
    logement.secteur = req.body.secteur;
    logement.description = req.body.description;
    logement.tarif_bas = req.body.tarif_bas;
    logement.tarif_moyen = req.body.tarif_moyen;
    logement.tarif_haut = req.body.tarif_haut;
    logement.m_carre = req.body.m_carre;
    logement.chambre = req.body.chambre;
    logement.salle_de_bain = req.body.salle_de_bain;
    logement.categorie = req.body.categorie;
    logement.type = req.body.type;
    logement. equipements = req.body.equipements;
  
    // Sauvegarde un logement.
    await logement.save();

    // Renvoie le statut (200) OK qui comfirme que le changement a bien été effectuer.
    res.sendStatus(200);
}

// Création de la fonction deleteLogement qui suprime un logement.
export async function deleteLogement (req: Request, res: Response){
    // Récupère un logement par sont id.
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!logement) return res.sendStatus(404);
    // supprime le logement.
    await logement.remove();
    // renvoie le statut (200) Ok qui comfirme la supression du logement.
    res.sendStatus(200);
}

export async function addAvis (req: Request, res: Response){
    // Récupère un logement par sont id.
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!logement) return res.sendStatus(404);
    logement.avis = req.params.avis;
    // renvoie le statut (200) Ok qui comfirme la supression du logement.
    res.sendStatus(200);
}