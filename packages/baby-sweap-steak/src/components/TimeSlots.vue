<template>
  <div class="main">
    <div class="container">
      <div class="timeslots-col" v-for="column in columns">
        <div class="timeslot-container" v-for="(item, index) in column">
          <h2>{{item.time_slot}}</h2>
          <p>account name: {{item.account_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeSlots",
  data: function() {
    return {
      timeSlots: [],
      cols: 2
    };
  },
  created: function() {
    // console.log("This is potential passed data: " + data);
    this.$http.get(process.env.VUE_APP_BASE_API).then(response => {
      this.timeSlots = response.data.data;
      // console.log(this.timeSlots);
    });
  },
  computed: {
    columns () {
      let columns = []
      let mid = Math.ceil(this.timeSlots.length / this.cols)
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.timeSlots.slice(col * mid, col * mid + mid))
      }
      console.log(columns)
      return columns
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}
.timeslots {
  display: grid;
  height: 200px;
  width: 500px;
  grid-auto-rows: 100px;
  grid-template-columns: 20px 20px;
}
.timeslots-col {
  margin: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.timeslot-container {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid;
  padding: 5px;
  margin: 5px;
  text-align: center;
}
</style>
