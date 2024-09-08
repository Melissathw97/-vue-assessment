<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import ReusableButton from "@/components/ReusableButton.vue"

const formTitle = ref<String>("")
const isFullForm = ref<Boolean>(false)

const username = ref<String>("")
const firstName = ref<String>("")
const lastName = ref<String>("")
const email = ref<String>("")
const password = ref<String>("")

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
    isFullForm.value = true
    break
  default:
    break
}

const isButtonDisabled = () => {
  if (isFullForm.value) {
    return !username.value || !firstName.value || !lastName.value || !email.value || !password.value
  }

  return !username.value || !password.value
}

const onFormSubmit = () => {
  const payload = {
    username: username.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
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

        <template v-if="isFullForm">
          <label for="firstName">First Name</label>
          <input id="firstName" v-model="firstName" />

          <label for="lastName">Last Name</label>
          <input id="lastName" v-model="lastName" />

          <label for="email">E-mail</label>
          <input id="email" v-model="email" />
        </template>

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
  margin: 50px auto;
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

.divider {
  margin: 30px 0;
  border: 1px solid lightgray;
}
</style>
