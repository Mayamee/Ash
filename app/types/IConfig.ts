export interface IConfigTelegram {
  token: string
  receivers: string[]
}
export interface IConfig {
  siem_host: string
  siem_api_token: string
  sime_poll_interval: number
  telegram: IConfigTelegram
}
