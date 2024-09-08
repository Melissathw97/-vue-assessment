<script setup lang="ts">
const emits = defineEmits(["click"])
const props = defineProps({
  disabled: {
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
  <button class="button" v-bind="$attrs" @click="onClick" :disabled="disabled">
    <slot name="icon"></slot>
  </button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 35px;
  left: 30px;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  transition: 0.4s;
}

svg {
  height: 100%;
  width: 100%;
}

button:not(:disabled):hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
