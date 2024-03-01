import { Router } from 'express';
import { getLogements, createLogement, getLogement, updateLogement, deleteLogement } from "../controllers/LogementsController";


const router = Router();

// Définition de la route GET '/getLogements', qui appelle la fonction getLogements du contrôleur logements.
router.get('/getLogements', getLogements);
// Définition de la route POST '/createLogement', qui appelle la fonction createLogement du contrôleur logements.
router.post('/createLogement', createLogement);
// Définition de la route GET '/getLogement', qui appelle la fonction getLogement du contrôleur logements.
router.get('/getLogement', getLogement);
// Définition de la route PUT '/updateLogement', qui appelle la fonction updateLogement du contrôleur logements.
router.put('/updateLogement', updateLogement);
// Définition de la route DELETE '/deleteLogement', qui appelle la fonction deleteLogement du contrôleur logements.
router.delete('/deleteLogement', deleteLogement);

export default router;