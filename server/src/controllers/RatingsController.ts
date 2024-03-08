import { Request, Response } from 'express';
import Ratings from '../entities/Ratings';
import Users from '../entities/Users';
import Logements from '../entities/Logements';
import Reservations from '../entities/Reservations';

export async function getRatings (req: Request, res: Response){
    res.send(await Ratings.find());
}

export async function createRating (req: Request, res: Response){
    /*If 'images' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "rated" field' and same thing for the others components :
    text,logement,reservation, user
    */
    if(!('rated' in req.body)) return res.status(400).send('Missing "rated" field');
    if(!('text' in req.body)) return res.status(400).send('Missing "text" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('reservation' in req.body)) return res.status(400).send('Missing "reservation" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');

    const { rated, text, logement: userId, reservation: reservationId, user: logementId } = req.body;
    // We get the logement, the reservation and the user
    let logement = await Logements.findOne({ where: { id: logementId } });
    let reservation = await Reservations.findOne({ where: { id: reservationId } });
    let user = await Users.findOne({ where: { id: userId }});
    // If we can't get them we return an error
    if (!logement) {
        return res.status(400).send('Invalid "logement" ID');
    }
    if (!reservation) {
        return res.status(400).send('Invalid "reservation" ID');
    }
    if(!user){
        return res.status(400).send('Invalid "User" ID');
    }

    // We create the rating
    const rating = new Ratings();

    rating.rated = rated;
    rating.text = text;
    rating.logement = logement;
    rating.reservation = reservation;
    rating.user = user;

    // save a rating
    await rating.save();

    // Send the status 201 Created that means that the rating hasbeen corectly created.
    res.sendStatus(201);
}

export async function getRating (req: Request, res: Response){
    // Get a rating with his id(in the body)
    const rating = await Ratings.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the rating doesn't exist return the status 404 Not found
    if(!rating) return res.sendStatus(404);
    // send the rating
    res.send(rating);
}

export async function updateRating (req: Request, res: Response){
    /*If 'images' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "rated" field' and same thing for the others components :
    text,logement,reservation, user
    */
    if(!('rated' in req.body)) return res.status(400).send('Missing "rated" field');
    if(!('text' in req.body)) return res.status(400).send('Missing "text" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('reservation' in req.body)) return res.status(400).send('Missing "reservation" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');

    // Get a rating with his id(in the body)
    const rating = await Ratings.findOne({
        where: { id: Number(req.params.id) }
    });

    // If the rating doesn't exist return the status 404 Not found
    if(!rating) return res.sendStatus(404);
  
    rating.rated = req.body.rated;
    rating.text = req.body.text;
    rating.logement = req.body.logement;
    rating.reservation = req.body.reservation;
    rating.user = req.body.user;
    
    
    // Save a rating
    await rating.save();

    // Return the status 200 Ok that confirms that the changement has been corectly done
    res.sendStatus(200);
}

export async function deleteRating (req: Request, res: Response){
    // Get a rating with his id(in the body)
    const rating = await Ratings.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the rating doesn't exist return the status 404 Not found
    if(!rating) return res.sendStatus(404);
    // delete the rating
    await rating.remove();
    // Return the status 200 Ok that confirms that the delete has been corectly done
    res.sendStatus(200);
}
