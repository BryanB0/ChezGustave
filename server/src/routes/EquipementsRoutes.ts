import { Router } from 'express';
import { getEquipements, createEquipement, getEquipement, updateEquipement, deleteEquipement } from "../controllers/EquipementsController";


const router = Router();
// Define the road GET '/', that call the function getEquipements from the equipements controller
router.get('/', getEquipements);
// Define the road POST '/', that call the function createEquipement from the equipements controller
router.post('/', createEquipement);
// Define the road GET '/:id', that call the function getEquipement from the equipements controller
router.get('/:id', getEquipement);
// Define the road PUT '/:id', that call the function updateEquipement from the equipements controller
router.put('/:id', updateEquipement);
// Define the road DELETE '/:id', that call the function deleteEquipement from the equipements controller
router.delete('/:id', deleteEquipement);


export default router;