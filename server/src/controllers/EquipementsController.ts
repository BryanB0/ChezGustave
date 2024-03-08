import { Request, Response } from 'express';
import Equipements from "../entities/Equipements";

// Creation of the function getEquipements that get all the equipements
export async function getEquipements (req: Request, res: Response){
    res.send(await Equipements.find());
}

//Creation ofthe function createEqipement that create an equipement
export async function createEquipement (req: Request, res: Response){
    //If 'name' in the body doesn't exist return the status 400 Bad Request that return 'Missing "name" field'
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');

    const { name } = req.body;

    const equipement = new Equipements();

    equipement.name = name;

    // Save an equipement
    await equipement.save();

    // Return the status 201 Created qui signifie qu'un equipement has been created.
    res.sendStatus(201);
}

// Creation of the function getEquipement that get an equipement
export async function getEquipement (req: Request, res: Response){
    // Tak an equipement with his id (in the body)
    const equipement = await Equipements.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the equipement doesn't exist return status 404 Not found
    if(!equipement) return res.sendStatus(404);
    // Return the equipement.
    res.send(equipement);
}

// Creation of the function updateEquipement that update the details of an equipement
export async function updateEquipement (req: Request, res: Response){
    // If 'name' in the body doesn't exist return the status 400 Bad Request, that return 'Missing "name" field'
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');

    // Get an Equipement by his id.
    const equipement = await Equipements.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the equipement doesn't exist return the status 404 Not found
    if(!equipement) return res.sendStatus(404);
  
    equipement.name = req.body.name;
  
    // Save an equipement
    await equipement.save();

    // Return the status 200 OK that confirms that the changement has been correctly done.
    res.sendStatus(200);
}

// Creation of the function deleteEquipement that delete an equipement
export async function deleteEquipement (req: Request, res: Response){
    // Get an equipement by his id
    const equipement = await Equipements.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the equipement doesn't exist return the status 404 Not Found
    if(!equipement) return res.sendStatus(404);
    // delete the equipement
    await equipement.remove();
    // Return the status 200 Ok qui confirme the deleting from the equipement.
    res.sendStatus(200);
}