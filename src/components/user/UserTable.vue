<script setup lang="ts">
import useAuthStore from "@/stores/auth"
import ReusableButton from "@/components/ReusableButton.vue"

const { allUsers, loggedInUser } = useAuthStore()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>E-mail</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in allUsers" :key="user.id">
        <td>
          {{ user.firstName }}
          <div v-if="user.id === loggedInUser.id" class="chip">You</div>
        </td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>
          <ReusableButton label="Edit" :disabled="user.id === loggedInUser.id" />
          <ReusableButton label="Delete" :disabled="user.id === loggedInUser.id" />
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

.chip {
  background: lightseagreen;
  border-radius: 2px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  display: inline-block;
  padding: 2px 4px;
}
</style>
