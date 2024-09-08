import { ref } from "vue"
import { defineStore } from "pinia"
import type { IUser } from "@/types/user"
import { getUsers, userLogin, userRegister, userDelete } from "@/api"

const useAuthStore = defineStore("auth", () => {
  const allUsers = ref<IUser[]>()
  const loggedInUser = ref<IUser>()

  const getAllUsers = async () => {
    return getUsers()
      .then((data: IUser[]) => {
        allUsers.value = data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const login = async ({ username, password }: Partial<IUser>) => {
    return userLogin({ username, password })
      .then((data: IUser) => {
        loggedInUser.value = data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const register = async ({ username, firstName, lastName, email, password }: Partial<IUser>) => {
    return userRegister({ username, firstName, lastName, email, password })
      .then((data: IUser) => {
        loggedInUser.value = data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  const logout = () => {
    loggedInUser.value = undefined
  }

  const deleteUser = async (user: IUser) => {
    return userDelete(user)
      .then(() => {
        getAllUsers()
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return { loggedInUser, allUsers, getAllUsers, login, register, logout, deleteUser }
})

export default useAuthStore
