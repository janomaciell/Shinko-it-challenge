<template>
  <Transition name="alert">
    <div
      v-if="modelValue"
      class="rounded-xl p-4 mb-6 border"
      :class="alertClass"
      role="alert"
    >
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0 mt-0.5">
          <svg v-if="type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-sm font-medium flex-1" :class="textClass">{{ message }}</p>
        <button
          @click="$emit('update:modelValue', false)"
          class="flex-shrink-0 rounded-lg p-1 transition-colors"
          :class="closeButtonClass"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  message: string;
  type?: 'success' | 'error';
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const alertClass = computed(() => {
  return props.type === 'error' 
    ? 'bg-red-50 border-red-200 text-red-800' 
    : 'bg-green-50 border-green-200 text-green-800';
});

const textClass = computed(() => {
  return props.type === 'error' ? 'text-red-800' : 'text-green-800';
});

const closeButtonClass = computed(() => {
  return props.type === 'error' 
    ? 'text-red-400 hover:text-red-600 hover:bg-red-100' 
    : 'text-green-400 hover:text-green-600 hover:bg-green-100';
});
</script>

<style scoped>
.alert-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.96);
}

.alert-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>