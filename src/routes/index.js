import { Router } from 'express';
import MovieController from '../controllers/MovieController';

const router = Router();

router.get('/', MovieController.getAllMovies);
router.post('/', MovieController.addMovie);
router.get('/:id', MovieController.getAMovie);
router.put('/:id', MovieController.updatedMovie);
router.delete('/:id', MovieController.deleteMovie);

export default router;
