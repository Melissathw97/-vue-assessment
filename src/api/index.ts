import axios from "axios"
import type { IUser } from "@/types/user"

const getUsers = (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const getUser = (userId: Number): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
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
    axios
      .get("http://localhost:3000/users")
      .then(async (response) => {
        const newUser: IUser = {
          id: (Number(response.data.at(-1).id) + 1).toString(),
          username,
          firstName,
          lastName,
          email,
          password
        }

        await axios.post("http://localhost:3000/users", newUser)
        resolve(newUser)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const userUpdate = (user: IUser): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "PATCH",
      url: "http://localhost:3000/users/" + user.id,
      data: user
    })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

const userDelete = (user: IUser): Promise<void> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: "http://localhost:3000/users/" + user.id
    })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export { getUsers, getUser, userLogin, userRegister, userUpdate, userDelete }
