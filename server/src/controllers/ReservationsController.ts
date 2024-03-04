import { Request, Response } from 'express';
import Reservations from "../entities/Reservations";
import Logements from '../entities/Logements';
import Users from '../entities/Users';


export async function getReservations (req: Request, res: Response){
    res.send(await Reservations.find());
}

export async function createReservation (req: Request, res: Response){
    /* Si 'images' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants:
       secteur, description, tarif_bas, tarif_moyen ect.*/
    if(!('start_date' in req.body)) return res.status(400).send('Missing "start_date" field');
    if(!('end_date' in req.body)) return res.status(400).send('Missing "end_date" field');
    if(!('chef_cuisine' in req.body)) return res.status(400).send('Missing "chef_cuisine" field');
    if(!('visite' in req.body)) return res.status(400).send('Missing "visite" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');

    const { start_date, end_date, chef_cuisine, visite, logement: logementId, user: userId } = req.body;

    let user = await Users.findOne({ where: { id: userId }});
    let logement = await Logements.findOne({ where: { id: logementId } });

    if(!user){
        return res.status(400).send('Invalid "User" ID');
    }
    if (!logement) {
        return res.status(400).send('Invalid "logement" ID');
    }

    for (const reservation of await Reservations.findBy({ logement: logement })) {
        if(!((reservation.start_date >= start_date) && (reservation.start_date <= end_date)) 
        || ((reservation.end_date >= start_date) && (reservation.end_date <= end_date))){
            return res.status(400).send('Dates do not match !');
        }
        
    }

    const reservation = new Reservations();

    reservation.start_date = start_date;
    reservation.end_date = end_date;
    reservation.chef_cuisine = chef_cuisine;
    reservation.visite = visite;
    reservation.logement = logement;
    reservation.user = user;

    // Sauvegarde un logement.
    await reservation.save();

    // Renvoie le statut (201) Created qui signifie qu'un logement a bien été créer.
    res.sendStatus(201);
}

// Création de la fonction getLogement qui récupère un logement.
export async function getReservation (req: Request, res: Response){
    // Récupère un logement avec sont id (dans le body).
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!reservation) return res.sendStatus(404);
    // Renvoie le logement.
    res.send(reservation);
}

// Création de la fonction updateLogement qui met à jour les détails d'un logement.
export async function updateReservation (req: Request, res: Response){
    /* Si 'images' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants:
       secteur, description, tarif_bas, tarif_moyen ect.*/
    if(!('start_date' in req.body)) return res.status(400).send('Missing "start_date" field');
    if(!('end_date' in req.body)) return res.status(400).send('Missing "end_date" field');
    if(!('chef_cuisine' in req.body)) return res.status(400).send('Missing "chef_cuisine" field');
    if(!('visite' in req.body)) return res.status(400).send('Missing "visite" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');
    if(!('rating' in req.body)) return res.status(400).send('Missing "rating" field');


    

    // Récupère une réservation par sont id.
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) }
    });


    for (const reservation of await Reservations.findBy({ logement: req.body.logement })) {
        if(!((reservation.start_date >= req.body.start_date) && (reservation.start_date <= req.body.end_date)) 
        || ((reservation.end_date >= req.body.start_date) && (reservation.end_date <= req.body.end_date))){
            return res.status(400).send('Dates do not match !');
        }   
    }
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!reservation) return res.sendStatus(404);
  
    reservation.start_date = req.body.start_date;
    reservation.end_date = req.body.end_date;
    reservation.chef_cuisine = req.body.chef_cuisine;
    reservation.visite = req.body.visite;
    reservation.logement = req.body.logement;
    reservation.user = req.body.user;
    reservation.rating = req.body.rating;
    
    
    // Sauvegarde un logement.
    await reservation.save();

    // Renvoie le statut (200) OK qui comfirme que le changement a bien été effectuer.
    res.sendStatus(200);
}

// Création de la fonction deleteLogement qui suprime un logement.
export async function deleteReservation (req: Request, res: Response){
    // Récupère un logement par sont id.
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!reservation) return res.sendStatus(404);
    // supprime le logement.
    await reservation.remove();
    // renvoie le statut (200) Ok qui comfirme la supression du logement.
    res.sendStatus(200);
}