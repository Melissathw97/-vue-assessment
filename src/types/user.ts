interface IUser {
  id: String
  username: String
  password: String
  firstName: String
  lastName: String
  email: String
}

interface IUserList {
  users: IUser[]
  totalPages: Number
  totalItems: Number
}

export type { IUser, IUserList }
