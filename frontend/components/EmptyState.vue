<template>
  <div class="text-center py-16 px-4">
    <div class="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-2xl mb-6">
      <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 class="text-xl font-semibold text-slate-900 mb-3">{{ title }}</h3>
    <p class="text-slate-600 mb-8 max-w-md mx-auto">{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>