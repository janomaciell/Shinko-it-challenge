<template>
  <div class="flex justify-center items-center" :class="containerClass">
    <div class="animate-spin rounded-full border-t-2 border-b-2 border-primary-600" :class="sizeClass"></div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    size: 'md',
  }
);

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-6 w-6';
    case 'lg':
      return 'h-16 w-16';
    default:
      return 'h-10 w-10';
  }
});

const containerClass = computed(() => {
  return props.size === 'lg' ? 'py-12' : 'py-4';
});
</script>