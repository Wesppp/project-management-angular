export interface IProject {
  _id?: string
  title: string
  description: string
  startDate: string
  endDate?: string
  creatorId?: string,
  img: string
  users?: {items: [{userId: string}]},
  comments?: {items: [{commentId: string}]}
}
