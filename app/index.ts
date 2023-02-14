import yaml from 'yaml'
import path from 'path'
import fs from 'fs'
import Poller from './lib/Poller'
import { IConfig } from './types/IConfig'
import Grabber from './lib/Grabber'
import Comparer from './lib/Comparer'
import Alerter from './lib/Alerter'
const config2366 = yaml.parse(
  fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8')
) as IConfig
const poller = new Poller()
const grabber2366 = new Grabber(config2366)
const comparer2366 = new Comparer()
const alerter2366 = new Alerter(config2366.telegram.token, config2366.telegram.receivers)
const main = async () => {
  await grabber2366.grab()
  comparer2366.compare(grabber2366.ids)
  if (comparer2366.incidents.length > 0) {
    for (const incidentId of comparer2366.incidents) {
      const incident = grabber2366.getIncidentById(incidentId)
      if (incident) {
        await alerter2366.alert(`New incident: ${incident.name}`)
      }
    }
  }
}

main()
