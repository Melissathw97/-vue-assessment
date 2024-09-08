<script setup lang="ts">
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import useAuthStore from "@/stores/auth"
import UserTable from "@/components/user/UserTable.vue"
import ReusableButton from "@/components/ReusableButton.vue"

const authStore = useAuthStore()
const { loggedInUser } = storeToRefs(authStore)
</script>

<template>
  <main class="content-container">
    <div class="title-wrapper">
      <h1>Welcome to Melissa's Vue Project!</h1>
      <p>So glad to have you here.</p>
    </div>

    <UserTable v-if="loggedInUser" />

    <div class="login-wrapper" v-else>
      <p>To get started, please log in as a user.</p>

      <RouterLink to="/users/login">
        <ReusableButton label="Log In" />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.content-container {
  text-align: center;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.title-wrapper h1 {
  margin-bottom: 10px;
}

.login-wrapper {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 40px 20px;
}

button {
  margin-top: 20px;
}

p {
  line-height: 30px;
}
</style>
