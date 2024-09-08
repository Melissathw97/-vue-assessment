<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button class="button" v-bind="$attrs">{{ label }}</button>
</template>

<style scoped>
button {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid transparent;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.4s;
}

button:not(:disabled) {
  cursor: pointer;
}

button:not(:disabled):hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
