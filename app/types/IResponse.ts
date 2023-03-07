export interface IIncidentInfo {
  id: number
  priority: number
  status: 'assigned' | 'in_work' | 'reopen'
  group_by_value: string
  name: string
}
export interface IApiResponse {
  data: IIncidentInfo[]
}
