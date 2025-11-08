<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="closeModal"
      >
        <div class="flex min-h-screen items-center justify-center p-4">
          <!-- Overlay -->
          <Transition name="overlay">
            <div 
              v-if="modelValue"
              class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            ></div>
          </Transition>

          <!-- Contenido del Modal -->
          <Transition name="modal-content">
            <div 
              v-if="modelValue"
              class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 z-10 border border-slate-200"
            >
              <!-- Header -->
              <div class="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                <h2 class="text-2xl font-semibold text-slate-900">{{ title }}</h2>
                <button
                  @click="closeModal"
                  class="text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100 p-1"
                  aria-label="Cerrar modal"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div>
                <slot></slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const closeModal = () => {
  emit('update:modelValue', false);
};

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) {
      closeModal();
    }
  };
  window.addEventListener('keydown', handleEscape);
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s ease;
}

.modal-content-leave-active {
  transition: all 0.2s ease;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>