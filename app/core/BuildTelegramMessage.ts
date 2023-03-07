import emoji from 'node-emoji'
import { IIncidentInfo } from '../types/IResponse'

const warnEmoji = emoji.get('warning')

export const buildTelegramMessage = (incident: IIncidentInfo, siem_host: string): string => {
  return `${warnEmoji} Назначен инцидент!
${incident.name}
Статус: ${incident.status}
Информация: ${incident.group_by_value}
Ссылка: https://${siem_host}/incidents#!/item/${incident.id}`
}
