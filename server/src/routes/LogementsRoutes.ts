import { Router } from 'express';
import { getLogements, createLogement, getLogement, updateLogement, deleteLogement } from "../controllers/LogementsController";


const router = Router();


// Define the road GET '/', that call the function getLogements from the logements controller
router.get('/', getLogements);
// Define the road POST '/', that call the function createLogement from the logements controller
router.post('/', createLogement);
// Define the road GET '/:id', that call the function getLogement from the logements controller
router.get('/:id', getLogement);
// Define the road PUT '/:id', that call the function updateLogement from the logements controller
router.put('/:id', updateLogement);
// Define the road DELETE '/:id', that call the function deleteLogement from the logements controller
router.delete('/:id', deleteLogement);


export default router;