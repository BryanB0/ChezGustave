import { NextFunction, Request, Response } from "express";
import { getUserByToken } from "../utils/AuthUtils";


// export le middlewares asyncrone d'un utilisateur connecter.
export async function userConnected(req: Request, res: Response, next: NextFunction) {
    // si le token n'est pas trouver dans les cookies retourne le statut 401 Unauthorized.
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    // si l'utilisateur n'est pas trouver renvoie le statut 401 et si l'utilisateur est un admin renvoie le statut 401.
    const user = await getUserByToken(token);
    if (!user) return res.sendStatus(401);
    if (user.is_admin) return res.sendStatus(401);
    // permet de donner l'acces au routes qui utilise le middlewares.
    next();
}


export async function adminConnected(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    const user = await getUserByToken(token);
    if (!user) return res.sendStatus(401);
    if (!user.is_admin) return res.sendStatus(401);
    next();
}