<script setup lang="ts">
import { storeToRefs } from "pinia"
import { RouterLink } from "vue-router"
import useAuthStore from "@/stores/auth"
import ReusableChip from "@/components/ReusableChip.vue"
import ReusableButton from "@/components/ReusableButton.vue"

const authStore = useAuthStore()
const { allUsers } = storeToRefs(authStore)
const { loggedInUser, deleteUser } = authStore

const onDelete = (user) => {
  if (confirm(`Are you sure you wish to delete ${user.username}?`)) {
    deleteUser(user)
      .then(() => {
        alert(`${user.username} deleted successfully!`)
      })
      .catch((error) => {
        alert(error.message)
      })
  }
}
</script>

<template>
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
</template>

<style scoped>
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
  background: rgba(255, 255, 255, 0.6);
}

td:last-of-type {
  display: flex;
  gap: 5px;
}
</style>
