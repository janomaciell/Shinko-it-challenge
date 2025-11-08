import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Note, CreateNotePayload, UpdateNotePayload, ApiResponse } from '../types/note';
import { useApi } from '../composables/useApi';

export const useNoteStore = defineStore('note', () => {
  const notes = ref<Note[]>([]);
  const currentNote = ref<Note | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const api = useApi();

  // Obtener todas las notas
  const fetchNotes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get<ApiResponse<Note[]>>('/notes');
      if (response.success && response.data) {
        notes.value = response.data;
      }
    } catch (err: any) {
      error.value = err.message || 'Error al cargar las notas';
      console.error('Error al obtener notas:', err);
    } finally {
      loading.value = false;
    }
  };

  // Obtener una nota por ID
  const fetchNoteById = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get<ApiResponse<Note>>(`/notes/${id}`);
      if (response.success && response.data) {
        currentNote.value = response.data;
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || 'Error al cargar la nota';
      console.error('Error al obtener nota:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Crear nota
  const createNote = async (payload: CreateNotePayload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post<ApiResponse<Note>>('/notes', payload);
      if (response.success && response.data) {
        notes.value.unshift(response.data);
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || 'Error al crear la nota';
      console.error('Error al crear nota:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Actualizar nota
  const updateNote = async (id: string, payload: UpdateNotePayload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.put<ApiResponse<Note>>(`/notes/${id}`, payload);
      if (response.success && response.data) {
        const index = notes.value.findIndex(n => n.id === id);
        if (index !== -1) {
          notes.value[index] = response.data;
        }
        if (currentNote.value?.id === id) {
          currentNote.value = response.data;
        }
        return response.data;
      }
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar la nota';
      console.error('Error al actualizar nota:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Eliminar nota
  const deleteNote = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.delete<ApiResponse<Note>>(`/notes/${id}`);
      if (response.success) {
        notes.value = notes.value.filter(n => n.id !== id);
        if (currentNote.value?.id === id) {
          currentNote.value = null;
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Error al eliminar la nota';
      console.error('Error al eliminar nota:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Limpiar estados
  const clearError = () => {
    error.value = null;
  };

  const clearCurrentNote = () => {
    currentNote.value = null;
  };

  return {
    notes,
    currentNote,
    loading,
    error,
    fetchNotes,
    fetchNoteById,
    createNote,
    updateNote,
    deleteNote,
    clearError,
    clearCurrentNote,
  };
});