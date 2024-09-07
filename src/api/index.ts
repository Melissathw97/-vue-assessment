import type { IUser } from "@/types/user"
import userData from "./data/users.json"

const userLogin = ({ username, password }: Partial<IUser>): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const filteredData = userData.users.filter((user: IUser) => user.username === username)

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
}

export { userLogin }
