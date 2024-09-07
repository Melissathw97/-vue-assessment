<script setup lang="ts">
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import useAuthStore from "@/stores/auth"
import ReusableButton from "@/components/ReusableButton.vue"

const authStore = useAuthStore()
const { loggedInUser } = storeToRefs(authStore)
</script>

<template>
  <header class="content-container">
    <RouterLink to="/">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
    </RouterLink>

    <div class="wrapper">
      <div v-if="loggedInUser">
        <div class="user-icon">
          {{ loggedInUser.username[0] }}
        </div>
      </div>

      <div v-else>
        <RouterLink to="/users/login">
          <ReusableButton label="Log In" />
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
}

.user-icon {
  height: 36px;
  width: 36px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-transform: uppercase;
}
</style>
