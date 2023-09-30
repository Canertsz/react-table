export interface UsersType {
  fullName: string
  email: string
  age: number
}

export interface TableHeader {
  title: string
  sortable?: boolean
  width?: number
}

export type TableBody = Array<string | number | JSX.Element>

export type AddUserSchema = {
  name: string
  email: string
  age: number
}
