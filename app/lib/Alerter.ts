//#-Оповещает-#//
import TelegramBot from 'node-telegram-bot-api'
class Alerter {
  private bot: TelegramBot
  constructor(token: string, private receivers: string[]) {
    this.bot = new TelegramBot(token, { polling: false })
  }
  async alert(message: string): Promise<void> {
    for (const receiver of this.receivers) {
      for (let attempt = 0; attempt < 5; attempt++) {
        try {
          await this.bot.sendMessage(receiver, message)
          await new Promise((r) => setTimeout(r, 1000))
          break
        } catch (error) {
          console.log(error)
          await new Promise((r) => setTimeout(r, 1000))
        }
      }
    }
  }
}

export default Alerter
