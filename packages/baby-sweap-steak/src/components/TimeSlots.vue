<template>
  <div class="main">
    <div class="container">
      <div class="timeslots-col" v-for="column in values">
        <div
          class="timeslot-container"
          v-for="(item, index) in column"
          v-bind:class="setStatus(item)"
        >
          <h2>{{item.time_slot}}</h2>
          <p>{{item.account_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";

export default {
  name: "TimeSlots",
  props: {
    timeSlots: Array
  },
  data: function() {
    return {
      cols: 2,
      columns: [],
      hasFailed: false,
    };
  },
  methods: {
    setStatus: function(property) {
      return {
        "slot-unknown": property.account_name === "AVAILABLE",
        "slot-known": property.account_name !== "AVAILABLE"
      };
    },
    setColumns: function() {
      let columns = [];
      let mid = Math.ceil(this.$props.timeSlots.length / this.cols);
      for (let col = 0; col < this.cols; col++) {
        columns.push(this.$props.timeSlots.slice(col * mid, col * mid + mid));
      }
      this.columns = columns;
      return columns;
    },
    updateTimeSlot(e) {
      for (var i in this.timeSlots) {
        if (this.$props.timeSlots[i].time_slot === e.time_slot) {
          this.$props.timeSlots[i] = e;
        }
        this.$forceUpdate();
      }
    }
  },
  created: function() {
    this.setColumns();

    EventBus.$on("update-time-slot", data => {
      this.updateTimeSlot(data);
      this.setColumns();
    });
  },
  computed: {
    values() {
      //This variable is called to make it work. No idea why.
      this.columns;
      return this.setColumns();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
}
.slot-unknown {
  background-color: whitesmoke;
}
.slot-known {
  background-color: #abbbdb;
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
  /* background-color: rgba(255, 255, 255, 0.8); */
  border: 1px solid;
  padding: 5px;
  margin: 5px;
  text-align: center;
}
</style>
