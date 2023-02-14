//#-Сравнивает данные поступившие в него-#//
class Comparer {
  private stash: number[] = []
  private newIncidents: number[] = []
  compare(data: number[]): void {
    this.newIncidents = data.filter((incident: number) => !this.stash.includes(incident))
    this.stash = data
  }
  get incidents(): number[] {
    return this.newIncidents
  }
  get currentStash(): number[] {
    return this.stash
  }
}

export default Comparer
