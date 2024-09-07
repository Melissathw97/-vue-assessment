<script setup lang="ts">
import useAuthStore from "@/stores/auth"
import { RouterLink, useRouter } from "vue-router"
import UserForm from "@/components/user/UserForm.vue"

const router = useRouter()
const { login } = useAuthStore()

const onFormSubmit = (payload) => {
  const { username, password } = payload

  login({ username, password })
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
      Don't have an account yet?
      <RouterLink to="/users/register">Sign up here!</RouterLink>
    </div>
  </UserForm>
</template>
