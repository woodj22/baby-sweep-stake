<template>
  <div class="main">
    <h1>Please generate your timeslot</h1>
    <h2>It will be a random hour slot chosen out of the slots available</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        BBC login:
        <input type="name" v-model="user.name">
      </label>
      <button type="submit">Submit</button>
    </form>
    <!-- <h2>Your time slot is: {{ timeslot }}</h2> -->
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";

export default {
  name: "GetTimeSlotForm",
  data: function() {
    return {
      timeslot: "",
      user: {
        name: ""
      }
    };
  },
  methods: {
    handleSubmit(data) {
      this.$http
        .post(process.env.VUE_APP_BASE_API, data, [])
        .then(
          response => {
            return response.text();
          },
          response => {
            // error callback
          }
        )
        .then(response => {
          this.timeslot = JSON.parse(response).data;
          EventBus.$emit("update-time-slot",this.timeslot);
          this.$emit("update-time-slot", this.timeslot);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
