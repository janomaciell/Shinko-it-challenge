<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Título -->
    <div>
      <label for="title" class="block text-sm font-medium text-slate-700 mb-2">
        Título
      </label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        placeholder="Ej: Apuntes de clase"
        class="input-field"
        :class="{ 'border-red-500 focus:ring-red-500': errors.title }"
        required
        maxlength="100"
      />
      <div class="flex justify-between mt-2">
        <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
        <p class="text-slate-400 text-xs ml-auto">{{ formData.title.length }}/100</p>
      </div>
    </div>

    <!-- Contenido -->
    <div>
      <label for="content" class="block text-sm font-medium text-slate-700 mb-2">
        Contenido
      </label>
      <textarea
        id="content"
        v-model="formData.content"
        rows="8"
        placeholder="Escribe el contenido de tu nota..."
        class="input-field resize-none"
        :class="{ 'border-red-500 focus:ring-red-500': errors.content }"
        required
        maxlength="5000"
      ></textarea>
      <div class="flex justify-between mt-2">
        <p v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</p>
        <p class="text-slate-400 text-xs ml-auto">{{ formData.content.length }}/5000</p>
      </div>
    </div>

    <!-- Acciones -->
    <div class="flex gap-3 justify-end pt-4 border-t border-slate-100">
      <button
        type="button"
        @click="$emit('cancel')"
        class="btn-secondary"
        :disabled="loading"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="btn-primary flex items-center gap-2"
        :disabled="loading || !isFormValid"
      >
        <svg v-if="loading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Guardando...' : (isEdit ? 'Actualizar Nota' : 'Crear Nota') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Note, CreateNotePayload } from '~/types/note';

const props = defineProps<{
  note?: Note;
  loading?: boolean;
}>();

const emit = defineEmits<{
  submit: [payload: CreateNotePayload];
  cancel: [];
}>();

const isEdit = computed(() => !!props.note);

const formData = reactive({
  title: props.note?.title || '',
  content: props.note?.content || '',
});

const errors = reactive({
  title: '',
  content: '',
});

const isFormValid = computed(() => {
  return formData.title.trim().length >= 3 && 
         formData.content.trim().length >= 1 &&
         !errors.title && 
         !errors.content;
});

const validateForm = (): boolean => {
  errors.title = '';
  errors.content = '';

  if (formData.title.trim().length < 3) {
    errors.title = 'Mínimo 3 caracteres';
    return false;
  }

  if (formData.content.trim().length < 1) {
    errors.content = 'El contenido es requerido';
    return false;
  }

  return true;
};

const handleSubmit = () => {
  if (!validateForm()) return;

  emit('submit', {
    title: formData.title.trim(),
    content: formData.content.trim(),
  });
};

watch(() => props.note, (newNote) => {
  if (newNote) {
    formData.title = newNote.title;
    formData.content = newNote.content;
  }
});
</script>