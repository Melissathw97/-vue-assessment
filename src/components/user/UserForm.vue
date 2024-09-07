<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import ReusableButton from "@/components/ReusableButton.vue"

const formTitle = ref("")
const username = ref("")
const password = ref("")

const emits = defineEmits(["submit"])
const router = useRouter()

const {
  currentRoute: {
    value: { name: currentRouteName }
  }
} = router

switch (currentRouteName) {
  case "login":
    formTitle.value = "Log In"
    break
  case "register":
    formTitle.value = "Register"
    break
  default:
    break
}

const isButtonDisabled = () => {
  if (["login", "register"].includes(currentRouteName)) {
    return !username.value || !password.value
  }

  // For future proper user registration
  // if (currentRouteName === "register") {
  //   return !username.value || !password.value || !confirmPassword.value
  // }

  return false
}

const onFormSubmit = () => {
  const payload = {
    username: username.value,
    password: password.value
  }

  emits("submit", payload)
}
</script>

<template>
  <div class="form-wrapper">
    <form @submit.prevent="onFormSubmit">
      <h1>{{ formTitle }}</h1>

      <div class="form-fields">
        <label for="username">Username</label>
        <input id="username" v-model="username" />

        <label for="username">Password</label>
        <input id="password" v-model="password" type="password" />
      </div>

      <ReusableButton :label="formTitle" :disabled="isButtonDisabled()" />
    </form>

    <hr class="divider" />

    <slot></slot>
  </div>
</template>

<style scoped>
.form-wrapper {
  background-color: rgba(255, 255, 255, 0.5);
  width: 500px;
  margin: 100px auto;
  padding: 30px;
  text-align: center;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0 40px;
}

label {
  text-transform: uppercase;
  font-size: 12px;
}

input {
  padding: 8px 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
}

label:not(:first-of-type) {
  margin-top: 10px;
}

.divider {
  margin: 30px 0;
  border: 1px solid lightgray;
}
</style>
