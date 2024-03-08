import Users from "../entities/Users";
import jwt from "jsonwebtoken";

/* export of the asyncron function getUserByToken that takes in argument his token(string) and return 
an user or null*/

export async function getUserByToken(token: string): Promise<Users | null> {
    try {
        // uncode the content of the token
        const decodedToken = jwt.verify(token, 'poule') as { id: number };
        // If the id of the token uncoded is not found return null$
        const userId = decodedToken.id;
        if (!userId) return null;
        // Wait to find the user with his id
        const user = await Users.findOne({
            where: { id: userId }
        });
        // If the user is not find return null else return the user
        if (!user) return null;
        return user;
    } catch(err) {
        // Error the token could not be decoded
        return null;
    }
}