class AlarmQueue {
  constructor(alarms) {
    this.alarms = alarms
  }

  shift() {
    return this.alarms.shift()
  }

  hasNext() {
    return this.alarms.length > 0
  }
}

module.exports = AlarmQueue
