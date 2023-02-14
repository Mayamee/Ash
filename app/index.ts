import yaml from 'yaml'
import path from 'path'
import fs from 'fs'
import Poller from './lib/Poller'
import { IConfig } from './types/IConfig'
import Grabber from './lib/Grabber'
const config = yaml.parse(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8')) as IConfig
const url = `https://${config.siem_host}/api/v1/incidents?_api_key=${config.siem_api_token}&size=200`
const poller = new Poller()
const grabber = new Grabber(url)
grabber.grab().then((data) => console.log(data))
// poller.createPoll(config.sime_poll_interval * 1000, () => {
//   console.log('Polling...')
// })
