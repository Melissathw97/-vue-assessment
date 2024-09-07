import { ref } from "vue"
import { userLogin } from "@/api"
import { defineStore } from "pinia"
import type { IUser } from "@/types/user"

const useAuthStore = defineStore("auth", () => {
  const loggedInUser = ref<IUser>()

  async function login({ username, password }: Partial<IUser>) {
    return userLogin({ username, password })
      .then((data: IUser) => {
        loggedInUser.value = data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return { loggedInUser, login }
})

export default useAuthStore
