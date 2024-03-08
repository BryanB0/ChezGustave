import { Router } from 'express';
import { getEquipements, createEquipement, getEquipement, updateEquipement, deleteEquipement } from "../controllers/EquipementsController";


const router = Router();
// Define the road GET '/getEquipements', that call the function getEquipements from the equipements controller
router.get('/getEquipements', getEquipements);
// Define the road POST '/createEquipement', that call the function createEquipement from the equipements controller
router.post('/createEquipement', createEquipement);
// Define the road GET '/getEquipement', that call the function getEquipement from the equipements controller
router.get('/getEquipement', getEquipement);
// Define the road PUT '/updateEquipement', that call the function updateEquipement from the equipements controller
router.put('/updateEquipement', updateEquipement);
// Define the road DELETE '/deleteEquipement', that call the function deleteEquipement from the equipements controller
router.delete('/deleteEquipement', deleteEquipement);

export default router;