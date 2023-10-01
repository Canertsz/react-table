export type UsersType = {
  fullName: string
  email: string
  age: number
}

export type TableHeader = {
  title: string
  sortable?: boolean
  width?: number
}

export type TableBody = Array<string | number | JSX.Element>

export type SortingState = { key: number | null; orderBy: "asc" | "dsc" | null }

export type AddUserSchema = {
  name: string
  email: string
  age: number
}