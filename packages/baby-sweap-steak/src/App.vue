<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <header id="header">
      <h1>baby sweep steak</h1>
    </header>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <GetTimeSlotForm @update-time-slot="updateTimeSlot"/>
    <p> your timeslot is:  {{ timeSlot }} </p> 

    <TimeSlots :timeSlots="timeSlots"/>
  </div>
</template>

<script>
import GetTimeSlotForm from "./components/GetTimeSlotForm.vue";
import TimeSlots from "./components/TimeSlots.vue";

export default {
  name: "app",
  data() {
    return {
      timeSlots: [],
      timeSlot:''
    };
  },
  created: function() {
    this.$http.get(process.env.VUE_APP_BASE_API).then(response => {
      console.log('I have run GET command')
      console.log(process.env.VUE_APP_BASE_API)
      console.log(response)
      this.timeSlots = response.data.data;
    }).catch(function (err) {
      console.log(err)
    });
  },
  methods: {
    updateTimeSlot: function (e) {
      this.timeSlot = e.time_slot
    }
  },
  components: {
    GetTimeSlotForm,
    TimeSlots
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header {
  position: relative;
  background-color: #448cff;
  height: 100px;
  top: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
