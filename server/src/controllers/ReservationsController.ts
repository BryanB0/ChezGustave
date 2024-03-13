import { Request, Response } from 'express';
import Reservations from "../entities/Reservations";
import Logements from '../entities/Logements';
import Users from '../entities/Users';
import Ratings from '../entities/Ratings';


export async function getReservations (req: Request, res: Response){
    res.send(await Reservations.find());
}

export async function createReservation (req: Request, res: Response){
    /*If 'images' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "start_date" field' and same thing for the others components :
    end_date,chef_cuisine,visite,logement,user
    */
    if(!('start_date' in req.body)) return res.status(400).send('Missing "start_date" field');
    if(!('end_date' in req.body)) return res.status(400).send('Missing "end_date" field');
    if(!('chef_cuisine' in req.body)) return res.status(400).send('Missing "chef_cuisine" field');
    if(!('visite' in req.body)) return res.status(400).send('Missing "visite" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');

    const { start_date, end_date, chef_cuisine, visite, logement: logementId, user: userId } = req.body;
    // we find the user with his Id
    let user = await Users.findOne({ where: { id: userId }});
    // we find the logement with his Id
    let logement = await Logements.findOne({ where: { id: logementId } });

    //we sed an error if the user is not find
    if(!user){
        return res.status(400).send('Invalid "User" ID');
    }
    // same for the logement
    if (!logement) {
        return res.status(400).send('Invalid "logement" ID');
    }
    // We send an error if the dates don't match( if there is other reservations for this dates)
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

    // save a reservation
    await reservation.save();

    // return the status (201) Created if the reservationbhas been corectly created
    res.sendStatus(201);
}

// Creation of the function getReservation that get a reservation
export async function getReservation (req: Request, res: Response){
    // Get a reservation in the body with his id
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the reservation doesn't exist return the status 404 Not found
    if(!reservation) return res.sendStatus(404);
    // send the reservation
    res.send(reservation);
}

// Creation of the function updateReservation that update a reservation
export async function updateReservation (req: Request, res: Response){
    /*If 'images' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "start_date" field' and same thing for the others components :
    end_date,chef_cuisine,visite,logement,user, rating
    */
    if(!('start_date' in req.body)) return res.status(400).send('Missing "start_date" field');
    if(!('end_date' in req.body)) return res.status(400).send('Missing "end_date" field');
    if(!('chef_cuisine' in req.body)) return res.status(400).send('Missing "chef_cuisine" field');
    if(!('visite' in req.body)) return res.status(400).send('Missing "visite" field');
    if(!('logement' in req.body)) return res.status(400).send('Missing "logement" field');
    if(!('user' in req.body)) return res.status(400).send('Missing "user" field');
    if(!('rating' in req.body)) return res.status(400).send('Missing "rating" field');


    

    // get a reservation with his id
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) }
    });

    // We send an error if the dates don't match( if there is other reservations for this dates)
    for (const reservation of await Reservations.findBy({ logement: req.body.logement })) {
        if(!((reservation.start_date >= req.body.start_date) && (reservation.start_date <= req.body.end_date)) 
        || ((reservation.end_date >= req.body.start_date) && (reservation.end_date <= req.body.end_date))){
            return res.status(400).send('Dates do not match !');
        }   
    }
    // If the reservation doesn't exist return the status 404 Not found
    if(!reservation) return res.sendStatus(404);
  
    reservation.start_date = req.body.start_date;
    reservation.end_date = req.body.end_date;
    reservation.chef_cuisine = req.body.chef_cuisine;
    reservation.visite = req.body.visite;
    reservation.logement = req.body.logement;
    reservation.user = req.body.user;
    reservation.rating = req.body.rating;
    
    
    // Save a reservation
    await reservation.save();

    // Send the status 200 Ok taht confirms that the change has been correctly done
    res.sendStatus(200);
}

// Creation of the function deleteReservation thatdelete a reservation
export async function deleteReservation (req: Request, res: Response){
    // Get a reservation by his id
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the reservation doesn't exist return the status 404 Not found
    if(!reservation) return res.sendStatus(404);
    // delete the reservation
    await reservation.remove();
    // Send the status 200 Ok that confirms the delete of the logement
    res.sendStatus(200);
}

// Creation of the function GetRatingsFromReservation that get Ratings for a specefic reservation
export async function getRatingsFromReservation (req: Request, res: Response){
    // Get a reservation by his id
    const reservation = await Reservations.findOne({
        where: { id: Number(req.params.id) },
        relations: { rating: true }
    });
    // If the reservation doesn't exist return the status 404 Not found
    if (!reservation) {
        return res.status(404).send("Not found.");
    }
    // send reservations in anwer
    res.send(reservation.rating);
}