//#-Делает запросы на сием через определенный период-#//
class Poller {
  private pollList: NodeJS.Timer[] = []
  createPoll(interval: number, callback: () => void): void {
		callback()
    const poll = setInterval(callback, interval)
    this.pollList.push(poll)
  }
  clearPoll(): void {
    this.pollList.forEach((poll) => clearInterval(poll))
  }
}
export default Poller
