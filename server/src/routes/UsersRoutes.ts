import { Router } from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/UsersController";


const router = Router();

// Définition de la route GET '/getUsers', qui appelle la fonction getUsers du contrôleur d'utilisateur.
router.get('/getUsers', getUsers);
// Définition de la route POST '/createUser', qui appelle la fonction createUser du contrôleur d'utilisateur.
router.post('/createUser', createUser);
// Définition de la route GET '/getUser', qui appelle la fonction getUser du contrôleur d'utilisateur.
router.get('/getUser', getUser);
// Définition de la route PUT '/updateUser', qui appelle la fonction updateUser du contrôleur d'utilisateur.
router.put('/updateUser', updateUser);
// Définition de la route DELETE '/deleteUser', qui appelle la fonction deleteteUser du contrôleur d'utilisateur.
router.delete('/deleteUser', deleteUser);

export default router;