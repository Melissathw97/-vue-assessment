<script setup lang="ts">
import { storeToRefs } from "pinia"
import useAuthStore from "@/stores/auth"
import type { IUser } from "@/types/user"
import { ref, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import UserForm from "@/components/user/UserForm.vue"

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { getUserById, updateUser } = authStore
const { loggedInUser } = storeToRefs(authStore)

const user = ref<IUser>()
const hasError = ref<Boolean>(false)

const checkIfLoggedIn = () => {
  if (!loggedInUser.value) {
    router.push("/")
  }
}

watch(loggedInUser, checkIfLoggedIn)

onMounted(() => {
  checkIfLoggedIn()
  getUserById(route.params.id)
    .then((data) => {
      user.value = data
    })
    .catch(() => {
      hasError.value = true
    })
})

const onFormSubmit = (payload) => {
  const data = {
    ...payload,
    id: user.value.id
  }

  updateUser(data)
    .then(() => {
      router.push("/")
      alert(`${payload.username} updated successfully!`)
    })
    .catch((error) => {
      alert(error.message)
    })
}
</script>

<template>
  <div v-if="hasError" class="error-wrapper">
    Something went wrong.
    <br />
    Please check if the user exists, or try again later.
  </div>

  <UserForm v-else-if="user" @submit="onFormSubmit" :user="user" />
</template>

<style scoped>
.error-wrapper {
  background-color: rgba(255, 255, 255, 0.5);
  width: 500px;
  margin: 50px auto;
  padding: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>
