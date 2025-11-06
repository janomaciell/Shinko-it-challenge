import { Router } from 'express';
import { NoteController } from '../controllers/noteController';

const router = Router();

// Rutas de notas
router.get('/', NoteController.getAllNotes);
router.get('/:id', NoteController.getNoteById);
router.post('/', NoteController.createNote);
router.put('/:id', NoteController.updateNote);
router.delete('/:id', NoteController.deleteNote);
router.delete('/', NoteController.deleteAllNotes);

export default router;