import { Router } from 'express';
import { getUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/UsersController";


const router = Router();

// Define the road GET '/getUsers', that call the function getUsers from the users controller
router.get('/getUsers', getUsers);
// Define the road POST '/createUser', that call the function createUser from the reservations controller
router.post('/createUser', createUser);
// Define the road GET '/getUser', that call the function getUser from the users controller
router.get('/getUser', getUser);
// Define the road PUT '/updateUser', that call the function updateUser from the users controller
router.put('/updateUser', updateUser);
// Define the road DELETE '/deleteUser', that call the function deleteUser from the users controller
router.delete('/deleteUser', deleteUser);

export default router;