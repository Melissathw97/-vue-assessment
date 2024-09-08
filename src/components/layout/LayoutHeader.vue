<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import useAuthStore from "@/stores/auth"
import { HomeIcon } from "@heroicons/vue/24/solid"
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
import ReusableButton from "@/components/ReusableButton.vue"

const authStore = useAuthStore()
const { logout } = authStore
const { loggedInUser } = storeToRefs(authStore)

const showModal = ref<Boolean>(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}

const onLogout = () => {
  logout()
  showModal.value = false
}
</script>

<template>
  <header class="content-container">
    <RouterLink to="/">
      <HomeIcon class="home-icon" />
    </RouterLink>

    <div class="wrapper">
      <div v-if="loggedInUser" class="user-wrapper">
        <div class="toggle-wrapper" @click="toggleModal">
          <div class="user-icon">
            {{ loggedInUser.username[0] }}
          </div>
          <ChevronDownIcon />
        </div>

        <!-- User Action Modal -->
        <div class="user-modal" v-if="showModal">
          <RouterLink :to="`/users/${loggedInUser.id}/edit`">
            <button>Update Profile</button>
          </RouterLink>
          <button @click="onLogout">Log Out</button>
        </div>
      </div>

      <div v-else>
        <RouterLink to="/users/login" class="login-wrapper">
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

.home-icon {
  color: rgb(197, 101, 27);
  height: 30px;
  width: 30px;
  transition: 0.4s;

  &:hover {
    transform: translateY(-4px);
  }
}

a {
  display: grid;
}

.login-wrapper {
  text-decoration: none;
}

.user-wrapper {
  position: relative;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  padding: 4px 6px;
  gap: 4px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;

  svg {
    height: 16px;
    width: 16px;
    color: white;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.user-icon {
  height: 30px;
  width: 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-transform: uppercase;
  user-select: none;
}

.user-modal {
  background: white;
  position: absolute;
  top: 45px;
  right: 0px;
  padding: 4px;
  width: 150px;
  border-radius: 5px;
  text-align: center;

  a {
    display: block;
    width: 100%;
    padding: 0;
  }

  button {
    width: 100%;
    padding: 8px 0;
    border-radius: 3px;
    border: none;
    background-color: transparent;

    &:hover {
      background-color: rgb(238, 238, 238);
    }
  }
}
</style>
