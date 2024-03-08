import { NextFunction, Request, Response } from "express";
import { getUserByToken } from "../utils/AuthUtils";


// Export the middlewares asyncron from aconnected user
export async function userConnected(req: Request, res: Response, next: NextFunction) {
    // If the token is not found in the cookies return the status 401 Unauthorized
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    // If the user is not found return the status 401 and if the user is an admin return the status 401
    const user = await getUserByToken(token);
    if (!user) return res.sendStatus(401);
    if (user.is_admin) return res.sendStatus(401);
    // Allowed to give the access to roads that use the middlewares
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