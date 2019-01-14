<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <header id="header">
      <h1>baby sweep steak</h1>
    </header>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <GetTimeSlotForm/>

    <TimeSlots/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import GetTimeSlotForm from "./components/GetTimeSlotForm.vue";
import TimeSlots from "./components/TimeSlots.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
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
