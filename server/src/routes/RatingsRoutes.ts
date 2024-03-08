import { Router } from 'express';
import { getRatings, createRating, getRating, updateRating, deleteRating } from "../controllers/RatingsController";


const router = Router();


// Define the road GET '/', that call the function getRatings from the ratings controller
router.get('/', getRatings);
// Define the road POST '/', that call the function createRating from the ratings controller
router.post('/', createRating);
// Define the road GET '/:id', that call the function getRating from the ratings controller;
router.get('/:id', getRating);
// Define the road PUT '/:id', that call the function updateRating from the ratings controller
router.put('/:id', updateRating);
// Define the road DELETE '/:id', that call the function deleteRating from the ratings controller
router.delete('/:id', deleteRating);


export default router;