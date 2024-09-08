<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router"
import useAuthStore from "@/stores/auth"
import type { IUser } from "@/types/user"
import { ref, onMounted, watch } from "vue"
import UserForm from "@/components/user/UserForm.vue"

const router = useRouter()
const authStore = useAuthStore()
const { createUser } = authStore
const { loggedInUser } = storeToRefs(authStore)

const user = ref<IUser>()

const checkIfLoggedIn = () => {
  if (!loggedInUser.value) {
    router.push("/")
  }
}

watch(loggedInUser, checkIfLoggedIn)

onMounted(() => {
  checkIfLoggedIn()
})

const onFormSubmit = (payload) => {
  const { username, firstName, lastName, email, password } = payload

  createUser({ username, firstName, lastName, email, password })
    .then(() => {
      alert(`${username} created successfully!`)
      router.push("/")
    })
    .catch((error) => {
      alert(error.message)
    })
}
</script>

<template>
  <UserForm @submit="onFormSubmit" :user="user" />
</template>
