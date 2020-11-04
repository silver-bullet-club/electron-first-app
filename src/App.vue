<template>
  <div id="app">
    <div>
      {{ formattedTime }}
    </div>

    <button @click="alarm">
      Notify
    </button>
  </div>
</template>

<script>
import soundurl from './assets/sounds/temple_bell.mp3'
import AlarmQueue from './lib/alarm_queue'
import { alarms } from './data/alarms.json'

export default {
  name: 'App',
  data: () => {
    return {
      currentTime: Date.now(),
      currentAlarm: null,
      intervalId: null
    }
  },
  created: function() {
    let alarmQueue = new AlarmQueue(alarms)
    this.currentAlarm = alarmQueue.shift()
    const startedAt = new Date()
    const startTime = `${startedAt.getHours()}${startedAt.getMinutes()}`

    console.log(startTime)
    while (`${this.currentAlarm.hours}${this.currentAlarm.minutes}` < startTime) {
      this.currentAlarm = alarmQueue.shift()
    }

    const updateTime = () => {
      this.currentTime = Date.now()

      let now = new Date()
      if (this.currentAlarm && this.currentAlarm.hours == now.getHours() && this.currentAlarm.minutes == now.getMinutes()) {
        this.alarm()
        this.currentAlarm = alarmQueue.shift()
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
    alarm: function() {
      this.sendNotification()
      this.playSound()
    },
    sendNotification: function() {
      const notification = new Notification('時間だよ', {
        silent: true
      })

      notification.onclick = () => {
        console.log('hoge')
      }
    },
    playSound() {
      const audio = new Audio(soundurl)
      audio.play()
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
