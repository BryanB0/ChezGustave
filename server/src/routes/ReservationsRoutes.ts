import { Router } from 'express';
import { getReservations, createReservation, getReservation, updateReservation, deleteReservation } from "../controllers/ReservationsController";


const router = Router();
// Define the road GET '/getReservations', that call the function getReservations from the reservations controller
router.get('/getReservations', getReservations);
// Define the road POST '/createReservation', that call the function createReservation from the reservations controller
router.post('/createReserveation', createReservation);
// Define the road GET '/getReservation', that call the function getReservation from the reservations controller
router.get('/getReserveation', getReservation);
// Define the road PUT '/updateReservation', that call the function updateReservation from the reservations controller
router.put('/updateReserveation', updateReservation);
// Define the road DELETE '/deleteReservation', that call the function deleteReservation from the reservations controller
router.delete('/deleteReserveation', deleteReservation);

export default router;