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

export default {
  name: "GetTimeSlotForm",
  data: function() {
    return {
      message: "sdfg",
      timeslot: "",
      user: {
        name: ""
      }
    };
  },
  methods: {
    handleSubmit(data) {
      console.log(process.env.VUE_APP_BASE_API);
      console.log("This is potential passed data: " + data)
      this.$http.post(process.env.VUE_APP_BASE_API).then(
        response => {
          // get body data
          this.someData = response.body;
          console.log(this.sameData)
        },
        response => {
          // error callback
        }
      );

      console.log("this has submitted now.");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  /* padding: 10%; */
}
.p {
}
</style>
