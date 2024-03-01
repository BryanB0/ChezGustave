import { Request, Response } from 'express';
import Equipements from "../entities/Equipements";

// Création de la fonction getEquipements qui récupère tous les equipements.
export async function getEquipements (req: Request, res: Response){
    res.send(await Equipements.find());
}

// Création de la fonction createEquipement qui crée un equipement.
export async function createEquipement (req: Request, res: Response){
    // Si 'name' dans le body n'existe pas retourne le statut (400) Bad Request, qui renvoie 'Missing "name" field'.
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');

    const { name } = req.body;

    const equipement = new Equipements();

    equipement.name = name;

    // Sauvegarde un equipement.
    await equipement.save();

    // Renvoie le statut (201) Created qui signifie qu'un equipement a bien été créer.
    res.sendStatus(201);
}

// Création de la fonction getEquipement qui récupère un equipement.
export async function getEquipement (req: Request, res: Response){
    // Récupère un equipement avec sont id (dans le body).
    const equipement = await Equipements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si l'equipement n'existe pas retourne le statut (404) Not found.
    if(!equipement) return res.sendStatus(404);
    // Renvoie l'equipement.
    res.send(equipement);
}

// Création de la fonction updateEquipement qui met à jour les détails d'un equipement.
export async function updateEquipement (req: Request, res: Response){
    // Si 'name' dans le body n'existe pas retourne le statut (400) Bad Request, qui renvoie 'Missing "name" field'.
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');

    // Récupère un equipement par sont id.
    const equipement = await Equipements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si l'equipement n'existe pas retourne le statut (404) Not found.
    if(!equipement) return res.sendStatus(404);
  
    equipement.name = req.body.name;
  
    // Sauvegarde un equipement.
    await equipement.save();

    // Renvoie le statut (200) OK qui comfirme que le changement a bien été effectuer.
    res.sendStatus(200);
}

// Création de la fonction deleteEquipement qui suprime un equipement.
export async function deleteEquipement (req: Request, res: Response){
    // Récupère un equipement par sont id.
    const equipement = await Equipements.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si l'equipement n'existe pas retourne le statut (404) Not found.
    if(!equipement) return res.sendStatus(404);
    // supprime l'equipement.
    await equipement.remove();
    // renvoie le statut (200) Ok qui comfirme la supression de l'equipement'.
    res.sendStatus(200);
}