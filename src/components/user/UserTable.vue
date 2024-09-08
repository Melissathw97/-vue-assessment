<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import useAuthStore from "@/stores/auth"
import type { IUserList } from "@/types/user"
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"

import ReusableChip from "@/components/ReusableChip.vue"
import ReusableButton from "@/components/ReusableButton.vue"
import ReusablePagination from "@/components/ReusablePagination.vue"

const authStore = useAuthStore()
const { allUsers } = storeToRefs(authStore)
const { getAllUsers, loggedInUser, deleteUser } = authStore

const loading = ref<Boolean>(false)
const searchValue = ref<String>("")

const currentPage = ref<Number>(1)
const displaySize = ref<Number>(10)
const totalPages = ref<Number>(0)
const totalItems = ref<Number>(0)

const displayPageNumbers = computed(() => {
  const pages = [
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2
  ]

  return pages.filter((val) => val > 0 && val <= totalPages.value)
})

onMounted(() => {
  getList()
})

const getList = () => {
  loading.value = true
  getAllUsers({
    filter: searchValue.value,
    currentPage: currentPage.value,
    displaySize: displaySize.value
  })
    .then((data: Partial<IUserList>) => {
      totalItems.value = data.totalItems
      totalPages.value = data.totalPages
      loading.value = false
    })
    .catch((error) => {
      alert(error.message)
    })
}

const switchPage = (page) => {
  currentPage.value = page
  getList()
}

const onDelete = (user) => {
  if (confirm(`Are you sure you wish to delete ${user.username}?`)) {
    deleteUser(user)
      .then(() => {
        getList()
        alert(`${user.username} deleted successfully!`)
      })
      .catch((error) => {
        alert(error.message)
      })
  }
}
</script>

<template>
  <div class="content-wrapper">
    <div class="title-wrapper">
      <h3>All Users</h3>

      <div class="action-wrapper">
        <form class="search-form" @submit.prevent="getList">
          <input placeholder="Search" v-model="searchValue" />
          <ReusableButton label="Search" iconOnly>
            <template v-slot:icon>
              <MagnifyingGlassIcon class="search-icon" />
            </template>
          </ReusableButton>
        </form>
        <RouterLink to="/users/create">
          <ReusableButton label="Create User" class="create-user-button" />
        </RouterLink>
      </div>
    </div>

    <div v-if="loading" class="loader-wrapper">Loading...</div>

    <template v-else>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.id">
              <td>
                {{ user.username }}
                <template v-if="user.id === loggedInUser.id">
                  <ReusableChip label="You" />
                </template>
              </td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <RouterLink :to="`/users/${user.id}/edit`">
                  <ReusableButton label="Edit" />
                </RouterLink>
                <ReusableButton
                  label="Delete"
                  @click="() => onDelete(user)"
                  :disabled="user.id === loggedInUser.id"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ReusablePagination
        :currentPage="currentPage"
        :displaySize="displaySize"
        :totalItems="totalItems"
        :totalPages="totalPages"
        :pageNumbers="displayPageNumbers"
        @pageSelect="switchPage"
      />
    </template>
  </div>
</template>

<style scoped>
.content-wrapper {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
}

.table-wrapper {
  overflow: scroll;
}

.title-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px 10px;
}

.create-user-button {
  position: absolute;
  top: 0;
  right: 10px;
}

.loader-wrapper {
  padding: 30px 0;
}

h3 {
  font-weight: bold;
  text-align: left;
  padding: 10px 0;
}

.action-wrapper {
  width: 100%;
}

.action-wrapper,
.search-form {
  display: flex;
  align-items: center;
}

.search-form {
  flex-grow: 1;
  gap: 6px;
}

.search-icon {
  height: 18px;
  width: 18px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  flex-grow: 1;
}

table {
  width: 100%;
}

th,
td {
  min-width: 150px;
  padding: 8px 20px;
}

th {
  background: lavender;
}

td {
  background: rgba(255, 255, 255, 0.7);
}

td:last-of-type {
  display: flex;
  gap: 5px;
}

@media (min-width: 640px) {
  .title-wrapper {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .action-wrapper {
    width: unset;
    gap: 6px;
  }

  .create-user-button {
    position: static;
  }
}
</style>
