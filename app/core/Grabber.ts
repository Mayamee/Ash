//#-Забирает данные с API-#//
import fetch from 'node-fetch'
import { IApiResponse, IIncidentInfo } from '../types/IResponse'
import { IConfig } from '../types/IConfig'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
class Grabber {
  private response: IApiResponse = { data: [] }
  private url: string = ''
  constructor(private config: IConfig) {
    this.url = `https://${config.siem_host}/api/v1/incidents?_api_key=${config.siem_api_token}&size=200`
  }
  async grab(): Promise<void> {
    const response = await fetch(this.url, {
      method: 'GET',
    })
    this.response = await response.json()
  }
  getIncidentById(id: number): IIncidentInfo | null {
    return this.response.data.find((incident) => incident.id === id) || null
  }
  get ids(): number[] {
    return this.response.data.map((incident: IIncidentInfo) => incident.id)
  }
  get data(): IIncidentInfo[] {
    return this.response.data
  }
}

export default Grabber
