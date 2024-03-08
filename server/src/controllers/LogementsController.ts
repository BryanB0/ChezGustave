import { Request, Response } from 'express';
import Logements from "../entities/Logements";
import Equipements from '../entities/Equipements';

// Creation of the function getLogements that get all the logements
export async function getLogements (req: Request, res: Response){
    res.send(await Logements.find());
}

// Creation of the function createLogement that create a logement
export async function createLogement (req: Request, res: Response){
    /*If 'images' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "name" field' and same thing for the others components :
    secteur,description,tarif_bas, tarif_moyen etc...
    */
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

    // We go in the table equipements where we get the id of each equipement and we stock in equipementId
    for (const equipementId of equipements.id) {
        // We search the equipement with the id
        const equipement = await Equipements.findOne(equipementId);
        // If equipement is not null we push his name in the table equipements
        if (equipement) {
            logement.equipements.push(equipement);
        } else {
            // Else we return an error
            console.error(`Equipement with ID ${equipementId} not found`);
        }
    }
    // Save a logement
    await logement.save();

    // Retuen the status 201 Created that means a logement has been created
    res.sendStatus(201);
}

// Creation of the function getLogement that get a logement
export async function getLogement (req: Request, res: Response){
    // Get back a logement with his id (in the body)
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the logement doesn't exist return the status 404 Not found
    if(!logement) return res.sendStatus(404);
    // Send the logement
    res.send(logement);
}

// Creation of the function updateLogement that update the details of a logement
export async function updateLogement (req: Request, res: Response){
    /*If 'images' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "name" field' and same thing for the others components :
    secteur,description,tarif_bas, tarif_moyen etc...
    */
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

    // Get a logement by his id.
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the logement doesn't exist return the status 404 Not found
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
  
    // Save a logement
    await logement.save();

    // Return the status 200 Ok that confirms that the changement has been corectly done.
    res.sendStatus(200);
}

// Creation of the function deleteLogement that delete a logement
export async function deleteLogement (req: Request, res: Response){
    // Get a logement by his id
    const logement = await Logements.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the logement doesn't exist return the status 404 Not found
    if(!logement) return res.sendStatus(404);
    // delete the logement
    await logement.remove();
    // Return the status 200 Ok that confirms the deleting of the logement
    res.sendStatus(200);
}

