<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm bg-white/90">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-900 tracking-tight"> Sistema de Notas</h1>
              <p class="text-sm text-slate-600 mt-1 font-medium">Gestiona tus notas de clase de forma simple</p>
            </div>
          </div>

          <button @click="openCreateModal" class="btn-primary flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nueva Nota
          </button>
        </div>
      </div>
    </header>

    <!-- Contenido Principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alertas -->
      <Alert v-model="showSuccessAlert" :message="successMessage" type="success" />
      <Alert v-model="showErrorAlert" :message="errorMessage" type="error" />

      <!-- Estadísticas -->
      <div v-if="noteStore.notes.length > 0" class="mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="text-sm text-slate-600">
            <strong class="text-slate-900 font-semibold">{{ noteStore.notes.length }}</strong>
            {{ noteStore.notes.length === 1 ? 'nota' : 'notas' }}
          </span>
        </div>
      </div>

      <!-- Estado de Carga -->
      <LoadingSpinner v-if="noteStore.loading && !noteStore.notes.length" size="lg" />

      <!-- Estado Vacío -->
      <EmptyState
        v-else-if="!noteStore.loading && !noteStore.notes.length"
        title="Sin notas por ahora"
        description="Comienza creando tu primera nota para organizar tus ideas y apuntes"
      >
        <button @click="openCreateModal" class="btn-primary flex items-center gap-2 mx-auto">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Crear primera nota
        </button>
      </EmptyState>

      <!-- Cuadrícula de Notas -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NoteCard
          v-for="note in noteStore.notes"
          :key="note.id"
          :note="note"
          @click="viewNote(note)"
          @edit="editNote(note)"
          @delete="confirmDelete(note)"
        />
      </div>
    </main>

    <!-- Modal de Crear/Editar -->
    <Modal v-model="showFormModal" :title="isEditing ? 'Editar Nota' : 'Nueva Nota'">
      <NoteForm
        :note="selectedNote || undefined"
        :loading="noteStore.loading"
        @submit="handleSubmit"
        @cancel="closeFormModal"
      />
    </Modal>

    <!-- View Modal -->
    <Modal v-model="showViewModal" :title="selectedNote?.title || 'Nota'">
      <div v-if="selectedNote" class="space-y-6">
        <div class="prose prose-slate max-w-none">
          <p class="text-slate-700 whitespace-pre-wrap leading-relaxed">{{ selectedNote.content }}</p>
        </div>

        <div class="pt-6 border-t border-slate-100">
          <div class="flex flex-wrap gap-4 text-xs text-slate-500 mb-6">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Creado {{ formatDate(selectedNote.createdAt) }}</span>
            </div>

            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Actualizado {{ formatDate(selectedNote.updatedAt) }}</span>
            </div>
          </div>

          <div class="flex gap-3 justify-end">
            <button @click="editNote(selectedNote)" class="btn-secondary flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </button>

            <button @click="confirmDelete(selectedNote)" class="btn-danger flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Modal de Confirmación de Eliminación -->
    <Modal v-model="showDeleteModal" title="Confirmar Eliminación">
      <div class="space-y-6">
        <div class="bg-red-50 border border-red-100 rounded-xl p-4">
          <p class="text-slate-700">
            ¿Estás seguro que deseas eliminar la nota
            <strong class="text-slate-900">"{{ noteToDelete?.title }}"</strong>?
          </p>
          <p class="text-sm text-slate-500 mt-2">Esta acción no se puede deshacer.</p>
        </div>

        <div class="flex gap-3 justify-end">
          <button @click="showDeleteModal = false" class="btn-secondary" :disabled="noteStore.loading">
            Cancelar
          </button>
          <button
            @click="handleDelete"
            class="btn-danger flex items-center gap-2"
            :disabled="noteStore.loading"
          >
            <svg
              v-if="noteStore.loading"
              class="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 
                  7.962 0 014 12H0c0 3.042 1.135 5.824 3 
                  7.938l3-2.647z"
              />
            </svg>
            {{ noteStore.loading ? 'Eliminando...' : 'Eliminar' }}
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import type { Note, CreateNotePayload } from '~/types/note';

const noteStore = useNoteStore();

// Estados de modal
const showFormModal = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedNote = ref<Note | null>(null);
const noteToDelete = ref<Note | null>(null);

// Alertas
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Cargar notas
onMounted(() => noteStore.fetchNotes());

// Funciones auxiliares
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'hace menos de 1 hora';
  if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  }).format(date);
};

const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
  if (type === 'success') {
    successMessage.value = message;
    showSuccessAlert.value = true;
    setTimeout(() => (showSuccessAlert.value = false), 5000);
  } else {
    errorMessage.value = message;
    showErrorAlert.value = true;
    setTimeout(() => (showErrorAlert.value = false), 5000);
  }
};

// Manejadores de modal
const openCreateModal = () => {
  isEditing.value = false;
  selectedNote.value = null;
  showFormModal.value = true;
};

const closeFormModal = () => {
  showFormModal.value = false;
  selectedNote.value = null;
  isEditing.value = false;
};

const viewNote = (note: Note) => {
  selectedNote.value = note;
  showViewModal.value = true;
};

const editNote = (note: Note) => {
  selectedNote.value = note;
  isEditing.value = true;
  showViewModal.value = false;
  showFormModal.value = true;
};

const confirmDelete = (note: Note) => {
  noteToDelete.value = note;
  showViewModal.value = false;
  showDeleteModal.value = true;
};

// Operaciones CRUD
const handleSubmit = async (payload: CreateNotePayload) => {
  try {
    if (isEditing.value && selectedNote.value) {
      await noteStore.updateNote(selectedNote.value.id, payload);
      showAlert('Nota actualizada exitosamente');
    } else {
      await noteStore.createNote(payload);
      showAlert('Nota creada exitosamente');
    }
    closeFormModal();
  } catch (error: any) {
    showAlert(error.message || 'Ocurrió un error', 'error');
  }
};

const handleDelete = async () => {
  if (!noteToDelete.value) return;
  try {
    await noteStore.deleteNote(noteToDelete.value.id);
    showAlert('Nota eliminada exitosamente');
    showDeleteModal.value = false;
    noteToDelete.value = null;
  } catch (error: any) {
    showAlert(error.message || 'Error al eliminar la nota', 'error');
  }
};
</script>
