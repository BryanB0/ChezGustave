import { Router } from 'express';
import { getEquipements, createEquipement, getEquipement, updateEquipement, deleteEquipement } from "../controllers/EquipementsController";


const router = Router();

// Définition de la route GET '/getEquipements', qui appelle la fonction getEquipements du contrôleur des equiments.
router.get('/', getEquipements);
// Définition de la route POST '/createEquipement', qui appelle la fonction createEquipement du contrôleur des equiments.
router.post('/', createEquipement);
// Définition de la route GET '/getEquipement', qui appelle la fonction getEquipement du contrôleur des equiments.
router.get('/:id', getEquipement);
// Définition de la route PUT '/updateEquipement', qui appelle la fonction updateEquipement du contrôleur des equiments.
router.put('/:id', updateEquipement);
// Définition de la route DELETE '/deleteEquipement', qui appelle la fonction deleteEquipement du contrôleur des equiments.
router.delete('/:id', deleteEquipement);

export default router;