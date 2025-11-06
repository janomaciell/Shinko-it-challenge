import { Request, Response } from 'express';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../models/Note';
import { generateId } from '../utils/idGenerator';
import { validateNoteTitle, validateNoteContent, ValidationError } from '../utils/validators';

// Base de datos en memoria
let notes: Note[] = [];

export class NoteController {
  
  // GET /api/notes - Obtener todas las notas
  static getAllNotes = (req: Request, res: Response): void => {
    try {
      // Ordenar por fecha de actualización (más recientes primero)
      const sortedNotes = [...notes].sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      );
      
      res.status(200).json({
        success: true,
        data: sortedNotes,
        count: sortedNotes.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las notas'
      });
    }
  };

  // GET /api/notes/:id - Obtener una nota por ID
  static getNoteById = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const note = notes.find(n => n.id === id);

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
      res.status(500).json({
        success: false,
        message: 'Error al obtener la nota'
      });
    }
  };

  // POST /api/notes - Crear una nueva nota
  static createNote = (req: Request, res: Response): void => {
    try {
      const { title, content }: CreateNoteDTO = req.body;

      // Validaciones
      validateNoteTitle(title);
      validateNoteContent(content);

      const now = new Date();
      const newNote: Note = {
        id: generateId(),
        title: title.trim(),
        content: content.trim(),
        createdAt: now,
        updatedAt: now
      };

      notes.push(newNote);

      res.status(201).json({
        success: true,
        message: 'Nota creada exitosamente',
        data: newNote
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Error al crear la nota'
      });
    }
  };

  // PUT /api/notes/:id - Actualizar una nota
  static updateNote = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const { title, content }: UpdateNoteDTO = req.body;

      const noteIndex = notes.findIndex(n => n.id === id);

      if (noteIndex === -1) {
        res.status(404).json({
          success: false,
          message: 'Nota no encontrada'
        });
        return;
      }

      // Validar solo los campos que se están actualizando
      if (title !== undefined) {
        validateNoteTitle(title);
        notes[noteIndex].title = title.trim();
      }

      if (content !== undefined) {
        validateNoteContent(content);
        notes[noteIndex].content = content.trim();
      }

      notes[noteIndex].updatedAt = new Date();

      res.status(200).json({
        success: true,
        message: 'Nota actualizada exitosamente',
        data: notes[noteIndex]
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Error al actualizar la nota'
      });
    }
  };

  // DELETE /api/notes/:id - Eliminar una nota
  static deleteNote = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const noteIndex = notes.findIndex(n => n.id === id);

      if (noteIndex === -1) {
        res.status(404).json({
          success: false,
          message: 'Nota no encontrada'
        });
        return;
      }

      const deletedNote = notes.splice(noteIndex, 1)[0];

      res.status(200).json({
        success: true,
        message: 'Nota eliminada exitosamente',
        data: deletedNote
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la nota'
      });
    }
  };

  // DELETE /api/notes - Eliminar todas las notas
  static deleteAllNotes = (req: Request, res: Response): void => {
    try {
      const count = notes.length;
      notes = [];

      res.status(200).json({
        success: true,
        message: `${count} nota(s) eliminada(s) exitosamente`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar las notas'
      });
    }
  };
}