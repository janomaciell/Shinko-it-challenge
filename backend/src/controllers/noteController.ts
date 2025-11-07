import { Request, Response } from 'express';
import { CreateNoteDTO, UpdateNoteDTO } from '../models/Note';
import { validateNoteTitle, validateNoteContent, ValidationError } from '../utils/validators';
import { noteService } from '../services/noteService';

export class NoteController {

  // GET /api/notes - Obtener todas las notas
  static getAllNotes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const notes = await noteService.getAll();

      res.status(200).json({
        success: true,
        data: notes,
        count: notes.length
      });
    } catch (error) {
      console.error('Error fetching notes from Supabase:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener las notas'
      });
    }
  };

  // GET /api/notes/:id - Obtener una nota por ID
  static getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const note = await noteService.getById(id);

      if (!note) {
        res.status(404).json({
          success: false,
          message: 'Nota no encontrada'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: note
      });
    } catch (error) {
      console.error('Error fetching note from Supabase:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la nota'
      });
    }
  };

  // POST /api/notes - Crear una nueva nota
  static createNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, content }: CreateNoteDTO = req.body;

      validateNoteTitle(title);
      validateNoteContent(content);

      const createdNote = await noteService.create({
        title: title.trim(),
        content: content.trim()
      });

      res.status(201).json({
        success: true,
        message: 'Nota creada exitosamente',
        data: createdNote
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }

      console.error('Error creating note in Supabase:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear la nota'
      });
    }
  };

  // PUT /api/notes/:id - Actualizar una nota
  static updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, content }: UpdateNoteDTO = req.body;

      if (title !== undefined) {
        validateNoteTitle(title);
      }

      if (content !== undefined) {
        validateNoteContent(content);
      }

      const updatedNote = await noteService.update(id, {
        title: title?.trim(),
        content: content?.trim()
      });

      if (!updatedNote) {
        res.status(404).json({
          success: false,
          message: 'Nota no encontrada'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Nota actualizada exitosamente',
        data: updatedNote
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }

      console.error('Error updating note in Supabase:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la nota'
      });
    }
  };

  // DELETE /api/notes/:id - Eliminar una nota
  static deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedNote = await noteService.delete(id);

      if (!deletedNote) {
        res.status(404).json({
          success: false,
          message: 'Nota no encontrada'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Nota eliminada exitosamente',
        data: deletedNote
      });
    } catch (error) {
      console.error('Error deleting note in Supabase:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la nota'
      });
    }
  };

  // DELETE /api/notes - Eliminar todas las notas
  static deleteAllNotes = async (_req: Request, res: Response): Promise<void> => {
    try {
      const count = await noteService.deleteAll();

      res.status(200).json({
        success: true,
        message: `${count} nota(s) eliminada(s) exitosamente`
      });
    } catch (error) {
      console.error('Error deleting notes in Supabase:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar las notas'
      });
    }
  };
}