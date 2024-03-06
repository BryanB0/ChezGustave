import { Router } from 'express';
import { getRatings, createRating, getRating, updateRating, deleteRating } from "../controllers/RatingsController";


const router = Router();

// Définition de la route GET '/getLogements', qui appelle la fonction getLogements du contrôleur logements.
router.get('/getRatings', getRatings);
// Définition de la route POST '/createLogement', qui appelle la fonction createLogement du contrôleur logements.
router.post('/createRating', createRating);
// Définition de la route GET '/getLogement', qui appelle la fonction getLogement du contrôleur logements.
router.get('/getRating', getRating);
// Définition de la route PUT '/updateLogement', qui appelle la fonction updateLogement du contrôleur logements.
router.put('/updateRating', updateRating);
// Définition de la route DELETE '/deleteLogement', qui appelle la fonction deleteLogement du contrôleur logements.
router.delete('/deleteRating', deleteRating);

export default router;