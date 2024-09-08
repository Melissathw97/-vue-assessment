<script setup lang="ts">
import useAuthStore from "@/stores/auth"
import { RouterLink, useRouter } from "vue-router"
import UserForm from "@/components/user/UserForm.vue"

const router = useRouter()
const { register } = useAuthStore()

const onFormSubmit = (payload) => {
  const { username, firstName, lastName, email, password } = payload

  register({ username, firstName, lastName, email, password })
    .then(() => {
      alert("User logged in successfully!")
      router.push("/")
    })
    .catch((error) => {
      alert(error.message)
    })
}
</script>

<template>
  <UserForm @submit="onFormSubmit">
    <div>
      Already have an account?
      <RouterLink to="/users/login">Log in here!</RouterLink>
    </div>
  </UserForm>
</template>
