<template>
  <div id="app">
    <div>
      {{ formattedTime }}
    </div>
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
