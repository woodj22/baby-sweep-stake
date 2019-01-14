<template>
  <div class="main">
    <div class="timeslots" v-for="(item, index) in timeSlots">
      <div class="timeslot">
        <h2>{{item.time_slot}}</h2>
        <p>account name: {{item.account_name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeSlots",
  data: function() {
    return {
      timeSlots: []
    };
  },
  created: function() {
    // console.log("This is potential passed data: " + data);
    this.$http.get(process.env.VUE_APP_BASE_API).then(response => {
      this.timeSlots = response.data.data;
      console.log(this.timeSlots);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeslots {
  display: grid;
  height: 200px;
  width:500px;
    grid-auto-rows: 100px;
  grid-template-columns: 20px 20px;
}
.timeslot {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  height: 20px;
  width:200px;
  text-align: center;
}
</style>
