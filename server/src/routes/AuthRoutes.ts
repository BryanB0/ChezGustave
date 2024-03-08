import { Router } from 'express';
import { login, logout } from "../controllers/AuthController";


const router = Router();

// Define the road POST '/login', that call the function login from the authentification controller
router.post('/login', login);
// Define the road POST '/logout', that call the function logout from the authentification controller
router.post('/logout', logout);

export default router;