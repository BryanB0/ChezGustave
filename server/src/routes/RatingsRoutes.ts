import { Router } from 'express';
import { getRatings, createRating, getRating, updateRating, deleteRating } from "../controllers/RatingsController";


const router = Router();

// Define the road GET '/getRatings', that call the function getRatings from the ratings controller
router.get('/getRatings', getRatings);
// Define the road POST '/createRating', that call the function createRating from the ratings controller
router.post('/createRating', createRating)
// Define the road GET '/getRating', that call the function getRating from the ratings controller;
router.get('/getRating', getRating);
// Define the road PUT '/updateRating', that call the function updateRating from the ratings controller
router.put('/updateRating', updateRating);
// Define the road DELETE '/deleteRating', that call the function deleteRating from the ratings controller
router.delete('/deleteRating', deleteRating);

export default router;