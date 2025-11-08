<template>
  <article 
    class="card p-6 cursor-pointer group animate-fade-in-up"
    @click="$emit('click')"
  >
    <!-- Header -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 mb-2">
        {{ note.title }}
      </h3>
      <span class="badge">
        {{ formatDate(note.updatedAt) }}
      </span>
    </div>
    
    <!-- Vista Previa del Contenido -->
    <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
      {{ note.content }}
    </p>
    
    <!-- Acciones -->
    <div class="flex items-center gap-2 pt-3 border-t border-slate-100">
      <button
        @click.stop="$emit('edit')"
        class="btn-ghost text-sm flex items-center gap-1.5"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Editar
      </button>
      <button
        @click.stop="$emit('delete')"
        class="btn-ghost text-sm flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Eliminar
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note';

defineProps<{
  note: Note;
}>();

defineEmits<{
  click: [];
  edit: [];
  delete: [];
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
  }
  
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  }).format(date);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>