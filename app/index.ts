import yaml from 'yaml'
import path from 'path'
import fs from 'fs'
import Poller from './core/Poller'
import { IConfig } from './types/IConfig'
import Grabber from './core/Grabber'
import Comparer from './core/Comparer'
import Alerter from './core/Alerter'
import { buildTelegramMessage } from './core/BuildTelegramMessage'
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
    console.log('Current stash: ', comparer2366.currentStash)
    for (const incidentId of comparer2366.incidents) {
      //TODO separate assigned, reopen, in_work within comparer logic
      const incident = grabber2366.getIncidentById(incidentId)
      if (incident && incident.status === 'assigned') {
        await alerter2366.alert(buildTelegramMessage(incident, config2366.siem_host))
        // console.log(buildTelegramMessage(incident, config2366.siem_host))
      }
    }
  } else {
    console.log('No new incidents...nothing to do')
    console.log('Current stash: ', JSON.stringify(comparer2366.currentStash))
  }
}

poller.createPoll(5, main)
