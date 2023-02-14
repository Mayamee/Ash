import { IIncidentInfo } from '../types/IResponse'

export const buildTelegramMessage = (incident: IIncidentInfo): string => {
  return `Назначен инцидент: 
		${incident.name}*
		*Priority:* ${incident.priority}
		*Status:* ${incident.status}
		*Group by value:* ${incident.group_by_value}
		*Link:* https://siem.example.com/incidents/${incident.id}`
}
