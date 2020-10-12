<template>
  <div id="app">
    <div>
      {{ formattedTime }}
    </div>

    <button @click="sendNotification">
      Notify
    </button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => {
    return {
      currentTime: Date.now(),
      intervalId: null
    }
  },
  created: function() {
    const updateTime = () => {
      this.currentTime = Date.now()
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
    sendNotification: function() {
      console.log(Notification.permission)
      // const notification = new Notification('時間だよ', {
      //   body: `今は${this.formattedTime}だよ。`
      // })
      const notification = new Notification('時間だよ')

      notification.onclick = () => {
        console.log('hoge')
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
