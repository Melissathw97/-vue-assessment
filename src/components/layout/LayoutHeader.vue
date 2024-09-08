<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import useAuthStore from "@/stores/auth"
import ReusableButton from "@/components/ReusableButton.vue"

const authStore = useAuthStore()
const { logout } = authStore
const { loggedInUser } = storeToRefs(authStore)

const showModal = ref<Boolean>(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <header class="content-container">
    <RouterLink to="/">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
    </RouterLink>

    <div class="wrapper">
      <div v-if="loggedInUser" class="user-wrapper">
        <div class="user-icon" @click="toggleModal">
          {{ loggedInUser.username[0] }}
        </div>

        <!-- User Action Modal -->
        <div class="user-modal" v-if="showModal">
          <button @click="logout">Log Out</button>
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
  cursor: pointer;
  user-select: none;

  &:hover {
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
}

.user-modal {
  background: white;
  position: absolute;
  top: 65px;
  right: 20px;
  padding: 4px;
  width: 100px;
  border-radius: 5px;
  text-align: center;

  button {
    width: 100%;
    padding: 6px 0;
    border-radius: 3px;
    border: none;
    background-color: transparent;

    &:hover {
      background-color: rgb(238, 238, 238);
    }
  }
}
</style>
