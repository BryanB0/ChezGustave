import { Router } from 'express';
import { getReservations, createReservation, getReservation, updateReservation, deleteReservation } from "../controllers/ReservationsController";


const router = Router();

// Définition de la route GET '/getLogements', qui appelle la fonction getLogements du contrôleur logements.
router.get('/getReservations', getReservations);
// Définition de la route POST '/createLogement', qui appelle la fonction createLogement du contrôleur logements.
router.post('/createReserveation', createReservation);
// Définition de la route GET '/getLogement', qui appelle la fonction getLogement du contrôleur logements.
router.get('/getReserveation', getReservation);
// Définition de la route PUT '/updateLogement', qui appelle la fonction updateLogement du contrôleur logements.
router.put('/updateReserveation', updateReservation);
// Définition de la route DELETE '/deleteLogement', qui appelle la fonction deleteLogement du contrôleur logements.
router.delete('/deleteReserveation', deleteReservation);

export default router;