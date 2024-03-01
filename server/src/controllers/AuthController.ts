import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from "../entities/Users"

export async function login (req: Request, res: Response){
    const { email, password } = req.body;
    const user = await Users.findOne({
        where: {
            email: email
        }
    })
    //si l'utilisateur n'est pas trouver renvoie le status 403.
    if(!user) return res.sendStatus(403);
    // verifie que le mot de passe est bon.
    if (!(await bcrypt.compare(password, user.password))) return res.sendStatus(403);

    /* creer une constante token qui vas prendre comme argument l'id de l'utilisateur
    et la secret key qui dans ce projet vas etre 'poule'. */
    const token = jwt.sign({
        id: user.id
    }, 'poule');
    /* Le cookie prendra comme argument sont nom en chaine de character qui sera tout simplement 'token' 
    et le deuxieme argument vas etre le token en luis meme.ça renvoie que l'utilisateur a été authentifier. */    
    res.cookie('token', token);
    res.send('authentificated');
}

export async function logout(req: Request, res: Response) {
    // Supprimer le cookie de session
    res.clearCookie('token');

    // Répondre au client
    res.send('Déconnexion réussie');
}