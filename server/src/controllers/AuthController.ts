import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from "../entities/Users"

// login function that allowed user to connect to his account
export async function login (req: Request, res: Response){
    // We get variables email and password from the body of the request
    const { email, password } = req.body;
    // We find an uniq user from the model Users with the email
    const user = await Users.findOne({
        where: {
            email: email
        }
    })
    //if the user is not found send back the error 403
    if(!user) return res.sendStatus(403);
    // check that the password is good
    if (!(await bcrypt.compare(password, user.password))) return res.sendStatus(403);

    /*create a constant token that will take as argument the id from the user and the secret key
    that in this project will be 'poule'
    */
    const token = jwt.sign({
        id: user.id
    }, 'poule');
    /*The cookie will take as argument his name as a string that will be simply 'token'
    and the second argument will be the token himself and return that the user has been authentified.
    */    
    res.cookie('token', token);
    res.send('authentificated');
}

//function logout that allowed to logout the user
export async function logout(req: Request, res: Response) {
    // Delete the cookie from the session
    res.clearCookie('token');

    // Answer from the client
    res.send('Déconnexion réussie');
}