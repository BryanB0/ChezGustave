import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Users from "../entities/Users"

// Création de la fonction getUsers qui récupère tous les utilisateurs.
export async function getUsers (req: Request, res: Response){
    res.send(await Users.find());
}

// Création de la fonction createUser qui crée un utilisateur.
export async function createUser (req: Request, res: Response){
    /* Si 'name' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants (name, tel et password).*/
    if(!('email' in req.body)) return res.status(400).send('Missing "email" field');
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');
    if(!('tel' in req.body)) return res.status(400).send('Missing "tel" field');
    if(!('password' in req.body)) return res.status(400).send('Missing "password" field');

    const { email, name, tel, password } = req.body;

    const user = new Users();
    const saltRounds = 10;

    user.email = email;
    user.name = name;
    user.tel = tel;
    user.password = await bcrypt.hash(password, saltRounds);

    user.is_admin = false;

    // Sauvegarde un utilisateur.
    await user.save();

    // Renvoie le statut (201) Created qui signifie qu'un utilisateur a bien été créer.
    res.sendStatus(201);
}

// Création de la fonction getUser qui récupère un utilisateur.
export async function getUser (req: Request, res: Response){
    // Récupère un utilisateur avec sont id (dans le body).
    const user = await Users.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si l'utilisateur n'existe pas retourne le statut (404) Not found.
    if(!user) return res.sendStatus(404);
    // Renvoie l'utilisateur.
    res.send(user);
}

// Création de la fonction updateUser qui met à jour les détails d'un utilisateur.
export async function updateUser (req: Request, res: Response){
    /* Si 'name' dans le body n'existe pas retourne le statut (400) Bad Request,
       qui renvoie 'Missing "name" field' et même chose pour les autres composants (name, tel et password).*/
    if(!('email' in req.body)) return res.status(400).send('Missing "email" field');
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');
    if(!('tel' in req.body)) return res.status(400).send('Missing "tel" field');
    if(!('password' in req.body)) return res.status(400).send('Missing "password" field');

    // Récupère un utilisateur par sont id.
    const user = await Users.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si l'utilisateur n'existe pas retourne le statut (404) Not found.
    if(!user) return res.sendStatus(404);
  
    user.email = req.body.email;
    user.name = req.body.name;
    user.tel = req.body.tel;
    user.password = req.body.password;
    user.is_admin = req.body.is_admin;
  
    // Sauvegarde un utilisateur.
    await user.save();

    // Renvoie le statut (200) OK qui comfirme que le changement a bien été effectuer.
    res.sendStatus(200);
}

// Création de la fonction deleteUser qui suprime un utilisateur.
export async function deleteUser (req: Request, res: Response){
    // Récupère un utilisateur par sont id.
    const user = await Users.findOne({
        where: { id: Number(req.params.id) }
    });
    // Si l'utilisateur n'existe pas retourne le statut (404) Not found.
    if(!user) return res.sendStatus(404);
    // supprime l'utilisateur.
    await user.remove();
    // renvoie le statut (200) Ok qui comfirme la supression de l'utilisateur'.
    res.sendStatus(200);
}