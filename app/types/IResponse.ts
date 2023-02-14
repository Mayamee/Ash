export interface IIncidentInfo {
  id: number
  priority: number
  status: string
  group_by_value: string
  name: string
}
export interface IApiResponse {
  data: IIncidentInfo[]
}
