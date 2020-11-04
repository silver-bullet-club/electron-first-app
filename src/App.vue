<template>
  <div id="app">
    <div>
      <input type="url" v-model="alarmDataUrl">
      <button @click="loadAlarms">Load</button>
    </div>
    <div>
      {{ formattedTime }}
    </div>
  </div>
</template>

<script>
import soundurl from './assets/sounds/temple_bell.mp3'
import AlarmQueue from './lib/alarm_queue'

export default {
  name: 'App',
  data: () => {
    return {
      alarmDataUrl: "https://raw.githubusercontent.com/silver-bullet-club/electron-first-app/main/src/data/alarms.json",
      alarmQueue: null,
      currentTime: Date.now(),
      currentAlarm: null,
      intervalId: null
    }
  },
  created: async function() {
    await this.loadAlarms()

    const updateTime = () => {
      this.currentTime = Date.now()

      let now = new Date()
      if (this.currentAlarm && this.currentAlarm.hours == now.getHours() && this.currentAlarm.minutes == now.getMinutes()) {
        this.alarm(this.currentAlarm.message)
        this.currentAlarm = this.alarmQueue.shift()
      }
    }
    this.intervalId = setInterval(updateTime, 1000);
  },
  destroyed: function() {
    clearInterval(this.intervalId)
  },
  computed: {
    formattedTime: function() {
      const dateFormat = new Intl.DateTimeFormat('ja', {
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
      return dateFormat.format(this.currentTime)
    }
  },
  methods: {
    alarm: function(message) {
      this.sendNotification(message)
      this.playSound()
    },
    sendNotification: function(message) {
      const notification = new Notification(message, {
        silent: true
      })

      notification.onclick = () => {
        console.log('hoge')
      }
    },
    playSound() {
      const audio = new Audio(soundurl)
      audio.play()
    },
    async loadAlarms() {
      const response = await fetch(this.alarmDataUrl).then(res => res.json())
      this.alarmQueue = new AlarmQueue(response.alarms)
      this.currentAlarm = this.alarmQueue.shift()
      const startedAt = new Date()
      const startTime = `${startedAt.getHours()}${startedAt.getMinutes()}`

      while (`${this.currentAlarm.hours}${this.currentAlarm.minutes}` < startTime) {
        this.currentAlarm = this.alarmQueue.shift()
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
