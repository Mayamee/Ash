//#-Забирает данные с API-#//
import fetch from 'node-fetch'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
class Grabber {
  constructor(private url: string) {}
  async grab(): Promise<any> {
    const response = await fetch(this.url, {
      method: 'GET',
    })
    let data = (await response.json()) as any[]
    return data
  }
}

export default Grabber
