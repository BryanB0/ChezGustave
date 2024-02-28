import { Router } from 'express';
import { login, logout } from "../controllers/AuthController";


const router = Router();

// Définition de la route POST '/login', qui appelle la fonction login du contrôleur d'authentification
router.post('/login', login);
// Définition de la route POST '/logout', qui appelle la fonction logout du contrôleur d'authentification
router.post('/logout', logout);

export default router;