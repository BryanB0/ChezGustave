import { Router } from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser, getReservationsFromUser } from "../controllers/UsersController";


const router = Router();


// Define the road GET '/', that call the function getUsers from the users controller
router.get('/', getUsers);
// Define the road POST '/', that call the function createUser from the reservations controller
router.post('/', createUser);
// Define the road GET '/:id', that call the function getUser from the users controller
router.get('/:id', getUser);
// Define the road PUT '/:id', that call the function updateUser from the users controller
router.put('/:id', updateUser);
// Define the road DELETE '/:id', that call the function deleteUser from the users controller
router.delete('/:id', deleteUser);
// Define the road GET '/:id/reservations', that call the function getReservationsFromUser from the users controller
router.get('/:id/reservations', getReservationsFromUser);

export default router;