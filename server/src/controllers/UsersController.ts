import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Users from "../entities/Users";

//Creation of the function getUsers that get all the users
export async function getUsers (req: Request, res: Response){
    res.send(await Users.find());
}

// Creation of the fuction ceeateUser thatcreate an user
export async function createUser (req: Request, res: Response){
    /*If 'name' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "name" field' and same thing for the others components :
    email,tel,password
    */
    
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

    // Save an user
    await user.save();

    // Send the status 201 Created that means that an user has been correctly created
    res.sendStatus(201);
}

// Creation of the function getUser that get an user
export async function getUser (req: Request, res: Response){
    // Get an user with his id in the body
    const user = await Users.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the user doesn't exist return the status 404 Not found
    if(!user) return res.sendStatus(404);
    // Send the user
    res.send(user);
}

//Creation of the function updateUser that update the details of an user
export async function updateUser (req: Request, res: Response){
    /*If 'name' in the body doesn't exist return the status 400 Bad Request,
    that return 'Missing "name" field' and same thing for the others components :
    email,tel,password
    */
    if(!('email' in req.body)) return res.status(400).send('Missing "email" field');
    if(!('name' in req.body)) return res.status(400).send('Missing "name" field');
    if(!('tel' in req.body)) return res.status(400).send('Missing "tel" field');
    if(!('password' in req.body)) return res.status(400).send('Missing "password" field');

    // get an user with his id
    const user = await Users.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the user doesn't exist send the status 404 Not found
    if(!user) return res.sendStatus(404);
  
    user.email = req.body.email;
    user.name = req.body.name;
    user.tel = req.body.tel;
    user.password = req.body.password;
    user.is_admin = req.body.is_admin;
  
    // Save an user
    await user.save();

    // Send the status 200 Ok that confirms that the update has been correctly done
    res.sendStatus(200);
}

// Creation of the function deleteUser that delete an user
export async function deleteUser (req: Request, res: Response){
    // get an user by his id
    const user = await Users.findOne({
        where: { id: Number(req.params.id) }
    });
    // If the user doesn't exist return the status 404 Not found
    if(!user) return res.sendStatus(404);
    // delete the user
    await user.remove();
    // Send the status 200 Ok that confirmsthe delete of the user
    res.sendStatus(200);
}