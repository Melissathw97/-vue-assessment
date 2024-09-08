<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="chip">
    {{ label }}
  </div>
</template>

<style scoped>
.chip {
  background: lightseagreen;
  border-radius: 2px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  display: inline-block;
  padding: 2px 4px;
}
</style>
