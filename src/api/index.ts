import axios from "axios"
import type { IUser } from "@/types/user"

const getUsers = (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    try {
      axios.get("http://localhost:3000/users").then((response) => {
        resolve(response.data)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const userLogin = ({ username, password }: Partial<IUser>): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    try {
      axios.get("http://localhost:3000/users").then((response) => {
        const filteredData = response.data.filter((user: IUser) => user.username === username)

        if (filteredData.length) {
          if (filteredData[0].password === password) {
            resolve(filteredData[0])
          } else {
            reject("Incorrect password")
          }
        } else {
          reject("User not found")
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

const userRegister = ({
  username = "",
  firstName = "",
  lastName = "",
  email = "",
  password = ""
}: Partial<IUser>): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    try {
      axios.get("http://localhost:3000/users").then((response) => {
        const newUser: IUser = {
          id: (response.data.length + 1).toString(),
          username,
          firstName,
          lastName,
          email,
          password
        }

        axios.post("http://localhost:3000/users", newUser).then((response) => {
          resolve(newUser)
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}

export { getUsers, userLogin, userRegister }
