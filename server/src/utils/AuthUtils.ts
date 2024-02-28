import Users from "../entities/Users";
import jwt from "jsonwebtoken";

/* export la fonction asyncrone getUserByToken qui prend pour argument sont token sous form de chaine de character
qui renvera soit un utlisiateur ou null. */
export async function getUserByToken(token: string): Promise<Users | null> {
    try {
        // decode le contenu du token
        const decodedToken = jwt.verify(token, 'poule') as { id: number };
        // si l'id du token decoder n'est pas trouver retourne null.
        const userId = decodedToken.id;
        if (!userId) return null;
        // attend de trouver un utilisateur grace a sont id.
        const user = await Users.findOne({
            where: { id: userId }
        });
        // si l'utilisateur n'est pas trouver retourne null sinon retourne l'utilisateur.
        if (!user) return null;
        return user;
    } catch(err) {
        // Erreur le token n'a pas pu être décoder
        return null;
    }
}