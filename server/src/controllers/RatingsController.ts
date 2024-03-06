import { Request, Response } from 'express';
import Ratings from '../entities/Ratings';
import Users from '../entities/Users';
import Logements from '../entities/Logements';
import Reservations from '../entities/Reservations';

export async function getRatings (req: Request, res: Response){
    res.send(await Ratings.find());
}

export async function createRating (req: Request, res: Response){
    /* Si 'images' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants:
       secteur, description, tarif_bas, tarif_moyen ect.*/
    if(!('rated' in req.body)) return res.status(400).send('Missing "rated" field');
    if(!('text' in req.body)) return res.status(400).send('Missing "text" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('reservation' in req.body)) return res.status(400).send('Missing "reservation" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');

    const { rated, text, logement: userId, reservation: reservationId, user: logementId } = req.body;

    let logement = await Logements.findOne({ where: { id: logementId } });
    let reservation = await Reservations.findOne({ where: { id: reservationId } });
    let user = await Users.findOne({ where: { id: userId }});

    if (!logement) {
        return res.status(400).send('Invalid "logement" ID');
    }
    if (!reservation) {
        return res.status(400).send('Invalid "reservation" ID');
    }
    if(!user){
        return res.status(400).send('Invalid "User" ID');
    }


    const rating = new Ratings();

    rating.rated = rated;
    rating.text = text;
    rating.logement = logement;
    rating.reservation = reservation;
    rating.user = user;

    // Sauvegarde un logement.
    await rating.save();

    // Renvoie le statut (201) Created qui signifie qu'un logement a bien été créer.
    res.sendStatus(201);
}

export async function getRating (req: Request, res: Response){
    // Récupère un logement avec sont id (dans le body).
    const rating = await Ratings.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!rating) return res.sendStatus(404);
    // Renvoie le logement.
    res.send(rating);
}

export async function updateRating (req: Request, res: Response){
    /* Si 'images' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants:
       secteur, description, tarif_bas, tarif_moyen ect.*/
    if(!('rated' in req.body)) return res.status(400).send('Missing "rated" field');
    if(!('text' in req.body)) return res.status(400).send('Missing "text" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('reservation' in req.body)) return res.status(400).send('Missing "reservation" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');

    // Récupère une réservation par sont id.
    const rating = await Ratings.findOne({
        where: { id: Number(req.params.id) }
    });

    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!rating) return res.sendStatus(404);
  
    rating.rated = req.body.rated;
    rating.text = req.body.text;
    rating.logement = req.body.logement;
    rating.reservation = req.body.reservation;
    rating.user = req.body.user;
    
    
    // Sauvegarde un logement.
    await rating.save();

    // Renvoie le statut (200) OK qui comfirme que le changement a bien été effectuer.
    res.sendStatus(200);
}

export async function deleteRating (req: Request, res: Response){
    // Récupère un logement par sont id.
    const rating = await Ratings.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si le logement n'existe pas retourne le statut (404) Not found.
    if(!rating) return res.sendStatus(404);
    // supprime le logement.
    await rating.remove();
    // renvoie le statut (200) Ok qui comfirme la supression du logement.
    res.sendStatus(200);
}
