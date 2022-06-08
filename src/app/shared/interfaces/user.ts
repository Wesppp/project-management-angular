export interface IUser {
  _id?: string
  name?: string
  email: string
  password: string
  role?: string
  projects?: {items: [projectId: string]},
  reports?: {items: [reportId: string]}
}
