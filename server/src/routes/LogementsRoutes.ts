import { Router } from 'express';
import { getLogements, createLogement, getLogement, updateLogement, deleteLogement } from "../controllers/LogementsController";


const router = Router();

// Define the road GET '/getLogements', that call the function getLogements from the logements controller
router.get('/getLogements', getLogements);
// Define the road POST '/createLogement', that call the function createLogement from the logements controller
router.post('/createLogement', createLogement);
// Define the road GET '/getLogement', that call the function getLogement from the logements controller
router.get('/getLogement', getLogement);
// Define the road PUT '/updateLogement', that call the function updateLogement from the logements controller
router.put('/updateLogement', updateLogement);
// Define the road DELETE '/deleteLogement', that call the function deleteLogement from the logements controller
router.delete('/deleteLogement', deleteLogement);

export default router;