<script setup lang="ts">
const emits = defineEmits(["click"])
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  iconOnly: {
    type: Boolean,
    default: false
  }
})

const onClick = () => {
  if (!props.disabled) {
    emits("click")
  }
}
</script>

<template>
  <button
    :class="['button', { icon: iconOnly }]"
    v-bind="$attrs"
    @click="onClick"
    :disabled="disabled"
  >
    <slot v-if="iconOnly" name="icon"></slot>
    <span v-else>
      {{ label }}
    </span>
  </button>
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

.icon {
  padding: 7px 10px;
  display: grid;
}

button:not(:disabled):hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
