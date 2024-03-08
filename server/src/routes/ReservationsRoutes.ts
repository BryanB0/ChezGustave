import { Router } from 'express';
import { getReservations, createReservation, getReservation, updateReservation, deleteReservation } from "../controllers/ReservationsController";


const router = Router();

// Define the road GET '/', that call the function getReservations from the reservations controller
router.get('/', getReservations);
// Define the road POST '/', that call the function createReservation from the reservations controller
router.post('/', createReservation);
// Define the road GET '/:id', that call the function getReservation from the reservations controller
router.get('/:id', getReservation);
// Define the road PUT '/:id', that call the function updateReservation from the reservations controller
router.put('/:id', updateReservation);
// Define the road DELETE '/:id', that call the function deleteReservation from the reservations controller
router.delete('/:id', deleteReservation);


export default router;